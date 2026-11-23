"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  collectionKeys,
  emptyState,
  demoState,
  dateKey,
  uid,
  type State,
  type Item,
  type Collection,
} from "@/lib/data";
import { validQuiz, emptyQuiz } from "@/lib/quiz";
import { reconcileRewards, milestones } from "@/lib/rewards";
import {normalizeSocial} from "@/lib/social";
const KEY = "estudai.frontend.v1";
type Context = {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
  ready: boolean;
  toast: (message: string) => void;
  save: (collection: Collection, item: Item) => void;
  remove: (collection: Collection, id: string) => void;
  demo: () => void;
};
const Store = createContext<Context | null>(null);
export function Provider({ children }: { children: ReactNode }) {
  const [state, updateState] = useState<State>(emptyState);
  const setState = useCallback<Dispatch<SetStateAction<State>>>((action) => {
    updateState(prev => reconcileRewards(typeof action === "function" ? action(prev) : action));
  }, []);
  const knownRewards = useRef<Set<string> | null>(null);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function toast(text: string) {
    setMessage(text);
    if (messageTimer.current) clearTimeout(messageTimer.current);
    messageTimer.current = setTimeout(() => setMessage(""), 4500);
  }
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.version === 1 &&
          collectionKeys.every((k) => Array.isArray(parsed.collections?.[k])) &&
          parsed.preferences &&
          parsed.timer
        )
          setState({
            ...emptyState(),
            ...parsed,
            social: normalizeSocial(parsed.social),
            plan: parsed.plan === "plus" ? "plus" : "free",
            quiz: validQuiz(parsed.quiz) ? parsed.quiz : emptyQuiz(),
          });
        else toast("Não foi possível recuperar os dados salvos.");
      }
    } catch {
      toast("Não foi possível acessar os dados salvos neste navegador.");
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const ids = Object.keys(state.rewards.unlocked);
    if (knownRewards.current) {
      const fresh = ids.filter(id => !knownRewards.current!.has(id));
      if (fresh.length) toast(`Nova conquista: ${(fresh[0] === "plus-keepsake" ? "Presentes permanentes Estudaí+" : milestones.find(m => m.id === fresh[0])?.name)}! Veja suas recompensas no perfil.`);
    }
    knownRewards.current = new Set(ids);
  }, [ready, state.rewards.unlocked]);
  useEffect(() => { if(ready && state.profile && !state.social.id) setState(s=>({...s,social:{...s.social,id:crypto.randomUUID()}})); }, [ready,state.profile,state.social.id,setState]);
  useLayoutEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      toast("Não foi possível salvar. Exporte seus dados nas configurações.");
    }
    document.documentElement.dataset.theme = state.preferences.dark
      ? "dark"
      : "light";
    document.documentElement.dataset.motion = state.preferences.reducedMotion
      ? "reduced"
      : "full";
  }, [state, ready]);
  useEffect(() => {
    if (!state.timer.endAt) return;
    const tick = () =>
      setState((prev) => {
        if (!prev.timer.endAt) return prev;
        const remaining = Math.max(
          0,
          Math.ceil((prev.timer.endAt - Date.now()) / 1000),
        );
        if (remaining)
          return remaining === prev.timer.remaining
            ? prev
            : { ...prev, timer: { ...prev.timer, remaining } };
        const timer = {
          ...prev.timer,
          endAt: null,
          remaining: 0,
          cycle: prev.timer.cycle + (prev.timer.mode === "Foco" ? 1 : 0),
        };
        if (prev.timer.mode !== "Foco" || !prev.profile)
          return { ...prev, timer };
        const id = prev.timer.sessionId || uid();
        if (prev.collections.sessions.some((s) => s.id === id))
          return { ...prev, timer };
        return {
          ...prev,
          timer,
          collections: {
            ...prev.collections,
            sessions: [
              ...prev.collections.sessions,
              {
                id,
                title: "Sessão Pomodoro",
                subject: prev.timer.subject,
                date: dateKey(),
                duration: prev.timer.duration / 60,
                createdAt: new Date().toISOString(),
              },
            ],
          },
        };
      });
    const interval = setInterval(tick, 500);
    tick();
    return () => clearInterval(interval);
  }, [state.timer.endAt]);
  function save(collection: Collection, item: Item) {
    setState((prev) => ({
      ...prev,
      collections: {
        ...prev.collections,
        [collection]: prev.collections[collection].some((x) => x.id === item.id)
          ? prev.collections[collection].map((x) =>
              x.id === item.id ? item : x,
            )
          : [
              ...prev.collections[collection],
              { createdAt: new Date().toISOString(), ...item },
            ],
      },
    }));
    toast("Salvo com sucesso.");
  }
  function remove(collection: Collection, id: string) {
    setState((prev) => {
      const collections = {
        ...prev.collections,
        [collection]: prev.collections[collection].filter((x) => x.id !== id),
      };
      if (collection === "decks")
        collections.cards = collections.cards.filter((x) => x.deck !== id);
      if (collection === "subjects")
        collectionKeys
          .filter((k) => k !== "subjects")
          .forEach((k) => {
            collections[k] = collections[k].map((x) =>
              x.subject === id ? { ...x, subject: "" } : x,
            );
          });
      return { ...prev, collections };
    });
    toast("Item excluído.");
  }
  return (
    <Store.Provider
      value={{
        state,
        setState,
        ready,
        toast,
        save,
        remove,
        demo: () => setState(demoState()),
      }}
    >
      {children}
      <div className="toast" role="status" aria-live="polite">
        {message && <span>{message}</span>}
      </div>
    </Store.Provider>
  );
}
export const useStore = () => {
  const value = useContext(Store);
  if (!value) throw new Error("Provider ausente");
  return value;
};
