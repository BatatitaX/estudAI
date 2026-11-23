"use client";
import { AchievementMedal } from "./profile-art";
import { milestones } from "@/lib/rewards";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "./provider";
import { Badge, Empty, Heading, Icon, Modal, Progress } from "./ui";
import { Editor, DeleteDialog, SubjectBadge } from "./study";
import {
  dateKey,
  datePlus,
  formatDate,
  minutesLabel,
  type Item,
} from "@/lib/data";
export function Flashcards() {
  const { state, save } = useStore();
  const [editor, setEditor] = useState<Item | null | false>(false);
  const [cardEditor, setCardEditor] = useState<Item | null | false>(false);
  const [deleting, setDeleting] = useState<{
    kind: "decks" | "cards";
    item: Item;
  } | null>(null);
  const [deck, setDeck] = useState<string | null>(null);
  const [review, setReview] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [query, setQuery] = useState("");
  const decks = state.collections.decks.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase()),
  );
  const currentDeck = state.collections.decks.find((d) => d.id === deck);
  const cards = state.collections.cards.filter((c) => c.deck === deck);
  const current = state.collections.cards.find((c) => c.id === queue[index]);
  function start() {
    setQueue(cards.map((c) => c.id));
    setIndex(0);
    setRevealed(false);
    setReview(true);
  }
  function rate(difficulty: string) {
    if (!current) return;
    save("cards", {
      ...current,
      difficulty,
      reviews: (current.reviews || 0) + 1,
      reviewedAt: new Date().toISOString(),
    });
    setIndex((i) => i + 1);
    setRevealed(false);
  }
  return (
    <>
      <Heading
        title="Meus flashcards"
        description="Uma pergunta, uma descoberta. Aprenda no seu ritmo."
        action={
          <button className="button primary" onClick={() => setEditor(null)}>
            <Icon name="plus" size={18} />
            Novo baralho
          </button>
        }
      />
      {deck ? (
        <>
          <button
            className="text-link back-link"
            onClick={() => {
              setDeck(null);
              setReview(false);
            }}
          >
            <Icon name="back" size={17} />
            Todos os baralhos
          </button>
          <div className="card">
            <div className="section-heading">
              <div>
                <SubjectBadge id={currentDeck?.subject} />
                <h2>{currentDeck?.title}</h2>
              </div>
              <div className="row wrap">
                <button
                  className="button secondary"
                  onClick={() => setCardEditor(null)}
                >
                  <Icon name="plus" size={16} />
                  Novo cartão
                </button>
                <button
                  className="button primary"
                  disabled={!cards.length}
                  onClick={start}
                >
                  <Icon name="play" size={16} />
                  Revisar
                </button>
              </div>
            </div>
            <p className="muted">{currentDeck?.description}</p>
            {!cards.length ? (
              <Empty
                title="O primeiro cartão é o começo"
                text="Adicione uma pergunta e sua resposta para começar a revisar."
              />
            ) : (
              cards.map((c) => (
                <div className="flashcard-list-item" key={c.id}>
                  <div>
                    <h3>{c.title}</h3>
                    <p className="muted">{c.answer}</p>
                    <small>
                      {c.reviews || 0} revisões{" "}
                      {c.difficulty && `· Última: ${c.difficulty}`}
                    </small>
                  </div>
                  <div className="row">
                    <button
                      className="icon-button"
                      aria-label={`Editar ${c.title}`}
                      onClick={() => setCardEditor(c)}
                    >
                      <Icon name="edit" size={17} />
                    </button>
                    <button
                      className="icon-button"
                      aria-label={`Excluir ${c.title}`}
                      onClick={() => setDeleting({ kind: "cards", item: c })}
                    >
                      <Icon name="trash" size={17} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <label className="search-box">
            <Icon name="search" size={18} />
            <input
              aria-label="Buscar baralho"
              placeholder="Buscar um baralho…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="collection-grid">
            {decks.map((d) => {
              const list = state.collections.cards.filter(
                (c) => c.deck === d.id,
              );
              return (
                <article className="card deck-card" key={d.id}>
                  <div className="row between">
                    <span className="icon-tile purple">
                      <Icon name="cards" size={26} />
                    </span>
                    <div className="row">
                      <button
                        className="icon-button"
                        aria-label={`Editar ${d.title}`}
                        onClick={() => setEditor(d)}
                      >
                        <Icon name="edit" size={17} />
                      </button>
                      <button
                        className="icon-button"
                        aria-label={`Excluir ${d.title}`}
                        onClick={() => setDeleting({ kind: "decks", item: d })}
                      >
                        <Icon name="trash" size={17} />
                      </button>
                    </div>
                  </div>
                  <h2>{d.title}</h2>
                  <SubjectBadge id={d.subject} />
                  <p>{d.description || "Seu próximo assunto favorito."}</p>
                  <div className="row between muted">
                    <span>{list.length} cartões</span>
                    <span>
                      {list.filter((c) => c.reviews).length} revisados
                    </span>
                  </div>
                  <Progress
                    value={
                      list.length
                        ? (list.filter((c) => c.reviews).length / list.length) *
                          100
                        : 0
                    }
                    label="Cartões revisados"
                  />
                  <button
                    className="button secondary full"
                    onClick={() => setDeck(d.id)}
                  >
                    Abrir baralho <Icon name="arrow" size={16} />
                  </button>
                </article>
              );
            })}
          </div>
          {!decks.length && (
            <div className="card">
              <Empty
                title="Guarde o que você quer lembrar"
                text="Crie um baralho e adicione seus primeiros cartões."
              />
            </div>
          )}
        </>
      )}
      {editor !== false && (
        <Editor
          collection="decks"
          item={editor || undefined}
          onClose={() => setEditor(false)}
        />
      )}
      {cardEditor !== false && (
        <Editor
          collection="cards"
          item={cardEditor || undefined}
          defaults={{ deck: deck || "" }}
          onClose={() => setCardEditor(false)}
        />
      )}
      {deleting && (
        <DeleteDialog
          collection={deleting.kind}
          item={deleting.item}
          onClose={() => setDeleting(null)}
        />
      )}
      {review && (
        <Modal
          title={currentDeck?.title || "Revisão"}
          onClose={() => setReview(false)}
        >
          {current ? (
            <>
              <div className="row between muted">
                <span>
                  Cartão {index + 1} de {queue.length}
                </span>
                <span>{revealed ? "Resposta" : "Pergunta"}</span>
              </div>
              <Progress
                value={(index / queue.length) * 100}
                label="Progresso da revisão"
              />
              <button
                className={`review-card ${revealed ? "revealed" : ""}`}
                onClick={() => setRevealed(!revealed)}
              >
                <span className="eyebrow">
                  {revealed ? "A RESPOSTA" : "PENSE COM CALMA"}
                </span>
                <strong>{revealed ? current.answer : current.title}</strong>
                <span className="muted">
                  {revealed
                    ? "Toque para ver a pergunta"
                    : "Toque para revelar a resposta"}
                </span>
              </button>
              {revealed ? (
                <div className="review-actions">
                  <button
                    className="button secondary"
                    onClick={() => rate("Difícil")}
                  >
                    Difícil
                  </button>
                  <button
                    className="button secondary"
                    onClick={() => rate("Bom")}
                  >
                    Bom
                  </button>
                  <button
                    className="button primary"
                    onClick={() => rate("Fácil")}
                  >
                    Fácil <Icon name="check" size={17} />
                  </button>
                </div>
              ) : (
                <button
                  className="button primary full"
                  onClick={() => setRevealed(true)}
                >
                  <Icon name="eye" size={17} />
                  Revelar resposta
                </button>
              )}
            </>
          ) : (
            <div className="empty">
              <span className="icon-tile yellow">
                <Icon name="trophy" size={32} />
              </span>
              <h2>Mais um passo dado!</h2>
              <p>
                Você revisou {queue.length} cartões e ganhou {queue.length * 10}{" "}
                XP.
              </p>
              <button
                className="button primary"
                onClick={() => setReview(false)}
              >
                Concluir revisão
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
export function ProgressPage() {
  const { state, remove } = useStore();
  const [period, setPeriod] = useState(7);
  const c = state.collections;
  const completed = c.tasks.filter((t) => t.completed).length;
  const reviews = c.cards.reduce((n, c) => n + (c.reviews || 0), 0);
  const xp = completed * 30 + c.sessions.length * 20 + reviews * 10;
  const total = c.sessions.reduce((n, s) => n + (s.duration || 0), 0);
  let streak = 0,
    d = c.sessions.some((s) => s.date === dateKey()) ? 0 : 1;
  while (c.sessions.some((s) => s.date === datePlus(-d))) {
    streak++;
    d++;
  }
  const dates = Array.from({ length: period }, (_, i) =>
    datePlus(i - period + 1),
  );
  const data = dates.map((date) => ({
    date,
    minutes: c.sessions
      .filter((s) => s.date === date)
      .reduce((n, s) => n + (s.duration || 0), 0),
  }));
  const max = Math.max(60, ...data.map((d) => d.minutes));
  const weekTotal = data.reduce((n, d) => n + d.minutes, 0);
  const goals = Array.from(new Set(c.sessions.map((s) => s.date))).filter(
    (date) =>
      c.sessions
        .filter((s) => s.date === date)
        .reduce((n, s) => n + (s.duration || 0), 0) >=
      (state.profile?.dailyGoal || 60),
  ).length;
  const maxStreak = (() => {
    const dates = Array.from(
      new Set(c.sessions.map((s) => s.date).filter(Boolean)),
    ).sort() as string[];
    let best = 0,
      run = 0,
      previous = "";
    for (const date of dates) {
      const day = new Date(date + "T12:00:00");
      day.setDate(day.getDate() - 1);
      run = previous === dateKey(day) ? run + 1 : 1;
      best = Math.max(best, run);
      previous = date;
    }
    return best;
  })();
  const achievements = milestones.map(m => [m.name, m.description, m.icon, !!state.rewards.unlocked[m.id]] as const);
  return (
    <>
      <Heading
        title="Olha o quanto você já evoluiu."
        description="Seu esforço tem valor. Cada pequeno avanço conta."
      />
      <div className="progress-summary">
        <section className="level-card">
          <span className="icon-tile yellow">
            <Icon name="trophy" size={30} />
          </span>
          <div>
            <Badge color="yellow">NÍVEL {Math.floor(xp / 200) + 1}</Badge>
            <h2>Aprendendo e crescendo.</h2>
            <p>{xp} XP conquistados</p>
            <Progress
              value={(xp % 200) / 2}
              label="Progresso para o próximo nível"
            />
            <small>{200 - (xp % 200)} XP para o próximo nível</small>
          </div>
        </section>
        <section className="card progress-stat">
          <Icon name="clock" size={26} />
          <strong>{minutesLabel(total)}</strong>
          <span>de aprendizado</span>
        </section>
        <section className="card progress-stat">
          <Icon name="flame" size={26} />
          <strong>{streak} dias</strong>
          <span>de sequência atual</span>
        </section>
      </div>
      <section className="card activity-card">
        <div className="section-heading">
          <div>
            <h2>Seu tempo, bem investido</h2>
            <p className="muted">
              {minutesLabel(weekTotal)} nos últimos {period} dias
            </p>
          </div>
          <select
            aria-label="Período do gráfico"
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
          >
            <option value="7">Últimos 7 dias</option>
            <option value="14">Últimos 14 dias</option>
            <option value="30">Últimos 30 dias</option>
          </select>
        </div>
        <div
          className="bar-chart"
          role="img"
          aria-label={`Tempo estudado: ${data.map((d) => `${formatDate(d.date)}: ${d.minutes} minutos`).join("; ")}`}
        >
          {data.map((d, i) => (
            <div
              className="bar-column"
              key={d.date}
              title={`${formatDate(d.date)}: ${d.minutes} min`}
            >
              <span className="bar-value">{d.minutes || ""}</span>
              <div
                className={`bar ${d.date === dateKey() ? "current" : ""}`}
                style={{ height: `${Math.max(2, (d.minutes / max) * 150)}px` }}
              />
              <small>
                {period > 14
                  ? i % 5 === 0
                    ? d.date.slice(-2)
                    : ""
                  : new Date(d.date + "T12:00:00")
                      .toLocaleDateString("pt-BR", { weekday: "short" })
                      .replace(".", "")}
              </small>
            </div>
          ))}
        </div>
        {!weekTotal && (
          <p className="muted">
            Nenhuma sessão neste período. Comece seu próximo foco para preencher
            o gráfico.
          </p>
        )}
      </section>
      <div className="dashboard-grid">
        <section className="card">
          <div className="section-heading">
            <h2>Suas conquistas</h2>
            <Badge>
              {achievements.filter((a) => a[3]).length} de {achievements.length}
            </Badge>
          </div>
          <div className="achievements">
            {achievements.map(([title, desc, icon, unlocked]) => (
              <article
                className={unlocked ? "unlocked" : ""}
                key={String(title)}
              >
                <span
                  className={`icon-tile ${unlocked ? "yellow" : "neutral"}`}
                >
                  <AchievementMedal id={milestones.find(m=>m.name===title)?.id||"first"} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <small>{unlocked ? "Conquistada" : "Em progresso"}</small>
                </div>
                {unlocked && <Icon name="check" size={17} />}
              </article>
            ))}
          </div>
        </section>
        <section className="card">
          <h2>Foco por matéria</h2>
          {c.subjects.length ? (
            c.subjects.map((s) => {
              const time = c.sessions
                .filter((x) => x.subject === s.id)
                .reduce((n, x) => n + (x.duration || 0), 0);
              return (
                <div className="subject-time" key={s.id}>
                  <div className="row between">
                    <SubjectBadge id={s.id} />
                    <strong>{minutesLabel(time)}</strong>
                  </div>
                  <Progress
                    value={total ? (time / total) * 100 : 0}
                    label={`Tempo em ${s.title}`}
                  />
                </div>
              );
            })
          ) : (
            <Empty text="Adicione matérias e registre suas sessões." />
          )}
          <Link href="/pomodoro" className="button secondary full">
            <Icon name="timer" size={17} />
            Mais um momento de foco
          </Link>
        </section>
      </div>
      <section className="card saved-results">
        <h2>Resultados salvos</h2>
        {c.results.length ? (
          c.results.map((r) => (
            <div className="detail-item" key={r.id}>
              <div>
                <strong>{r.title}</strong>
                <p>{r.description}</p>
                <SubjectBadge id={r.subject} />
                <small className="muted"> · {formatDate(r.date)}</small>
              </div>
              <button
                className="icon-button"
                aria-label={`Excluir resultado ${r.title}`}
                onClick={() => remove("results", r.id)}
              >
                <Icon name="trash" size={17} />
              </button>
            </div>
          ))
        ) : (
          <p className="muted">Seus cálculos salvos aparecerão aqui.</p>
        )}
      </section>
    </>
  );
}
export { QuizPage as AIPage } from "./quiz";
