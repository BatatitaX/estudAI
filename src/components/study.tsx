"use client";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "./provider";
import { Badge, Empty, Heading, Icon, Modal, Progress } from "./ui";
import {
  dateKey,
  datePlus,
  days,
  formatDate,
  minutesLabel,
  uid,
  type Collection,
  type Item,
} from "@/lib/data";
import { differenceInDays } from "@/lib/calculations.mjs";
type Field = {
  key: keyof Item;
  label: string;
  type?: string;
  options?: string[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
};
const subjectField: Field = {
  key: "subject",
  label: "Matéria",
  type: "subject",
};
const descriptions: Record<
  string,
  {
    title: string;
    singular: string;
    description: string;
    icon: string;
    fields: Field[];
  }
> = {
  subjects: {
    title: "Minhas matérias",
    singular: "matéria",
    description: "Cada matéria, um novo universo para explorar.",
    icon: "book",
    fields: [
      { key: "title", label: "Nome da matéria", required: true },
      { key: "color", label: "Cor", type: "color" },
      { key: "teacher", label: "Professor(a)" },
      {
        key: "goal",
        label: "Meta semanal (minutos)",
        type: "number",
        min: 1,
        max: 10080,
      },
      { key: "description", label: "Descrição", type: "textarea" },
    ],
  },
  tasks: {
    title: "Minhas tarefas",
    singular: "tarefa",
    description: "Tire da cabeça. Coloque no papel. Dê o próximo passo.",
    icon: "tasks",
    fields: [
      { key: "title", label: "O que precisa fazer?", required: true },
      subjectField,
      { key: "date", label: "Prazo", type: "date" },
      {
        key: "priority",
        label: "Prioridade",
        options: ["Média", "Alta", "Baixa"],
      },
      { key: "description", label: "Detalhes", type: "textarea" },
    ],
  },
  exams: {
    title: "Minhas provas",
    singular: "prova",
    description: "Se prepare com calma. Uma avaliação de cada vez.",
    icon: "target",
    fields: [
      { key: "title", label: "Nome da avaliação", required: true },
      subjectField,
      { key: "date", label: "Data", type: "date", required: true },
      { key: "time", label: "Horário", type: "time" },
      {
        key: "minimum",
        label: "Nota mínima",
        type: "number",
        min: 0,
        max: 10,
        step: 0.1,
        required: true,
      },
      { key: "description", label: "Conteúdos para estudar", type: "textarea" },
    ],
  },
  notes: {
    title: "Minhas anotações",
    singular: "anotação",
    description: "Ideias, descobertas e o que não dá para esquecer.",
    icon: "notes",
    fields: [
      { key: "title", label: "Título", required: true },
      subjectField,
      {
        key: "description",
        label: "Sua anotação",
        type: "textarea",
        required: true,
      },
    ],
  },
  decks: {
    title: "Meus flashcards",
    singular: "baralho",
    description: "Aprender, lembrar, repetir. Um cartão de cada vez.",
    icon: "cards",
    fields: [
      { key: "title", label: "Nome do baralho", required: true },
      subjectField,
      { key: "description", label: "Descrição", type: "textarea" },
    ],
  },
  cards: {
    title: "Cartões",
    singular: "cartão",
    description: "",
    icon: "cards",
    fields: [
      { key: "title", label: "Pergunta", type: "textarea", required: true },
      { key: "answer", label: "Resposta", type: "textarea", required: true },
    ],
  },
  plan: {
    title: "Meu plano de estudos",
    singular: "bloco de estudo",
    description: "Um plano realista é um plano que funciona para você.",
    icon: "plan",
    fields: [
      { key: "title", label: "O que vai estudar?", required: true },
      subjectField,
      { key: "day", label: "Dia da semana", options: days },
      { key: "time", label: "Horário", type: "time", required: true },
      {
        key: "duration",
        label: "Duração (minutos)",
        type: "number",
        required: true,
        min: 5,
        max: 480,
      },
    ],
  },
  grades: {
    title: "Notas",
    singular: "nota",
    description: "",
    icon: "calculator",
    fields: [
      { key: "title", label: "Avaliação", required: true },
      subjectField,
      {
        key: "grade",
        label: "Nota",
        type: "number",
        min: 0,
        max: 10,
        step: 0.01,
        required: true,
      },
      {
        key: "weight",
        label: "Peso",
        type: "number",
        min: 0.01,
        max: 1000,
        step: 0.01,
        required: true,
      },
    ],
  },
};
export function Editor({
  collection,
  item,
  onClose,
  defaults = {},
}: {
  collection: Collection;
  item?: Item;
  onClose: () => void;
  defaults?: Partial<Item>;
}) {
  const { state, save } = useStore();
  const config = descriptions[collection];
  const values = {
    color: "#7C5CFC",
    minimum: 7,
    weight: 1,
    duration: 45,
    goal: 120,
    ...defaults,
    ...item,
  };
  return (
    <Modal
      title={`${item ? "Editar" : "Nova" + (collection === "decks" || collection === "cards" || collection === "plan" ? "o" : "")} ${config.singular}`.replace(
        "Novao",
        "Novo",
      )}
      onClose={onClose}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const output: Item = {
            ...defaults,
            ...item,
            id: item?.id || uid(),
            title: "",
          };
          config.fields.forEach((field) => {
            const raw = f.get(field.key);
            const value =
              field.type === "number"
                ? raw === ""
                  ? undefined
                  : Number(raw)
                : String(raw ?? "").trim();
            Object.assign(output, { [field.key]: value });
          });
          if (!output.title) return;
          save(collection, output);
          onClose();
        }}
      >
        <div className="editor-fields">
          {config.fields.map((field) => (
            <label key={field.key}>
              {field.label}
              {field.required && <span className="required"> *</span>}
              {field.type === "subject" ? (
                <select name={field.key} defaultValue={values.subject || ""}>
                  <option value="">Sem matéria</option>
                  {state.collections.subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              ) : field.options ? (
                <select
                  name={field.key}
                  defaultValue={String(values[field.key] ?? field.options[0])}
                >
                  {field.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  rows={field.key === "description" ? 5 : 3}
                  name={field.key}
                  required={field.required}
                  defaultValue={String(values[field.key] ?? "")}
                  maxLength={20000}
                />
              ) : (
                <input
                  name={field.key}
                  required={field.required}
                  type={field.type || "text"}
                  defaultValue={String(values[field.key] ?? "")}
                  min={field.min}
                  max={field.max}
                  step={field.step ?? (field.type === "number" ? 1 : undefined)}
                  maxLength={field.type ? undefined : 140}
                />
              )}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="button primary">
            <Icon name="check" size={17} />
            Salvar {config.singular}
          </button>
        </div>
      </form>
    </Modal>
  );
}
export function DeleteDialog({
  collection,
  item,
  onClose,
}: {
  collection: Collection;
  item: Item;
  onClose: () => void;
}) {
  const { remove } = useStore();
  return (
    <Modal title="Excluir este item?" onClose={onClose}>
      <p>
        “{item.title}” será excluído.
        {collection === "decks"
          ? " Os cartões deste baralho também serão apagados."
          : collection === "subjects"
            ? " Os registros vinculados serão mantidos, sem matéria."
            : ""}
      </p>
      <div className="modal-actions">
        <button className="button secondary" onClick={onClose}>
          Cancelar
        </button>
        <button
          className="button danger"
          onClick={() => {
            remove(collection, item.id);
            onClose();
          }}
        >
          Excluir
        </button>
      </div>
    </Modal>
  );
}
export function SubjectBadge({ id }: { id?: string }) {
  const { state } = useStore();
  const s = state.collections.subjects.find((s) => s.id === id);
  return (
    <span className="subject-label">
      <i style={{ background: s?.color || "#93919F" }} />
      {s?.title || "Sem matéria"}
    </span>
  );
}
export function TaskRow({
  task,
  onEdit,
  onDelete,
}: {
  task: Item;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const { save } = useStore();
  return (
    <div className={`task-row ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={!!task.completed}
        aria-label={`Concluir ${task.title}`}
        onChange={(e) =>
          save("tasks", {
            ...task,
            completed: e.target.checked,
            completedAt: e.target.checked
              ? new Date().toISOString()
              : undefined,
          })
        }
      />
      <div className="task-main">
        <strong>{task.title}</strong>
        <span>
          <SubjectBadge id={task.subject} />
          <span
            className={
              task.date && task.date < dateKey() && !task.completed
                ? "overdue"
                : ""
            }
          >
            {formatDate(task.date)}
          </span>
        </span>
      </div>
      <Badge
        color={
          task.priority === "Alta"
            ? "orange"
            : task.priority === "Baixa"
              ? "green"
              : "purple"
        }
      >
        {task.priority || "Média"}
      </Badge>
      {onEdit && (
        <button
          className="icon-button"
          aria-label={`Editar ${task.title}`}
          onClick={onEdit}
        >
          <Icon name="edit" size={17} />
        </button>
      )}
      {onDelete && (
        <button
          className="icon-button"
          aria-label={`Excluir ${task.title}`}
          onClick={onDelete}
        >
          <Icon name="trash" size={17} />
        </button>
      )}
    </div>
  );
}
export function Dashboard() {
  const { state } = useStore();
  const [edit, setEdit] = useState(false);
  const c = state.collections;
  const completed = c.tasks.filter((t) => t.completed).length;
  const todayMinutes = c.sessions
    .filter((s) => s.date === dateKey())
    .reduce((a, b) => a + (b.duration || 0), 0);
  const goal = state.profile?.dailyGoal || 60;
  const totalMinutes = c.sessions.reduce((a, b) => a + (b.duration || 0), 0);
  const xp =
    completed * 30 +
    c.sessions.length * 20 +
    c.cards.reduce((n, c) => n + (c.reviews || 0) * 10, 0);
  let streak = 0;
  let d = c.sessions.some((s) => s.date === dateKey()) ? 0 : 1;
  while (c.sessions.some((s) => s.date === datePlus(-d))) {
    streak++;
    d++;
  }
  const next = c.exams
    .filter((e) => e.date && e.date >= dateKey())
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""))[0];
  const tasks = c.tasks
    .filter((t) => !t.completed)
    .sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"))
    .slice(0, 4);
  return (
    <>
      <Heading
        eyebrow="SEU RITMO. SUAS CONQUISTAS."
        title={`Olá, ${state.profile?.name.split(" ")[0]}! Bora estudar?`}
        description="Um pouco de foco hoje faz diferença amanhã."
        action={
          <Link href="/dashboard/ferramentas/pomodoro" className="button primary">
            <Icon name="play" size={17} />
            Iniciar foco
          </Link>
        }
      />
      <section className="daily-banner">
        <div>
          <Badge color="yellow">
            <Icon name="sparkles" size={14} /> CADA PASSO CONTA
          </Badge>
          <h2>
            Você não precisa fazer tudo.
            <br />
            Só precisa continuar.
          </h2>
          <p>Separe um momento para o que você quer aprender.</p>
          <Link href="/dashboard/plano" className="text-link">
            Ver meu plano de estudos <Icon name="arrow" size={17} />
          </Link>
        </div>
        <div className="daily-goal">
          <div
            className="goal-ring"
            style={
              {
                "--progress": `${Math.min(1, todayMinutes / goal) * 360}deg`,
              } as React.CSSProperties
            }
          >
            <div>
              <Icon name="zap" size={22} />
              <strong>
                {Math.round((todayMinutes / goal) * 100)}
                <small>%</small>
              </strong>
            </div>
          </div>
          <strong>Sua meta de hoje</strong>
          <span>
            {todayMinutes} de {goal} minutos
          </span>
        </div>
      </section>
      <div className="stat-grid">
        {[
          [
            "flame",
            "orange",
            `${streak} ${streak === 1 ? "dia" : "dias"}`,
            "Sequência de estudos",
            "Continue no seu ritmo",
          ],
          [
            "clock",
            "purple",
            minutesLabel(totalMinutes),
            "Tempo estudado",
            "Cada minuto é um avanço",
          ],
          [
            "checks",
            "green",
            `${completed}/${c.tasks.length}`,
            "Tarefas concluídas",
            `${c.tasks.length - completed} esperando seu próximo passo`,
          ],
          [
            "zap",
            "yellow",
            `${xp} XP`,
            "Seu aprendizado vale",
            `Nível ${Math.floor(xp / 200) + 1} · ${200 - (xp % 200)} XP para o próximo`,
          ],
        ].map(([icon, color, value, label, detail]) => (
          <article className="stat-card" key={label}>
            <div className="row between">
              <span>{label}</span>
              <span className={`small-icon ${color}`}>
                <Icon name={icon} />
              </span>
            </div>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="card">
          <div className="section-heading">
            <h2>Seu próximo passo</h2>
            <button
              className="icon-button purple"
              aria-label="Adicionar tarefa"
              onClick={() => setEdit(true)}
            >
              <Icon name="plus" />
            </button>
          </div>
          <div className="subheading">Um item de cada vez. Você consegue.</div>
          {tasks.length ? (
            tasks.map((t) => <TaskRow task={t} key={t.id} />)
          ) : (
            <Empty
              title="Tudo em dia por aqui"
              text="Adicione uma tarefa e organize seu próximo passo."
            />
          )}
          <Link href="/dashboard/tarefas" className="card-bottom-link">
            Ver todas as tarefas <Icon name="arrow" size={16} />
          </Link>
        </section>
        <section className="card next-exam">
          <div className="section-heading">
            <h2>Próxima prova</h2>
            <Icon name="calendar" />
          </div>
          {next ? (
            <>
              <SubjectBadge id={next.subject} />
              <h3>{next.title}</h3>
              <div className="exam-countdown">
                <strong>{differenceInDays(dateKey(), next.date!)}</strong>
                <span>
                  dias para
                  <br />
                  dar o seu melhor
                </span>
              </div>
              <div className="row muted">
                <Icon name="calendar" size={16} />
                {formatDate(next.date)}
                {next.time && ` · ${next.time}`}
              </div>
              <Link href="/dashboard/provas" className="button secondary full">
                Ver detalhes <Icon name="arrow" size={17} />
              </Link>
            </>
          ) : (
            <Empty
              title="Agenda livre"
              text="Cadastre uma prova para se preparar com antecedência."
              action={
                <Link href="/dashboard/provas" className="text-link">
                  Adicionar prova
                </Link>
              }
            />
          )}
        </section>
        <section className="card">
          <div className="section-heading">
            <h2>Minhas matérias</h2>
            <Link href="/dashboard/materias" className="text-link">
              Ver todas <Icon name="arrow" size={16} />
            </Link>
          </div>
          {c.subjects.length ? (
            <div className="mini-subject-grid">
              {c.subjects.slice(0, 4).map((s) => {
                const mins = c.sessions
                  .filter((x) => x.subject === s.id && x.date! >= datePlus(-6))
                  .reduce((a, b) => a + (b.duration || 0), 0);
                return (
                  <Link
                    href="/dashboard/materias"
                    className="mini-subject"
                    key={s.id}
                  >
                    <span className="subject-icon" style={{ color: s.color }}>
                      <Icon name="book" />
                    </span>
                    <strong>{s.title}</strong>
                    <small>
                      {mins} / {s.goal || 120} min nesta semana
                    </small>
                    <Progress
                      value={(mins / (s.goal || 120)) * 100}
                      label={`Meta de ${s.title}`}
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <Empty
              title="O que você quer aprender?"
              action={
                <Link href="/dashboard/materias" className="text-link">
                  Adicionar matéria
                </Link>
              }
            />
          )}
        </section>
        <section className="focus-card">
          <span className="icon-tile">
            <Icon name="timer" size={27} />
          </span>
          <h2>
            Seu momento
            <br />
            de foco.
          </h2>
          <p>
            Silencie o mundo por alguns minutos. É hora de cuidar das suas
            metas.
          </p>
          <div className="focus-time">
            25<span>:00</span>
          </div>
          <Link href="/dashboard/ferramentas/pomodoro" className="button white full">
            <Icon name="play" size={17} />
            Vamos começar
          </Link>
        </section>
      </div>
      {edit && <Editor collection="tasks" onClose={() => setEdit(false)} />}
    </>
  );
}
export function CollectionPage({
  collection,
}: {
  collection: "subjects" | "tasks" | "exams" | "notes";
}) {
  const { state } = useStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [subject, setSubject] = useState("all");
  const [editor, setEditor] = useState<Item | null | false>(false);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [detail, setDetail] = useState<Item | null>(null);
  const config = descriptions[collection];
  const items = state.collections[collection]
    .filter((x) =>
      (x.title + " " + (x.description || ""))
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .filter((x) => subject === "all" || x.subject === subject)
    .filter(
      (x) =>
        collection !== "tasks" ||
        filter === "all" ||
        (filter === "done"
          ? x.completed
          : filter === "pending"
            ? !x.completed
            : !x.completed && x.date && x.date < dateKey()),
    );
  const label = `Nova ${config.singular}`;
  return (
    <>
      <Heading
        title={config.title}
        description={config.description}
        action={
          <button className="button primary" onClick={() => setEditor(null)}>
            <Icon name="plus" size={18} />
            {label}
          </button>
        }
      />
      <div className="filters">
        <label className="search-box">
          <Icon name="search" size={18} />
          <input
            aria-label={`Buscar ${config.title.toLowerCase()}`}
            placeholder="Buscar por nome ou conteúdo…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        {collection !== "subjects" && (
          <select
            aria-label="Filtrar por matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="all">Todas as matérias</option>
            {state.collections.subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        )}
        {collection === "tasks" && (
          <select
            aria-label="Filtrar por status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todas as tarefas</option>
            <option value="pending">Pendentes</option>
            <option value="done">Concluídas</option>
            <option value="late">Atrasadas</option>
          </select>
        )}
      </div>
      {!items.length ? (
        <div className="card">
          <Empty
            title={
              query || filter !== "all" || subject !== "all"
                ? "Nenhum resultado por aqui"
                : `Seu espaço está pronto para começar`
            }
            text={
              query
                ? "Tente outra palavra ou ajuste os filtros."
                : `Adicione uma ${config.singular} para dar o primeiro passo.`
            }
            action={
              <button
                className="button secondary"
                onClick={() => setEditor(null)}
              >
                <Icon name="plus" size={16} />
                {label}
              </button>
            }
          />
        </div>
      ) : collection === "tasks" ? (
        <div className="card task-list">
          {items.map((item) => (
            <TaskRow
              key={item.id}
              task={item}
              onEdit={() => setEditor(item)}
              onDelete={() => setDeleting(item)}
            />
          ))}
        </div>
      ) : (
        <div className="collection-grid">
          {items.map((item) => (
            <article
              key={item.id}
              className={`card entity-card ${collection}`}
              style={
                {
                  "--subject-color": item.color || "#7C5CFC",
                } as React.CSSProperties
              }
            >
              <div className="row between">
                <span
                  className={`icon-tile ${collection === "exams" ? "orange" : collection === "notes" ? "yellow" : "purple"}`}
                  style={
                    collection === "subjects"
                      ? { color: item.color }
                      : undefined
                  }
                >
                  <Icon name={config.icon} size={24} />
                </span>
                <div className="row">
                  <button
                    className="icon-button"
                    aria-label={`Editar ${item.title}`}
                    onClick={() => setEditor(item)}
                  >
                    <Icon name="edit" size={17} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`Excluir ${item.title}`}
                    onClick={() => setDeleting(item)}
                  >
                    <Icon name="trash" size={17} />
                  </button>
                </div>
              </div>
              <h2>{item.title}</h2>
              {collection !== "subjects" && <SubjectBadge id={item.subject} />}
              <p className="entity-description">
                {item.description ||
                  "Adicione detalhes para deixar tudo do seu jeito."}
              </p>
              {collection === "subjects" && (
                <>
                  <div className="row muted">
                    <Icon name="user" size={16} />
                    {item.teacher || "Professor não informado"}
                  </div>
                  <div className="subject-counts">
                    <span>
                      {
                        state.collections.tasks.filter(
                          (t) => t.subject === item.id && !t.completed,
                        ).length
                      }{" "}
                      tarefas pendentes
                    </span>
                    <span>{item.goal || 120} min / semana</span>
                  </div>
                  <button
                    className="button secondary full"
                    onClick={() => setDetail(item)}
                  >
                    Abrir matéria <Icon name="arrow" size={16} />
                  </button>
                </>
              )}
              {collection === "exams" && (
                <>
                  <div className="exam-meta">
                    <span>
                      <Icon name="calendar" size={17} />
                      {formatDate(item.date)} {item.time}
                    </span>
                    <Badge color={item.date! < dateKey() ? "green" : "orange"}>
                      {item.date! < dateKey()
                        ? "Realizada"
                        : `${differenceInDays(dateKey(), item.date!)} dias`}
                    </Badge>
                  </div>
                  <div className="muted">
                    Nota mínima: {item.minimum?.toLocaleString("pt-BR")}
                  </div>
                  <button
                    className="button secondary full"
                    onClick={() => setDetail(item)}
                  >
                    Ver conteúdos <Icon name="arrow" size={16} />
                  </button>
                </>
              )}
              {collection === "notes" && (
                <button className="text-link" onClick={() => setDetail(item)}>
                  Ler anotação <Icon name="arrow" size={16} />
                </button>
              )}
            </article>
          ))}
        </div>
      )}
      {editor !== false && (
        <Editor
          collection={collection}
          item={editor || undefined}
          onClose={() => setEditor(false)}
        />
      )}
      {deleting && (
        <DeleteDialog
          collection={collection}
          item={deleting}
          onClose={() => setDeleting(null)}
        />
      )}
      {detail &&
        (collection === "subjects" ? (
          <SubjectDetail subject={detail} onClose={() => setDetail(null)} />
        ) : (
          <Modal title={detail.title} onClose={() => setDetail(null)}>
            <SubjectBadge id={detail.subject} />
            <p className="pre-wrap">
              {detail.description || "Nenhum conteúdo adicionado."}
            </p>
            <button
              className="button primary"
              onClick={() => {
                setEditor(detail);
                setDetail(null);
              }}
            >
              Editar {config.singular}
            </button>
          </Modal>
        ))}
    </>
  );
}
function SubjectDetail({
  subject,
  onClose,
}: {
  subject: Item;
  onClose: () => void;
}) {
  const { state } = useStore();
  const [tab, setTab] = useState("grades");
  const [edit, setEdit] = useState<Item | null | false>(false);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const grades = state.collections.grades.filter(
    (g) => g.subject === subject.id,
  );
  const average = grades.length
    ? grades.reduce((n, g) => n + (g.grade || 0) * (g.weight || 1), 0) /
      grades.reduce((n, g) => n + (g.weight || 1), 0)
    : 0;
  return (
    <Modal title={subject.title} onClose={onClose}>
      <div className="tabs">
        {[
          ["grades", "Notas"],
          ["tasks", "Tarefas"],
          ["exams", "Provas"],
          ["notes", "Anotações"],
          ["decks", "Flashcards"],
          ["sessions", "Sessões"],
        ].map(([id, title]) => (
          <button
            key={id}
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            {title}
          </button>
        ))}
      </div>
      {tab === "grades" && (
        <div className="row between">
          <p>
            Média ponderada:{" "}
            <strong>
              {grades.length
                ? average.toLocaleString("pt-BR", { maximumFractionDigits: 2 })
                : "—"}
            </strong>
          </p>
          <button className="button secondary" onClick={() => setEdit(null)}>
            <Icon name="plus" size={16} />
            Nota
          </button>
        </div>
      )}
      {state.collections[tab as Collection]
        .filter((x) => x.subject === subject.id)
        .map((x) => (
          <div className="detail-item" key={x.id}>
            <div>
              <strong>{x.title}</strong>
              <p className="muted">
                {tab === "grades"
                  ? `Nota ${x.grade} · Peso ${x.weight}`
                  : tab === "sessions"
                    ? `${formatDate(x.date)} · ${x.duration} min`
                    : x.description || formatDate(x.date)}
              </p>
            </div>
            {tab === "grades" && (
              <div className="row">
                <button
                  className="icon-button"
                  aria-label={`Editar ${x.title}`}
                  onClick={() => setEdit(x)}
                >
                  <Icon name="edit" size={17} />
                </button>
                <button
                  className="icon-button"
                  aria-label={`Excluir ${x.title}`}
                  onClick={() => setDeleting(x)}
                >
                  <Icon name="trash" size={17} />
                </button>
              </div>
            )}
          </div>
        ))}
      {!state.collections[tab as Collection].some(
        (x) => x.subject === subject.id,
      ) && (
        <Empty
          title="Nada por aqui ainda"
          text="Os registros desta matéria aparecerão aqui."
        />
      )}
      {edit !== false && (
        <Editor
          collection="grades"
          item={edit || undefined}
          defaults={{ subject: subject.id }}
          onClose={() => setEdit(false)}
        />
      )}
      {deleting && (
        <DeleteDialog
          collection="grades"
          item={deleting}
          onClose={() => setDeleting(null)}
        />
      )}
    </Modal>
  );
}
export function Calendar() {
  const { state } = useStore();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selected, setSelected] = useState(dateKey());
  const [editor, setEditor] = useState(false);
  const first = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const events = [
    ...state.collections.exams.map((x) => ({
      ...x,
      kind: "Prova",
      color: "purple",
      href: "/dashboard/provas",
    })),
    ...state.collections.tasks
      .filter((x) => !x.completed)
      .map((x) => ({
        ...x,
        kind: "Tarefa",
        color: "orange",
        href: "/dashboard/tarefas",
      })),
  ];
  function change(delta: number) {
    const d = new Date(year, month + delta, 1);
    setMonth(d.getMonth());
    setYear(d.getFullYear());
  }
  return (
    <>
      <Heading
        title="Meu calendário"
        description="Veja o que vem por aí e encontre espaço para se preparar."
        action={
          <button className="button primary" onClick={() => setEditor(true)}>
            <Icon name="plus" size={18} />
            Nova prova
          </button>
        }
      />
      <div className="calendar-layout">
        <section className="card calendar-card">
          <div className="section-heading">
            <h2 className="capitalize">
              {new Date(year, month, 1).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="row">
              <button
                className="button secondary small"
                onClick={() => {
                  setMonth(new Date().getMonth());
                  setYear(new Date().getFullYear());
                  setSelected(dateKey());
                }}
              >
                Hoje
              </button>
              <button
                className="icon-button"
                aria-label="Mês anterior"
                onClick={() => change(-1)}
              >
                <Icon name="left" />
              </button>
              <button
                className="icon-button"
                aria-label="Próximo mês"
                onClick={() => change(1)}
              >
                <Icon name="right" />
              </button>
            </div>
          </div>
          <div className="calendar-grid">
            {days.map((day) => (
              <div className="calendar-weekday" key={day}>
                {day.slice(0, 3)}
              </div>
            ))}
            {Array.from({ length: first }, (_, i) => (
              <div className="calendar-day blank" key={"blank" + i} />
            ))}
            {Array.from({ length: count }, (_, i) => {
              const day = `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
              const list = events.filter((x) => x.date === day);
              return (
                <button
                  key={day}
                  className={`calendar-day ${day === selected ? "selected" : ""} ${day === dateKey() ? "today" : ""}`}
                  onClick={() => setSelected(day)}
                  aria-label={`${i + 1} de ${new Date(year, month, 1).toLocaleDateString("pt-BR", { month: "long" })}, ${list.length} eventos`}
                >
                  <strong>{i + 1}</strong>
                  {list.slice(0, 2).map((x) => (
                    <span className={`calendar-event ${x.color}`} key={x.id}>
                      {x.title}
                    </span>
                  ))}
                  {list.length > 2 && <small>+{list.length - 2}</small>}
                </button>
              );
            })}
          </div>
        </section>
        <aside className="card agenda">
          <p className="eyebrow">SUA AGENDA</p>
          <h2>{formatDate(selected)}</h2>
          {events.filter((x) => x.date === selected).length ? (
            events
              .filter((x) => x.date === selected)
              .map((x) => (
                <Link href={x.href} className="agenda-event" key={x.id}>
                  <Badge color={x.color}>{x.kind}</Badge>
                  <h3>{x.title}</h3>
                  <SubjectBadge id={x.subject} />
                  {x.time && <p className="muted">{x.time}</p>}
                </Link>
              ))
          ) : (
            <Empty
              title="Um dia com espaço"
              text="Sem provas ou tarefas pendentes para esta data."
            />
          )}
          <button
            className="button secondary full"
            onClick={() => setEditor(true)}
          >
            <Icon name="plus" size={16} />
            Agendar prova
          </button>
        </aside>
      </div>
      {editor && (
        <Editor
          collection="exams"
          defaults={{ date: selected }}
          onClose={() => setEditor(false)}
        />
      )}
    </>
  );
}
export function Plan() {
  const { state, setState, toast } = useStore();
  const [editor, setEditor] = useState<Item | null | false>(false);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [generate, setGenerate] = useState(false);
  if (state.plan !== "plus")
    return (
      <>
        <Heading
          title="Seu plano de estudos, com o Estudaí+"
          description="Organize sua semana e encontre o ritmo certo para aprender."
        />
        <section className="card empty">
          <span className="icon-tile purple">
            <Icon name="lock" />
          </span>
          <h2>Um plano feito para sua rotina</h2>
          <p>
            O planejamento semanal faz parte do Estudaí+. Seus blocos já salvos
            continuam guardados.
          </p>
          <Link href="/estudai-plus" className="button primary">
            Conhecer Estudaí+
          </Link>
        </section>
      </>
    );
  return (
    <>
      <Heading
        title="Meu plano de estudos"
        description="O plano é seu. O ritmo também."
        action={
          <div className="row wrap">
            <button
              className="button secondary"
              onClick={() => setGenerate(true)}
            >
              <Icon name="wand" size={18} />
              Montar plano
            </button>
            <button className="button primary" onClick={() => setEditor(null)}>
              <Icon name="plus" size={18} />
              Novo bloco
            </button>
          </div>
        }
      />
      <div className="notice">
        <Icon name="plan" />
        <span>
          Seu planejamento semanal se repete. Distribua o tempo entre as
          matérias e ajuste quando precisar.
        </span>
      </div>
      <div className="plan-grid">
        {days.map((day) => (
          <section className="plan-column" key={day}>
            <h2>
              {day}
              <span>
                {state.collections.plan.filter((x) => x.day === day).length}
              </span>
            </h2>
            {state.collections.plan
              .filter((x) => x.day === day)
              .sort((a, b) => (a.time || "").localeCompare(b.time || ""))
              .map((x) => (
                <article className="plan-block" key={x.id}>
                  <span className="row muted">
                    <Icon name="clock" size={15} />
                    {x.time} · {x.duration} min
                  </span>
                  <h3>{x.title}</h3>
                  <SubjectBadge id={x.subject} />
                  <div className="row between">
                    <button className="text-link" onClick={() => setEditor(x)}>
                      Editar
                    </button>
                    <button
                      className="icon-button"
                      aria-label={`Excluir ${x.title}`}
                      onClick={() => setDeleting(x)}
                    >
                      <Icon name="trash" size={15} />
                    </button>
                  </div>
                </article>
              ))}
            {!state.collections.plan.some((x) => x.day === day) && (
              <p className="plan-empty">
                Espaço para aprender
                <br />
                ou descansar.
              </p>
            )}
          </section>
        ))}
      </div>
      {editor !== false && (
        <Editor
          collection="plan"
          item={editor || undefined}
          onClose={() => setEditor(false)}
        />
      )}
      {deleting && (
        <DeleteDialog
          collection="plan"
          item={deleting}
          onClose={() => setDeleting(null)}
        />
      )}
      {generate && (
        <Modal
          title="Um plano para a sua semana"
          onClose={() => setGenerate(false)}
        >
          {!state.collections.subjects.length ? (
            <Empty
              title="Comece pelas matérias"
              text="Cadastre pelo menos uma matéria para distribuir seu tempo."
              action={
                <Link href="/dashboard/materias" className="button primary">
                  Adicionar matéria
                </Link>
              }
            />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const selected = f.getAll("days").map(String);
                if (!selected.length) {
                  toast("Escolha ao menos um dia.");
                  return;
                }
                const subjects = f.getAll("subjects").map(String);
                if (!subjects.length) {
                  toast("Escolha ao menos uma matéria.");
                  return;
                }
                const duration = Number(f.get("duration"));
                const time = String(f.get("time"));
                const ordered = subjects.sort((a, b) => {
                  const da =
                    state.collections.exams
                      .filter((e) => e.subject === a && e.date! >= dateKey())
                      .map((e) => e.date!)
                      .sort()[0] || "9999";
                  const db =
                    state.collections.exams
                      .filter((e) => e.subject === b && e.date! >= dateKey())
                      .map((e) => e.date!)
                      .sort()[0] || "9999";
                  return da.localeCompare(db);
                });
                const blocks = selected.map((day, i) => ({
                  id: uid(),
                  title: `Estudar ${state.collections.subjects.find((s) => s.id === ordered[i % ordered.length])?.title}`,
                  subject: ordered[i % ordered.length],
                  day,
                  time,
                  duration,
                }));
                setState((s) => ({
                  ...s,
                  collections: {
                    ...s.collections,
                    plan: [...s.collections.plan, ...blocks],
                  },
                }));
                toast("Blocos adicionados ao seu plano.");
                setGenerate(false);
              }}
            >
              <p className="muted">
                Uma distribuição simples por regras, priorizando as provas mais
                próximas. Os blocos existentes serão mantidos.
              </p>
              <fieldset>
                <legend>Matérias</legend>
                {state.collections.subjects.map((s) => (
                  <label className="checkbox-label" key={s.id}>
                    <input
                      type="checkbox"
                      name="subjects"
                      value={s.id}
                      defaultChecked
                    />
                    {s.title}
                  </label>
                ))}
              </fieldset>
              <fieldset>
                <legend>Dias disponíveis</legend>
                <div className="checkbox-grid">
                  {days.map((day, i) => (
                    <label className="checkbox-label" key={day}>
                      <input
                        name="days"
                        value={day}
                        type="checkbox"
                        defaultChecked={i < 5}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="form-grid">
                <label>
                  Horário inicial
                  <input
                    name="time"
                    type="time"
                    defaultValue="18:00"
                    required
                  />
                </label>
                <label>
                  Minutos por dia
                  <input
                    name="duration"
                    type="number"
                    min="5"
                    max="480"
                    defaultValue="45"
                    required
                  />
                </label>
              </div>
              <button className="button primary full" type="submit">
                Adicionar blocos ao plano
              </button>
            </form>
          )}
        </Modal>
      )}
    </>
  );
}
