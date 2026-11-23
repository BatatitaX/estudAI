"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "./provider";
import { Badge, Heading, Icon } from "./ui";
import { dateKey, toolsList, uid } from "@/lib/data";
import {
  average,
  requiredGrade,
  differenceInDays,
  percentage,
} from "@/lib/calculations.mjs";
const fmt = (n: number) =>
  Number(n.toFixed(2)).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
export function Pomodoro() {
  const { state, setState, ready } = useStore();
  const timer = state.timer;
  const [length, setLength] = useState(timer.duration / 60);
  const [settings, setSettings] = useState(false);
  useEffect(() => {
    setLength(timer.duration / 60);
  }, [timer.duration]);
  const switchMode = (mode: string, minutes: number) =>
    setState((s) => ({
      ...s,
      timer: {
        ...s.timer,
        mode,
        duration: minutes * 60,
        remaining: minutes * 60,
        endAt: null,
        sessionId: null,
      },
    }));
  return (
    <div className="pomodoro">
      <div className="segmented" aria-label="Tipo de sessão">
        {[
          ["Foco", 25],
          ["Pausa curta", 5],
          ["Pausa longa", 15],
        ].map(([mode, min]) => (
          <button
            key={mode}
            aria-pressed={timer.mode === mode}
            className={timer.mode === mode ? "active" : ""}
            onClick={() => switchMode(String(mode), Number(min))}
          >
            {mode}
          </button>
        ))}
      </div>
      <div
        className="timer-ring"
        style={
          {
            "--progress": `${(1 - timer.remaining / timer.duration) * 360}deg`,
          } as React.CSSProperties
        }
      >
        <div>
          <span className="eyebrow">
            {timer.remaining === 0
              ? "VOCÊ CONSEGUIU!"
              : timer.mode === "Foco"
                ? "UM PASSO DE CADA VEZ"
                : "RESPIRE E RECARREGUE"}
          </span>
          <strong role="timer" aria-label="Tempo restante">
            {String(Math.floor(timer.remaining / 60)).padStart(2, "0")}
            <span>:</span>
            {String(timer.remaining % 60).padStart(2, "0")}
          </strong>
          <p>
            {timer.remaining === 0
              ? "Pronto para o próximo ciclo?"
              : timer.mode === "Foco"
                ? "Este momento é seu."
                : "Descansar também faz parte."}
          </p>
        </div>
      </div>
      <div className="timer-controls">
        <button
          className="icon-button bordered"
          aria-label="Reiniciar temporizador"
          onClick={() => switchMode(timer.mode, timer.duration / 60)}
        >
          <Icon name="reset" />
        </button>
        <button
          disabled={!ready}
          className="button primary large"
          onClick={() =>
            setState((s) => {
              const t = s.timer;
              if (t.endAt)
                return {
                  ...s,
                  timer: {
                    ...t,
                    endAt: null,
                    remaining: Math.max(
                      0,
                      Math.ceil((t.endAt - Date.now()) / 1000),
                    ),
                  },
                };
              const seconds = t.remaining || t.duration;
              return {
                ...s,
                timer: {
                  ...t,
                  remaining: seconds,
                  endAt: Date.now() + seconds * 1000,
                  sessionId: t.remaining ? t.sessionId || uid() : uid(),
                },
              };
            })
          }
        >
          <Icon name={timer.endAt ? "pause" : "play"} />
          {timer.endAt
            ? "Pausar"
            : timer.remaining === timer.duration
              ? "Começar foco"
              : timer.remaining === 0
                ? "Novo ciclo"
                : "Continuar"}
        </button>
        <button
          className="icon-button bordered"
          aria-expanded={settings}
          aria-label="Configurar temporizador"
          onClick={() => setSettings(!settings)}
        >
          <Icon name="settings" />
        </button>
      </div>
      {settings && (
        <form
          className="timer-settings"
          onSubmit={(e) => {
            e.preventDefault();
            switchMode(timer.mode, length);
            setSettings(false);
          }}
        >
          <label>
            Duração em minutos
            <input
              type="number"
              min="1"
              max="180"
              required
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </label>
          <button className="button secondary" type="submit">
            Aplicar e reiniciar
          </button>
        </form>
      )}
      <label className="timer-subject">
        O que você vai estudar?
        <select
          value={timer.subject}
          disabled={!!timer.endAt}
          onChange={(e) =>
            setState((s) => ({
              ...s,
              timer: { ...s.timer, subject: e.target.value },
            }))
          }
        >
          <option value="">Foco livre</option>
          {state.collections.subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <p className="muted">
        {timer.cycle}{" "}
        {timer.cycle === 1 ? "ciclo concluído" : "ciclos concluídos"}{" "}
        <span>·</span>{" "}
        {state.profile
          ? "Sessões de foco salvas no seu progresso"
          : "Crie um perfil para registrar suas sessões"}
      </p>
      {timer.remaining === 0 && (
        <p role="status" className="success-text">
          {timer.mode === "Foco"
            ? "Foco concluído. Que tal uma pausa?"
            : "Pausa concluída. Vamos continuar?"}
        </p>
      )}
    </div>
  );
}
export function ToolPage({ slug, embedded = false }: { slug: string; embedded?: boolean }) {
  const tool = toolsList.find((t) => t.slug === slug) || toolsList[0];
  const { state, save, toast } = useStore();
  const [mode, setMode] = useState("simple");
  const [rows, setRows] = useState([
    { grade: "7.5", weight: "1" },
    { grade: "6", weight: "1" },
    { grade: "8", weight: "1" },
  ]);
  const [result, setResult] = useState<{
    value: string;
    message: string;
    good?: boolean;
  } | null>(null);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("length");
  const units: Record<string, Record<string, number>> = {
    length: {
      Milímetros: 0.001,
      Centímetros: 0.01,
      Metros: 1,
      Quilômetros: 1000,
    },
    mass: { Gramas: 1, Quilogramas: 1000, Toneladas: 1000000 },
    time: { Segundos: 1, Minutos: 60, Horas: 3600, Dias: 86400 },
  };
  const input = (
    name: string,
    label: string,
    value: string,
    min?: number,
    max?: number,
  ) => (
    <label>
      {label}
      <input
        name={name}
        type="number"
        step="any"
        defaultValue={value}
        min={min}
        max={max}
        required
        onChange={() => setResult(null)}
      />
    </label>
  );
  const calculate = (form: HTMLFormElement) => {
    setError("");
    setResult(null);
    const f = new FormData(form);
    const n = (key: string) => Number(f.get(key));
    try {
      let value = "",
        message = "",
        good = true;
      if (slug === "calculadora-media") {
        const a = average(
          rows.map((r) => ({
            grade: Number(r.grade),
            weight: Number(r.weight),
          })),
          mode === "weighted",
        );
        const target = n("target");
        value = fmt(a);
        good = a >= target;
        message = good
          ? "Sua média atingiu a meta informada. Continue assim!"
          : `Faltam ${fmt(target - a)} pontos na média para atingir sua meta.`;
      }
      if (slug === "quanto-preciso-tirar") {
        const a = requiredGrade(
          n("current"),
          n("done"),
          n("target"),
          n("remaining") * n("weight"),
        );
        value = a <= 0 ? "Meta atingida" : fmt(a);
        good = a <= 10;
        message =
          a > 10
            ? "Com esses pesos, a nota necessária ultrapassa 10. Confira as possibilidades de recuperação com sua instituição."
            : a <= 0
              ? "Mesmo com nota zero nas avaliações restantes, a meta informada já foi alcançada."
              : `Você precisa de média ${fmt(a)} nas ${n("remaining")} avaliação(ões) restantes, considerando os pesos informados.`;
      }
      if (slug === "contador-de-dias") {
        if (mode === "add") {
          const date = String(f.get("from"));
          const d = new Date(date + "T12:00:00");
          d.setDate(d.getDate() + n("days"));
          value = d.toLocaleDateString("pt-BR");
          message = `${n("days")} dias em relação a ${new Date(date + "T12:00:00").toLocaleDateString("pt-BR")}.`;
        } else {
          const d = differenceInDays(
            String(f.get("from")),
            String(f.get("to")),
          );
          value = `${Math.abs(d)} ${Math.abs(d) === 1 ? "dia" : "dias"}`;
          message =
            d < 0
              ? "A data final está antes da data inicial."
              : d === 0
                ? "As datas são iguais."
                : "Diferença em dias corridos, sem incluir o dia inicial.";
        }
      }
      if (slug === "calculadora-porcentagem") {
        const a = percentage(mode, n("a"), n("b"));
        value = fmt(a) + (mode === "variation" ? "%" : "");
        message =
          mode === "variation"
            ? "Variação relativa ao valor inicial."
            : mode === "increase"
              ? "Valor final após o aumento."
              : mode === "discount"
                ? "Valor final após o desconto."
                : `${fmt(n("a"))}% de ${fmt(n("b"))}.`;
      }
      if (slug === "regra-de-tres") {
        if (n("a") === 0 || (mode === "inverse" && n("c") === 0))
          throw new Error("O divisor não pode ser zero.");
        value = fmt(
          mode === "inverse"
            ? (n("a") * n("b")) / n("c")
            : (n("b") * n("c")) / n("a"),
        );
        message =
          mode === "inverse"
            ? "Resultado para grandezas inversamente proporcionais."
            : "Resultado para grandezas diretamente proporcionais.";
      }
      if (slug === "conversores") {
        const from = String(f.get("unitFrom")),
          to = String(f.get("unitTo"));
        value = `${fmt((n("value") * units[category][from]) / units[category][to])} ${to.toLowerCase()}`;
        message = `Convertido de ${from.toLowerCase()} para ${to.toLowerCase()}.`;
      }
      setResult({ value, message, good });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Confira os dados informados.");
    }
  };
  const explanations: Record<string, [string, string]> = {
    "calculadora-media": [
      "Como a média é calculada?",
      "A média simples soma as notas e divide pela quantidade de avaliações. A ponderada multiplica cada nota pelo seu peso e divide a soma pela soma dos pesos. A escala utilizada é de 0 a 10.",
    ],
    "quanto-preciso-tirar": [
      "Como interpretar a nota necessária?",
      "Informe sua média atual e a soma dos pesos já avaliados. O resultado é a média necessária nas provas restantes. Se os pesos restantes forem diferentes, use 1 avaliação restante e informe a soma dos pesos no campo de peso.",
    ],
    "contador-de-dias": [
      "Quais dias entram na conta?",
      "A diferença usa dias corridos, incluindo finais de semana e feriados, sem contar a data inicial. Para uma data passada, use um número negativo no modo Somar dias.",
    ],
    "calculadora-porcentagem": [
      "Como funciona a porcentagem?",
      "X% de Y é X × Y ÷ 100. Para a variação percentual, calculamos (final − inicial) ÷ valor absoluto do inicial × 100.",
    ],
    "regra-de-tres": [
      "Direta ou inversa?",
      "Na proporção direta, A/B = C/X. Na inversa, A × B = C × X. Escolha de acordo com a relação entre as grandezas.",
    ],
    conversores: [
      "Que unidades posso converter?",
      "Comprimento, massa e tempo, utilizando fatores fixos entre unidades do mesmo tipo. Escolha a categoria antes de definir as unidades.",
    ],
    pomodoro: [
      "Como usar o Pomodoro?",
      "Comece com 25 minutos de foco e faça uma pausa curta de 5 minutos. Após quatro ciclos, experimente uma pausa longa de 15 minutos. Ajuste a duração conforme sua rotina.",
    ],
  };
  return (
    <section className="tool-page">
      <Link href={embedded ? "/dashboard/ferramentas" : "/ferramentas"} className="text-link">
        <Icon name="back" size={16} /> Todas as ferramentas
      </Link>
      <Heading
        eyebrow="UMA COISA A MENOS PARA SE PREOCUPAR"
        title={tool.title}
        description={tool.short}
      />
      <div className="tool-workspace">
        <article className="card tool-form-card">
          {slug === "pomodoro" ? (
            <Pomodoro />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculate(e.currentTarget);
              }}
              onChange={() => setResult(null)}
            >
              {slug === "calculadora-media" && (
                <>
                  <div className="segmented">
                    <button
                      type="button"
                      className={mode === "simple" ? "active" : ""}
                      onClick={() => {
                        setMode("simple");
                        setResult(null);
                      }}
                    >
                      Média simples
                    </button>
                    <button
                      type="button"
                      className={mode === "weighted" ? "active" : ""}
                      onClick={() => {
                        setMode("weighted");
                        setResult(null);
                      }}
                    >
                      Média ponderada
                    </button>
                  </div>
                  {rows.map((r, i) => (
                    <div className="grade-row" key={i}>
                      <span className="grade-number">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <label>
                        Avaliação {i + 1}
                        <input
                          type="number"
                          required
                          min="0"
                          max="10"
                          step="0.01"
                          value={r.grade}
                          onChange={(e) =>
                            setRows(
                              rows.map((x, j) =>
                                j === i ? { ...x, grade: e.target.value } : x,
                              ),
                            )
                          }
                        />
                      </label>
                      {mode === "weighted" && (
                        <label>
                          Peso
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            required
                            value={r.weight}
                            onChange={(e) =>
                              setRows(
                                rows.map((x, j) =>
                                  j === i
                                    ? { ...x, weight: e.target.value }
                                    : x,
                                ),
                              )
                            }
                          />
                        </label>
                      )}
                      <button
                        type="button"
                        className="icon-button"
                        disabled={rows.length < 2}
                        aria-label={`Remover avaliação ${i + 1}`}
                        onClick={() => {
                          setRows(rows.filter((_, j) => j !== i));
                          setResult(null);
                        }}
                      >
                        <Icon name="trash" size={17} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="button dashed full"
                    onClick={() => {
                      setRows([...rows, { grade: "", weight: "1" }]);
                      setResult(null);
                    }}
                  >
                    <Icon name="plus" size={17} />
                    Adicionar avaliação
                  </button>
                  {input("target", "Média necessária", "7", 0, 10)}
                </>
              )}
              {slug === "quanto-preciso-tirar" && (
                <>
                  <div className="form-grid">
                    {input("current", "Sua média atual", "5.8", 0, 10)}
                    {input("target", "Média necessária", "7", 0, 10)}
                    {input("done", "Soma dos pesos já avaliados", "1", 0.01)}
                    <label>
                      Avaliações restantes
                      <input
                        type="number"
                        name="remaining"
                        defaultValue="1"
                        min="1"
                        max="100"
                        step="1"
                        required
                      />
                    </label>
                    {input(
                      "weight",
                      "Peso de cada avaliação restante",
                      "1",
                      0.01,
                    )}
                  </div>
                  <p className="form-help">
                    Na média simples, a soma dos pesos é a quantidade de
                    avaliações já feitas.
                  </p>
                </>
              )}
              {slug === "contador-de-dias" && (
                <>
                  <div className="segmented">
                    {[
                      ["simple", "Entre datas"],
                      ["add", "Somar dias"],
                    ].map(([m, t]) => (
                      <button
                        type="button"
                        key={m}
                        className={mode === m ? "active" : ""}
                        onClick={() => {
                          setMode(m);
                          setResult(null);
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <label>
                    Data inicial
                    <input
                      type="date"
                      name="from"
                      defaultValue={dateKey()}
                      required
                    />
                  </label>
                  {mode === "add" ? (
                    <label>
                      Dias para adicionar ou subtrair
                      <input
                        type="number"
                        name="days"
                        defaultValue="30"
                        step="1"
                        min="-36500"
                        max="36500"
                        required
                      />
                    </label>
                  ) : (
                    <label>
                      Data final
                      <input type="date" name="to" required />
                    </label>
                  )}
                </>
              )}
              {slug === "calculadora-porcentagem" && (
                <>
                  <label>
                    O que vamos calcular?
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option value="simple">X% de um valor</option>
                      <option value="increase">Aumento percentual</option>
                      <option value="discount">Desconto percentual</option>
                      <option value="variation">Variação percentual</option>
                    </select>
                  </label>
                  <div className="form-grid">
                    {input(
                      "a",
                      mode === "variation"
                        ? "Valor inicial"
                        : "Porcentagem (%)",
                      "10",
                      mode === "discount" ? 0 : undefined,
                      mode === "discount" ? 100 : undefined,
                    )}
                    {input(
                      "b",
                      mode === "variation" ? "Valor final" : "Valor base",
                      "200",
                    )}
                  </div>
                </>
              )}
              {slug === "regra-de-tres" && (
                <>
                  <label>
                    Proporção
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option value="simple">Diretamente proporcional</option>
                      <option value="inverse">Inversamente proporcional</option>
                    </select>
                  </label>
                  <div className="form-grid">
                    {input("a", "A está para…", "2")}
                    {input("b", "B", "10")}
                    {input("c", "Assim como C…", "5")}
                    <div className="unknown">
                      está para <strong>X</strong>
                    </div>
                  </div>
                </>
              )}
              {slug === "conversores" && (
                <>
                  <label>
                    Categoria
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="length">Comprimento</option>
                      <option value="mass">Massa</option>
                      <option value="time">Tempo</option>
                    </select>
                  </label>
                  {input("value", "Valor", "1", 0)}
                  <div className="form-grid" key={category}>
                    {["unitFrom", "unitTo"].map((name, i) => (
                      <label key={name}>
                        {i ? "Para" : "De"}
                        <select
                          name={name}
                          defaultValue={Object.keys(units[category])[i]}
                        >
                          {Object.keys(units[category]).map((u) => (
                            <option key={u}>{u}</option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                </>
              )}
              {error && (
                <p className="error-text" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="button primary full">
                <Icon name={tool.icon} size={18} />
                Calcular resultado
              </button>
            </form>
          )}
        </article>
        <aside className="tool-aside">
          {slug !== "pomodoro" && (
            <div
              className={`result-card ${result ? "has-result" : ""}`}
              aria-live="polite"
            >
              <span className="icon-tile purple">
                <Icon name={result ? "check" : "sparkles"} size={25} />
              </span>
              <p className="eyebrow">
                {result ? "SEU RESULTADO" : "VAMOS DESCOMPLICAR?"}
              </p>
              <h2>{result?.value || "A resposta começa aqui."}</h2>
              <p>
                {result?.message ||
                  "Preencha os campos e deixe as contas com a gente."}
              </p>
              {result &&
                (state.profile ? (
                  <>
                    <label>
                      Vincular a uma matéria
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      >
                        <option value="">Sem matéria</option>
                        {state.collections.subjects.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      className="button secondary full"
                      onClick={() => {
                        save("results", {
                          id: uid(),
                          title: tool.title,
                          description: `${result.value} — ${result.message}`,
                          subject,
                          date: dateKey(),
                        });
                        toast("Resultado salvo. Veja em Meu progresso.");
                      }}
                    >
                      <Icon name="book" size={17} />
                      Salvar resultado
                    </button>
                  </>
                ) : (
                  <Link href="/cadastro" className="button primary full">
                    Criar espaço para salvar <Icon name="arrow" size={16} />
                  </Link>
                ))}
            </div>
          )}
          <div className="card tip-card">
            <span className="icon-tile yellow">
              <Icon name="help" />
            </span>
            <h3>{explanations[slug]?.[0]}</h3>
            <p>{explanations[slug]?.[1]}</p>
          </div>
          {slug === "pomodoro" && (
            <Link href="/dashboard/progresso" className="card quick-link">
              <Icon name="trend" />
              Ver meu progresso
              <Icon name="arrow" size={17} />
            </Link>
          )}
        </aside>
      </div>
      <div className="faq">
        <h2>Perguntas rápidas</h2>
        <details>
          <summary>Preciso criar uma conta?</summary>
          <p>
            Não. Todas as ferramentas são gratuitas e abertas. Crie um perfil
            para registrar seu progresso.
          </p>
        </details>
        <details>
          <summary>Os resultados ficam salvos?</summary>
          <p>
            Ao clicar em salvar, o resultado fica neste navegador. Sessões
            concluídas de foco são registradas automaticamente quando há um
            perfil.
          </p>
        </details>
        <details>
          <summary>Posso usar os resultados na minha faculdade?</summary>
          <p>
            Confira os pesos e critérios da sua instituição. As ferramentas de
            notas usam uma escala de 0 a 10 e não substituem os registros
            oficiais.
          </p>
        </details>
      </div>
      <div className="related">
        <h3>Também pode ajudar</h3>
        {toolsList
          .filter((t) => t.slug !== slug)
          .slice(0, 3)
          .map((t) => (
            <Link key={t.slug} href={(embedded ? "/dashboard/ferramentas/" : "/") + t.slug}>
              <Icon name={t.icon} />
              {t.title}
              <Icon name="arrow" size={16} />
            </Link>
          ))}
      </div>
    </section>
  );
}
