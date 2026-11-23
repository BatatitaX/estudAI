const dateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  topic: string;
};
export type Attempt = {
  id: string;
  createdAt: string;
  week: string;
  title: string;
  difficulty: string;
  example: boolean;
  questions: Question[];
  answers: number[];
  finished: boolean;
};
export type QuizState = {
  attempts: Attempt[];
  preference: "adaptativa" | "básica" | "intermediária" | "avançada";
};
export const emptyQuiz = (): QuizState => ({
  attempts: [],
  preference: "adaptativa",
});
export function weekKey(date = new Date()) {
  const monday = new Date(date);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return dateKey(monday);
}
export function quizStats(attempts: Attempt[]) {
  const completed = attempts.filter((a) => a.finished);
  const recent = completed.slice(-5);
  const total = recent.reduce((n, a) => n + a.questions.length, 0);
  const correct = recent.reduce(
    (n, a) =>
      n + a.questions.filter((q, i) => q.correctIndex === a.answers[i]).length,
    0,
  );
  const weak = new Map<string, number>();
  for (const a of recent)
    for (const [i, q] of a.questions.entries())
      if (q.correctIndex !== a.answers[i])
        weak.set(q.topic, (weak.get(q.topic) || 0) + 1);
  return {
    completed: completed.length,
    accuracy: total ? correct / total : null,
    weakTopics: [...weak]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([t]) => t),
    difficulty: !total
      ? "básica"
      : correct / total >= 0.8
        ? "avançada"
        : correct / total >= 0.5
          ? "intermediária"
          : "básica",
  };
}
export const exampleContent =
  "Fotossíntese: as plantas utilizam luz, água e dióxido de carbono para produzir glicose e liberar oxigênio. Esse processo ocorre nos cloroplastos. A clorofila é o pigmento que absorve a luz. A glicose fornece energia e matéria para o crescimento da planta.";
export const exampleQuestions: Question[] = [
  {
    id: "ex1",
    question: "Qual pigmento absorve a luz na fotossíntese?",
    options: ["Hemoglobina", "Clorofila", "Melanina", "Queratina"],
    correctIndex: 1,
    explanation:
      "A clorofila absorve a energia luminosa utilizada no processo.",
    topic: "Pigmentos",
  },
  {
    id: "ex2",
    question: "Em qual estrutura celular ocorre a fotossíntese?",
    options: ["Núcleo", "Ribossomo", "Cloroplasto", "Lisossomo"],
    correctIndex: 2,
    explanation:
      "O texto identifica os cloroplastos como as estruturas onde ocorre a fotossíntese.",
    topic: "Estruturas celulares",
  },
  {
    id: "ex3",
    question: "Quais recursos são utilizados na fotossíntese, segundo o texto?",
    options: [
      "Luz, água e dióxido de carbono",
      "Glicose e oxigênio",
      "Somente água",
      "Proteínas e sais",
    ],
    correctIndex: 0,
    explanation:
      "A energia da luz, a água e o dióxido de carbono participam da produção de glicose.",
    topic: "Reagentes",
  },
  {
    id: "ex4",
    question: "Qual gás é liberado nesse processo?",
    options: ["Nitrogênio", "Hidrogênio", "Metano", "Oxigênio"],
    correctIndex: 3,
    explanation: "O oxigênio é liberado durante a fotossíntese.",
    topic: "Produtos",
  },
  {
    id: "ex5",
    question: "Qual é uma função da glicose produzida?",
    options: [
      "Bloquear a luz",
      "Fornecer energia e matéria para o crescimento",
      "Eliminar a clorofila",
      "Impedir o crescimento",
    ],
    correctIndex: 1,
    explanation:
      "A glicose fornece energia e matéria que contribuem para o crescimento da planta.",
    topic: "Energia",
  },
];
export async function generateQuiz(
  content: string,
  plus: boolean,
  difficulty: string,
  statistics: ReturnType<typeof quizStats>,
): Promise<Question[]> {
  const endpoint = process.env.NEXT_PUBLIC_QUIZ_API_URL;
  if (!endpoint)
    throw new Error(
      "A criação de quizzes está indisponível no momento. Você pode experimentar o quiz de exemplo.",
    );
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      content,
      difficulty: plus ? difficulty : "básica",
      questionCount: 5,
      ...(plus ? { preferences: { difficulty }, statistics } : {}),
    }),
    signal: AbortSignal.timeout(45000),
  });
  if (!response.ok)
    throw new Error(
      response.status === 429
        ? "Você atingiu o limite de tentativas. Consulte quando poderá tentar novamente."
        : "Não foi possível criar seu quiz. Tente novamente em instantes.",
    );
  const data = await response.json();
  if (
    !Array.isArray(data.questions) ||
    data.questions.length !== 5 ||
    !data.questions.every(
      (q: Question) =>
        typeof q.question === "string" &&
        q.question.trim() &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        q.options.every((o) => typeof o === "string" && o.trim()) &&
        new Set(q.options).size === 4 &&
        Number.isInteger(q.correctIndex) &&
        q.correctIndex >= 0 &&
        q.correctIndex < 4 &&
        typeof q.topic === "string" &&
        (!plus || typeof q.explanation === "string"),
    )
  )
    throw new Error("Não foi possível preparar as perguntas. Tente novamente.");
  return data.questions.map((q: Question, i: number) => ({
    id: String(i),
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    topic: q.topic,
    ...(plus ? { explanation: q.explanation } : {}),
  }));
}
export function validQuiz(value: unknown): value is QuizState {
  if (!value || typeof value !== "object") return false;
  const q = value as QuizState;
  return (
    ["adaptativa", "básica", "intermediária", "avançada"].includes(
      q.preference,
    ) &&
    Array.isArray(q.attempts) &&
    q.attempts.every(
      (a) =>
        typeof a.id === "string" &&
        typeof a.title === "string" &&
        typeof a.week === "string" &&
        typeof a.createdAt === "string" &&
        Number.isFinite(Date.parse(a.createdAt)) &&
        typeof a.finished === "boolean" &&
        typeof a.example === "boolean" &&
        typeof a.difficulty === "string" &&
        Array.isArray(a.questions) &&
        a.questions.length === 5 &&
        a.questions.every(
          (q) =>
            typeof q.id === "string" &&
            typeof q.question === "string" &&
            typeof q.topic === "string" &&
            Array.isArray(q.options) &&
            q.options.length === 4 &&
            q.options.every((o) => typeof o === "string") &&
            Number.isInteger(q.correctIndex) &&
            q.correctIndex >= 0 &&
            q.correctIndex < 4 &&
            (q.explanation === undefined || typeof q.explanation === "string"),
        ) &&
        Array.isArray(a.answers) &&
        a.answers.length === 5 &&
        a.answers.every((v) => Number.isInteger(v) && v >= -1 && v < 4),
    )
  );
}
