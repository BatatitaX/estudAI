"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "./provider";
import { Badge, Heading, Icon, Progress } from "./ui";
import { uid } from "@/lib/data";
import {
  exampleContent,
  exampleQuestions,
  generateQuiz,
  quizStats,
  weekKey,
  type Attempt,
  type QuizState,
} from "@/lib/quiz";
export function QuizPage() {
  const { state, setState, ready } = useStore();
  const plus = state.plan === "plus";
  const quiz = state.quiz;
  const stats = quizStats(quiz.attempts);
  const [content, setContent] = useState("");
  const [example, setExample] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  const [resultId, setResultId] = useState<string | null>(null);
  const active = quiz.attempts.find((a) => !a.finished);
  const result = quiz.attempts.find((a) => a.id === resultId);
  const used = quiz.attempts.filter((a) => a.week === weekKey()).length;
  const remaining = Math.max(0, 3 - used);
  const difficulty = plus
    ? quiz.preference === "adaptativa"
      ? stats.difficulty
      : quiz.preference
    : "básica";
  async function start() {
    if (busy.current || active || (!plus && remaining === 0)) return;
    setError("");
    if (content.trim().length < 80) {
      setError("Adicione um conteúdo com pelo menos 80 caracteres.");
      return;
    }
    busy.current = true;
    setLoading(true);
    try {
      const questions =
        example && content === exampleContent
          ? exampleQuestions.map((q) => {
              const { explanation, ...question } = q;
              return plus ? { ...question, explanation } : question;
            })
          : await generateQuiz(content, plus, difficulty, stats);
      const attempt: Attempt = {
        id: uid(),
        createdAt: new Date().toISOString(),
        week: weekKey(),
        title: example ? "Fotossíntese · Exemplo" : content.trim().slice(0, 65),
        difficulty: example ? "básica" : difficulty,
        example,
        questions,
        answers: questions.map(() => -1),
        finished: false,
      };
      setState((s) => {
        if (
          s.quiz.attempts.some((a) => !a.finished) ||
          (s.plan !== "plus" &&
            s.quiz.attempts.filter((a) => a.week === weekKey()).length >= 3)
        )
          return s;
        return {
          ...s,
          quiz: { ...s.quiz, attempts: [...s.quiz.attempts, attempt] },
        };
      });
      setResultId(null);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Não foi possível criar seu quiz. Tente novamente.",
      );
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }
  function answer(index: number, value: number) {
    if (!active) return;
    setState((s) => ({
      ...s,
      quiz: {
        ...s.quiz,
        attempts: s.quiz.attempts.map((a) =>
          a.id === active.id
            ? {
                ...a,
                answers: a.answers.map((v, i) => (i === index ? value : v)),
              }
            : a,
        ),
      },
    }));
  }
  function finish() {
    if (!active || active.answers.some((a) => a < 0)) return;
    setState((s) => ({
      ...s,
      quiz: {
        ...s.quiz,
        attempts: s.quiz.attempts.map((a) =>
          a.id === active.id ? { ...a, finished: true } : a,
        ),
      },
    }));
    setResultId(active.id);
  }
  return (
    <>
      <Heading
        title="Transforme seu conteúdo em aprendizado."
        description="Cole o que está estudando e pratique com um quiz."
        action={
          <Badge color={plus ? "purple" : "green"}>
            {plus ? "Estudaí+ · Prévia" : "Plano gratuito"}
          </Badge>
        }
      />
      <div className="notice">
        <Icon name="sparkles" />
        <span>
          {plus
            ? "Quizzes ilimitados, explicações e dificuldade ajustada ao seu aprendizado."
            : "Você pode iniciar 3 quizzes por semana. O resultado mostra os acertos, sem explicações."}{" "}
          {!plus && <Link href="/estudai-plus"> Conhecer Estudaí+</Link>}
        </span>
      </div>
      {active ? (
        <section className="card quiz-work">
          <div className="section-heading">
            <h2>{active.title}</h2>
            <Badge>
              {active.answers.filter((a) => a >= 0).length}/
              {active.questions.length} respondidas
            </Badge>
          </div>
          {active.example && (
            <p className="muted">
              Quiz de exemplo com perguntas preparadas sobre o texto de
              fotossíntese.
            </p>
          )}
          <Progress
            value={
              (active.answers.filter((a) => a >= 0).length /
                active.questions.length) *
              100
            }
            label="Questões respondidas"
          />
          {active.questions.map((q, i) => (
            <fieldset className="quiz-question" key={q.id}>
              <legend>
                {i + 1}. {q.question}
              </legend>
              {q.options.map((option, j) => (
                <label
                  className={`quiz-option ${active.answers[i] === j ? "selected" : ""}`}
                  key={j}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={active.answers[i] === j}
                    onChange={() => answer(i, j)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </fieldset>
          ))}
          <button
            className="button primary full"
            disabled={active.answers.some((a) => a < 0)}
            onClick={finish}
          >
            Concluir quiz <Icon name="check" />
          </button>
          <p className="form-help">
            Você pode sair e voltar para continuar. Esta tentativa já está
            reservada.
          </p>
        </section>
      ) : result ? (
        <section className="card quiz-work">
          <Badge color="green">QUIZ CONCLUÍDO</Badge>
          <h2 className="quiz-score">
            {
              result.questions.filter(
                (q, i) => q.correctIndex === result.answers[i],
              ).length
            }{" "}
            de {result.questions.length} acertos
          </h2>
          <p className="muted">
            Cada tentativa ajuda você a descobrir o que já aprendeu.
          </p>
          {result.questions.map((q, i) => (
            <article className="quiz-review" key={q.id}>
              <h3>
                {i + 1}. {q.question}
              </h3>
              <Badge
                color={
                  q.correctIndex === result.answers[i] ? "green" : "orange"
                }
              >
                {q.correctIndex === result.answers[i]
                  ? "Você acertou"
                  : "Vamos revisar"}
              </Badge>
              <p>Sua resposta: {q.options[result.answers[i]]}</p>
              <p>
                <strong>Resposta correta:</strong> {q.options[q.correctIndex]}
              </p>
              {plus && q.explanation && (
                <div className="notice">{q.explanation}</div>
              )}
            </article>
          ))}
          {!plus && (
            <p className="notice">
              As explicações e a evolução personalizada fazem parte do Estudaí+.{" "}
              <Link href="/estudai-plus">Conhecer o plano</Link>
            </p>
          )}
          <button className="button primary" onClick={() => setResultId(null)}>
            Voltar aos quizzes
          </button>
        </section>
      ) : (
        <div className="tool-workspace">
          <section className="card">
            <div className="section-heading">
              <h2>O que você quer estudar?</h2>
              <Badge>
                {plus ? "Sem limite" : `${remaining} de 3 disponíveis`}
              </Badge>
            </div>
            <div>
              <label htmlFor="quiz-content">Seu conteúdo</label>
              <textarea id="quiz-content"
                value={content}
                rows={9}
                minLength={80}
                maxLength={20000}
                onChange={(e) => {
                  setContent(e.target.value);
                  setExample(false);
                }}
                placeholder="Cole suas anotações, um resumo ou o trecho que deseja revisar…"
              />
            </div>
            <p className="form-help">
              De 80 a 20.000 caracteres. Cada quiz contém 5 perguntas. O
              conteúdo será enviado para preparar suas perguntas.
            </p>
            {example && (
              <p className="notice">
                Você está usando o exemplo de fotossíntese. As perguntas deste
                exemplo já estão preparadas; ele também conta como uma
                tentativa.
              </p>
            )}
            {plus && (
              <div className="block">
                <label htmlFor="quiz-difficulty">Dificuldade</label>
                <select id="quiz-difficulty"
                  value={quiz.preference}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      quiz: {
                        ...s.quiz,
                        preference: e.target.value as QuizState["preference"],
                      },
                    }))
                  }
                >
                  <option value="adaptativa">Acompanhar minha evolução</option>
                  <option value="básica">Básica</option>
                  <option value="intermediária">Intermediária</option>
                  <option value="avançada">Avançada</option>
                </select>
              </div>
            )}
            {error && (
              <p role="alert" className="error-text">
                {error} Nenhuma tentativa foi descontada.
              </p>
            )}
            {!plus && !remaining && (
              <p className="notice">
                Você usou suas 3 tentativas desta semana. Elas são renovadas na
                segunda-feira. Você ainda pode consultar seus resultados.
              </p>
            )}
            <div className="row wrap">
              <button
                className="button primary"
                onClick={start}
                disabled={
                  !ready ||
                  loading ||
                  (!plus && !remaining) ||
                  content.trim().length < 80
                }
              >
                <Icon name="sparkles" />
                {loading
                  ? "Preparando suas perguntas…"
                  : example
                    ? "Começar exemplo"
                    : "Gerar quiz com IA"}
              </button>
              <button
                className="button secondary"
                disabled={loading}
                onClick={() => {
                  setContent(exampleContent);
                  setExample(true);
                  setError("");
                }}
              >
                Usar conteúdo de exemplo
              </button>
            </div>
            <p className="form-help">
              Uma tentativa é usada apenas quando as perguntas ficam prontas.
              Tentativas iniciadas continuam salvas ao recarregar a página.
            </p>
          </section>
          <aside className="card">
            <span className="icon-tile purple">
              <Icon name="trend" />
            </span>
            <h2 className="block">Seu aprendizado em movimento</h2>
            <p>{stats.completed} quizzes concluídos</p>
            <p>
              {stats.accuracy === null
                ? "Seus resultados aparecerão após o primeiro quiz."
                : `${Math.round(stats.accuracy * 100)}% de acertos nos últimos quizzes`}
            </p>
            {plus ? (
              <>
                <p>
                  <strong>Próxima dificuldade:</strong> {difficulty}
                </p>
                <p className="muted">
                  A recomendação considera seus últimos 5 quizzes: abaixo de
                  50%, fundamentos; de 50% a 79%, nível intermediário; a partir
                  de 80%, desafios avançados.
                </p>
                {stats.weakTopics.length > 0 && (
                  <p>
                    <strong>Vale revisar:</strong> {stats.weakTopics.join(", ")}
                    .
                  </p>
                )}
                <p className="form-help">
                  O conteúdo que você enviar continua sendo a base das
                  perguntas. Suas preferências e resultados orientam os próximos
                  desafios.
                </p>
              </>
            ) : (
              <>
                <p className="muted">
                  Com o Estudaí+, as perguntas acompanham seu desempenho e
                  priorizam os assuntos que merecem revisão.
                </p>
                <Link href="/estudai-plus" className="button secondary full">
                  Conhecer Estudaí+
                </Link>
              </>
            )}
          </aside>
        </div>
      )}
      <section className="card saved-results">
        <h2>Suas últimas tentativas</h2>
        {quiz.attempts.filter((a) => a.finished).length ? (
          quiz.attempts
            .filter((a) => a.finished)
            .slice()
            .reverse()
            .map((a) => (
              <div className="detail-item" key={a.id}>
                <div>
                  <strong>{a.title}</strong>
                  <p className="muted">
                    {
                      a.questions.filter(
                        (q, i) => q.correctIndex === a.answers[i],
                      ).length
                    }
                    /{a.questions.length} acertos ·{" "}
                    {new Date(a.createdAt).toLocaleDateString("pt-BR")}
                    {a.example ? " · Exemplo" : ""}
                  </p>
                </div>
                <button
                  className="button secondary small"
                  disabled={!!active}
                    onClick={() => setResultId(a.id)}
                >
                  Ver resultado
                </button>
              </div>
            ))
        ) : (
          <p className="muted">
            Conclua um quiz para acompanhar seus resultados aqui.
          </p>
        )}
      </section>
    </>
  );
}
