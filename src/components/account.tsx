"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useStore } from "./provider";
import { Heading, Icon, Modal } from "./ui";
import { collectionKeys, emptyState, dateKey, type State } from "@/lib/data";
import { validQuiz, emptyQuiz } from "@/lib/quiz";
import {normalizeSocial} from "@/lib/social";
import { ProfileSharing } from "./social";
import { normalizeRewards } from "@/lib/rewards";
import { ProfileCustomization } from "./profile-customization";
export function Account({ settings = false }: { settings?: boolean }) {
  const { state, setState, toast } = useStore();
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [imported, setImported] = useState<State | null>(null);
  const input = useRef<HTMLInputElement>(null);
  function download() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `estudai-backup-${dateKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Backup exportado. Guarde-o em um local seguro.");
  }
  async function importBackup(file?: File) {
    if (!file) return;
    try {
      if (file.size > 5_000_000)
        throw new Error("O arquivo é muito grande. Limite: 5 MB.");
      const parsed = JSON.parse(await file.text());
      if (
        parsed.version !== 1 ||
        !parsed.profile ||
        typeof parsed.profile.name !== "string" ||
        typeof parsed.profile.email !== "string" ||
        typeof parsed.profile.dailyGoal !== "number" ||
        parsed.profile.dailyGoal < 5 ||
        parsed.profile.dailyGoal > 720 ||
        !parsed.collections ||
        !collectionKeys.every(
          (k) =>
            Array.isArray(parsed.collections[k]) &&
            parsed.collections[k].every((x: unknown) => {
              if (!x || typeof x !== "object") return false;
              const item = x as Record<string, unknown>;
              return (
                typeof item.id === "string" &&
                typeof item.title === "string" &&
                Object.entries(item).every(([key, value]) => {
                  if (
                    [
                      "duration",
                      "goal",
                      "grade",
                      "weight",
                      "minimum",
                      "reviews",
                    ].includes(key)
                  )
                    return (
                      typeof value === "number" &&
                      Number.isFinite(value) &&
                      value >= 0
                    );
                  if (key === "completed") return typeof value === "boolean";
                  return typeof value === "string";
                })
              );
            }),
        )
      )
        throw new Error("O arquivo não é um backup válido do Estudaí.");
      if (parsed.quiz !== undefined && !validQuiz(parsed.quiz))
        throw new Error("O histórico de quizzes deste arquivo não é válido.");
      const clean = emptyState();
      setImported({
        ...clean,
        loggedIn: true,
        profile: parsed.profile,
        plan: parsed.plan === "plus" ? "plus" : "free",
        quiz: parsed.quiz || emptyQuiz(),
        rewards: normalizeRewards(parsed.rewards),
        social: normalizeSocial(parsed.social),
        collections: parsed.collections,
        preferences: {
          dark: parsed.preferences?.dark === true,
          reducedMotion: parsed.preferences?.reducedMotion === true,
          reminders: parsed.preferences?.reminders !== false,
        },
      });
    } catch (e) {
      toast(
        e instanceof Error ? e.message : "Não foi possível importar o arquivo.",
      );
    } finally {
      if (input.current) input.current.value = "";
    }
  }
  return (
    <>
      <Heading
        title={
          settings
            ? "Do seu jeito. No seu ritmo."
            : "Seu espaço começa com você."
        }
        description={
          settings
            ? "Ajuste sua experiência e cuide dos seus dados."
            : "Personalize seu perfil e sua meta de estudos."
        }
      />
      {!settings ? (
        <div className="account-grid">
          <ProfileCustomization />
          <section className="card account-details">
            <h2>Sobre você</h2>
            <form
              id="profile-details-form"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                setState((s) => ({
                  ...s,
                  profile: {
                    name: String(f.get("name")).trim(),
                    email: String(f.get("email")).trim().toLowerCase(),
                    course: String(f.get("course")).trim(),
                    dailyGoal: Number(f.get("goal")),
                  },
                }));
                toast("Perfil atualizado.");
              }}
            >
              <label>
                Seu nome
                <input
                  name="name"
                  defaultValue={state.profile?.name}
                  minLength={2}
                  maxLength={60}
                  required
                />
              </label>
              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  defaultValue={state.profile?.email}
                  required
                />
              </label>
              <label>
                Curso ou objetivo
                <input
                  name="course"
                  defaultValue={state.profile?.course}
                  placeholder="Ex.: Análise e Desenvolvimento de Sistemas"
                  maxLength={140}
                />
              </label>
              <label>
                Meta diária de estudo (minutos)
                <input
                  name="goal"
                  type="number"
                  min="5"
                  max="720"
                  step="5"
                  defaultValue={state.profile?.dailyGoal || 60}
                  required
                />
              </label>
            </form>
            <ProfileSharing />
          </section>
          <div className="account-save-row">
            <button className="button primary" type="submit" form="profile-details-form">
              <Icon name="check" size={17} />
              Salvar alterações
            </button>
          </div>
        </div>
      ) : (
        <div className="settings-stack">
          <section className="card">
            <h2>Aparência e preferências</h2>
            <div className="setting-row">
              <span>
                <strong>
                  {state.plan === "plus"
                    ? "Prévia do Estudaí+"
                    : "Plano gratuito"}
                </strong>
                <small>
                  {state.plan === "plus"
                    ? "Você está experimentando os recursos, sem cobrança."
                    : "3 quizzes por semana, sem explicações."}
                </small>
              </span>
              {state.plan === "plus" && (
                <button
                  className="button secondary"
                  onClick={() => {
                    setState((s) => ({ ...s, plan: "free" }));
                    toast("Você voltou ao plano gratuito.");
                  }}
                >
                  Voltar ao gratuito
                </button>
              )}
            </div>
            {[
              [
                "dark",
                "Modo escuro",
                "Uma alternativa para estudar em ambientes com pouca luz.",
                "moon",
              ],
              [
                "reducedMotion",
                "Reduzir movimentos",
                "Diminua animações e transições da interface.",
                "eye",
              ],
              [
                "reminders",
                "Lembretes no painel",
                "Mostre um indicador de tarefas de hoje ou atrasadas. Não envia notificações ao dispositivo.",
                "bell",
              ],
            ].map(([key, title, description, icon]) => (
              <label className="setting-row" key={key}>
                <span className="icon-tile purple">
                  <Icon name={icon} />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <input
                  type="checkbox"
                  role="switch"
                  aria-label={title}
                  checked={state.preferences[key as keyof State["preferences"]]}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      preferences: {
                        ...s.preferences,
                        [key]: e.target.checked,
                      },
                    }))
                  }
                />
              </label>
            ))}
          </section>
          <section className="card">
            <h2>Seus dados, com você</h2>
            <p className="muted">
              Seu espaço fica salvo neste navegador. Exporte um backup antes de
              trocar de dispositivo ou limpar os dados.
            </p>
            <div className="row wrap">
              <button className="button secondary" onClick={download}>
                <Icon name="download" size={17} />
                Exportar backup
              </button>
              <button
                className="button secondary"
                onClick={() => input.current?.click()}
              >
                <Icon name="repeat" size={17} />
                Importar backup
              </button>
              <input
                ref={input}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={(e) => importBackup(e.target.files?.[0])}
              />
            </div>
          </section>
          <section className="card">
            <h2>Seu acesso</h2>
            <p className="muted">
              Você está usando a versão de apresentação. Ao sair, seu perfil e
              seus estudos continuam neste navegador; você poderá voltar com o
              mesmo e-mail.
            </p>
            <button
              className="button secondary"
              onClick={() => {
                setState((s) => ({ ...s, loggedIn: false }));
                router.push("/login");
              }}
            >
              <Icon name="logout" size={17} />
              Sair do meu espaço
            </button>
          </section>
          <section className="card danger-zone">
            <h2>Apagar meu espaço</h2>
            <p className="muted">
              Remove o perfil e todos os registros deste navegador. Exporte um
              backup antes de continuar.
            </p>
            <button
              className="button danger-outline"
              onClick={() => setConfirm(true)}
            >
              <Icon name="trash" size={17} />
              Apagar meus dados
            </button>
          </section>
        </div>
      )}
      {confirm && (
        <Modal
          title="Apagar todo o seu espaço?"
          onClose={() => setConfirm(false)}
        >
          <p>
            Seu perfil, matérias, tarefas e progresso serão apagados deste
            navegador. Esta ação não pode ser desfeita sem um backup.
          </p>
          <div className="modal-actions">
            <button
              className="button secondary"
              onClick={() => setConfirm(false)}
            >
              Cancelar
            </button>
            <button
              className="button danger"
              onClick={() => {
                setState(emptyState());
                setConfirm(false);
                toast("Seus dados foram apagados.");
                router.push("/");
              }}
            >
              Apagar meu espaço
            </button>
          </div>
        </Modal>
      )}
      {imported && (
        <Modal
          title="Substituir pelos dados do backup?"
          onClose={() => setImported(null)}
        >
          <p>
            O espaço atual será substituído pelo perfil de{" "}
            <strong>{imported.profile?.name}</strong> e seus registros. Exporte
            seus dados atuais antes de continuar, se quiser preservá-los.
          </p>
          <div className="modal-actions">
            <button
              className="button secondary"
              onClick={() => setImported(null)}
            >
              Cancelar
            </button>
            <button
              className="button primary"
              onClick={() => {
                setState(imported);
                setImported(null);
                toast("Backup importado.");
              }}
            >
              Importar e substituir
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
