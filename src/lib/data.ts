import {emptySocial,type Social} from "./social";
import { emptyRewards, type Rewards } from "./rewards";
import { emptyQuiz, type QuizState } from "./quiz";
export type Item = {
  id: string;
  title: string;
  subject?: string;
  description?: string;
  date?: string;
  time?: string;
  priority?: string;
  completed?: boolean;
  completedAt?: string;
  color?: string;
  teacher?: string;
  goal?: number;
  grade?: number;
  weight?: number;
  minimum?: number;
  duration?: number;
  day?: string;
  deck?: string;
  answer?: string;
  difficulty?: string;
  reviews?: number;
  reviewedAt?: string;
  createdAt?: string;
};
export type Collection =
  | "subjects"
  | "tasks"
  | "exams"
  | "notes"
  | "decks"
  | "cards"
  | "plan"
  | "sessions"
  | "grades"
  | "results";
export type Profile = {
  name: string;
  email: string;
  course: string;
  dailyGoal: number;
};
export type State = {
  version: 1;
  rewards: Rewards;
  social: Social;
  plan: "free" | "plus";
  quiz: QuizState;
  loggedIn: boolean;
  profile: Profile | null;
  collections: Record<Collection, Item[]>;
  preferences: { dark: boolean; reducedMotion: boolean; reminders: boolean };
  timer: {
    mode: string;
    duration: number;
    remaining: number;
    endAt: number | null;
    subject: string;
    cycle: number;
    sessionId: string | null;
  };
};
export const collectionKeys: Collection[] = [
  "subjects",
  "tasks",
  "exams",
  "notes",
  "decks",
  "cards",
  "plan",
  "sessions",
  "grades",
  "results",
];
export const dateKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const datePlus = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return dateKey(d);
};
export const uid = () => crypto.randomUUID();
export const emptyState = (): State => ({
  version: 1,
  rewards: emptyRewards(),
  social: emptySocial(),
  plan: "free",
  quiz: emptyQuiz(),
  loggedIn: false,
  profile: null,
  collections: {
    subjects: [],
    tasks: [],
    exams: [],
    notes: [],
    decks: [],
    cards: [],
    plan: [],
    sessions: [],
    grades: [],
    results: [],
  },
  preferences: { dark: false, reducedMotion: false, reminders: true },
  timer: {
    mode: "Foco",
    duration: 1500,
    remaining: 1500,
    endAt: null,
    subject: "",
    cycle: 0,
    sessionId: null,
  },
});
export function demoState(): State {
  const s = emptyState();
  s.loggedIn = true;
  s.profile = {
    name: "Alex",
    email: "alex@exemplo.com",
    course: "Análise e Desenvolvimento de Sistemas",
    dailyGoal: 90,
  };
  s.collections.subjects = [
    {
      id: "math",
      title: "Matemática Discreta",
      color: "#7C5CFC",
      description: "Lógica, conjuntos e grafos",
      teacher: "Profa. Mariana",
      goal: 180,
    },
    {
      id: "web",
      title: "Programação Web",
      color: "#25866F",
      description: "Interfaces que fazem a diferença",
      teacher: "Prof. Ricardo",
      goal: 240,
    },
    {
      id: "data",
      title: "Estrutura de Dados",
      color: "#CB7630",
      description: "Organizar para resolver",
      teacher: "Prof. Lucas",
      goal: 120,
    },
    {
      id: "eng",
      title: "Inglês",
      color: "#4878C8",
      description: "Um pouco a cada dia",
      goal: 90,
    },
  ];
  s.collections.tasks = [
    {
      id: "t1",
      title: "Resolver a lista de lógica proposicional",
      subject: "math",
      date: dateKey(),
      priority: "Alta",
      description: "Exercícios 1 a 8, capítulo 3.",
    },
    {
      id: "t2",
      title: "Finalizar o layout responsivo",
      subject: "web",
      date: dateKey(),
      priority: "Média",
    },
    {
      id: "t3",
      title: "Revisar árvores binárias",
      subject: "data",
      date: datePlus(1),
      priority: "Média",
    },
    {
      id: "t4",
      title: "Praticar leitura por 20 minutos",
      subject: "eng",
      date: dateKey(),
      priority: "Baixa",
      completed: true,
      completedAt: new Date().toISOString(),
    },
  ];
  s.collections.exams = [
    {
      id: "e1",
      title: "Avaliação de lógica e conjuntos",
      subject: "math",
      date: datePlus(4),
      time: "19:00",
      minimum: 7,
      description: "Lógica proposicional, conjuntos e relações binárias.",
    },
    {
      id: "e2",
      title: "Entrega do projeto web",
      subject: "web",
      date: datePlus(8),
      time: "20:00",
      minimum: 7,
      description: "HTML semântico, CSS e responsividade.",
    },
  ];
  s.collections.sessions = [0, 1, 2, 3, 4, 6].map((n) => ({
    id: "session" + n,
    title: "Sessão de foco",
    date: datePlus(-n),
    subject: n % 2 ? "math" : "web",
    duration: 25 + n * 5,
    createdAt: new Date().toISOString(),
  }));
  s.collections.decks = [
    {
      id: "d1",
      title: "Fundamentos de lógica",
      subject: "math",
      description: "Conceitos para a próxima prova",
    },
    {
      id: "d2",
      title: "Inglês no dia a dia",
      subject: "eng",
      description: "Vocabulário essencial",
    },
  ];
  s.collections.cards = [
    {
      id: "c1",
      deck: "d1",
      title: "O que é uma proposição?",
      answer:
        "Uma sentença declarativa que pode ser classificada como verdadeira ou falsa.",
      reviews: 0,
    },
    {
      id: "c2",
      deck: "d1",
      title: "Quando a conjunção p ∧ q é verdadeira?",
      answer: "Somente quando p e q são ambas verdadeiras.",
      reviews: 0,
    },
    {
      id: "c3",
      deck: "d1",
      title: "O que representa a negação ¬p?",
      answer: "Inverte o valor lógico da proposição p.",
      reviews: 0,
    },
    {
      id: "c4",
      deck: "d2",
      title: "O que significa “deadline”?",
      answer: "Prazo final para concluir uma atividade.",
      reviews: 0,
    },
  ];
  s.collections.notes = [
    {
      id: "n1",
      title: "Relações binárias",
      subject: "math",
      description:
        "Uma relação de A em B é um subconjunto do produto cartesiano A × B.\n\nPropriedades importantes:\n• Reflexiva\n• Simétrica\n• Transitiva",
      createdAt: new Date().toISOString(),
    },
  ];
  s.collections.plan = [
    {
      id: "p1",
      title: "Revisão de lógica",
      subject: "math",
      day: "Segunda",
      time: "18:00",
      duration: 45,
    },
    {
      id: "p2",
      title: "Prática de componentes",
      subject: "web",
      day: "Terça",
      time: "19:00",
      duration: 60,
    },
    {
      id: "p3",
      title: "Exercícios de árvores",
      subject: "data",
      day: "Quarta",
      time: "18:00",
      duration: 45,
    },
  ];
  s.collections.grades = [
    {
      id: "g1",
      title: "Primeira avaliação",
      subject: "math",
      grade: 7.5,
      weight: 2,
    },
    {
      id: "g2",
      title: "Trabalho em grupo",
      subject: "math",
      grade: 8.5,
      weight: 1,
    },
  ];
  return s;
}
export const toolsList = [
  {
    slug: "calculadora-media",
    title: "Calculadora de média",
    short: "Sua média, sem complicação.",
    icon: "calculator",
    color: "purple",
  },
  {
    slug: "quanto-preciso-tirar",
    title: "Quanto preciso tirar?",
    short: "Transforme a próxima nota em uma meta.",
    icon: "target",
    color: "orange",
  },
  {
    slug: "pomodoro",
    title: "Pomodoro",
    short: "Um tempo para focar. Outro para respirar.",
    icon: "timer",
    color: "green",
  },
  {
    slug: "contador-de-dias",
    title: "Contador de dias",
    short: "Saiba quanto tempo falta para o grande dia.",
    icon: "calendar",
    color: "blue",
  },
  {
    slug: "calculadora-porcentagem",
    title: "Porcentagem",
    short: "Porcentagens, aumentos e descontos.",
    icon: "percent",
    color: "pink",
  },
  {
    slug: "regra-de-tres",
    title: "Regra de três",
    short: "Encontre o valor que está faltando.",
    icon: "math",
    color: "purple",
  },
  {
    slug: "conversores",
    title: "Conversor de unidades",
    short: "Comprimento, massa e tempo.",
    icon: "repeat",
    color: "green",
  },
];
export const days = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];
export const formatDate = (value?: string) =>
  value
    ? new Date(value + "T12:00:00").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })
    : "Sem data";
export const minutesLabel = (m: number) =>
  m >= 60
    ? `${Math.floor(m / 60)}h ${Math.round(m % 60)}min`
    : `${Math.round(m)}min`;
