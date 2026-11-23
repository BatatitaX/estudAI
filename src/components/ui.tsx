"use client";
import { useEffect, useRef, type ReactNode } from "react";
import {
  Users,
  Leaf,
  Star,
  Orbit,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Calculator,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  Menu,
  Moon,
  MoreHorizontal,
  NotebookPen,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Target,
  Timer,
  Trash2,
  TrendingUp,
  Trophy,
  X,
  Zap,
  Layers,
  Bell,
  LogOut,
  Percent,
  Pencil,
  Repeat2,
  Equal,
  Download,
  Sun,
  LockKeyhole,
  Eye,
  CircleHelp,
  Mail,
  User,
  CheckCircle2,
  CalendarRange,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
export const icons: Record<string, LucideIcon> = {
  users: Users,
  leaf: Leaf,
  star: Star,
  planet: Orbit,
  arrow: ArrowRight,
  back: ArrowLeft,
  book: BookOpen,
  calculator: Calculator,
  calendar: CalendarDays,
  check: Check,
  checks: CheckCheck,
  left: ChevronLeft,
  right: ChevronRight,
  clock: Clock3,
  flame: Flame,
  logo: GraduationCap,
  dashboard: LayoutDashboard,
  tasks: ListTodo,
  menu: Menu,
  moon: Moon,
  more: MoreHorizontal,
  notes: NotebookPen,
  pause: Pause,
  play: Play,
  plus: Plus,
  reset: RotateCcw,
  search: Search,
  settings: Settings,
  sparkles: Sparkles,
  target: Target,
  timer: Timer,
  trash: Trash2,
  trend: TrendingUp,
  trophy: Trophy,
  close: X,
  zap: Zap,
  cards: Layers,
  bell: Bell,
  logout: LogOut,
  percent: Percent,
  edit: Pencil,
  repeat: Repeat2,
  math: Equal,
  download: Download,
  sun: Sun,
  lock: LockKeyhole,
  eye: Eye,
  help: CircleHelp,
  mail: Mail,
  user: User,
  success: CheckCircle2,
  plan: CalendarRange,
  wand: WandSparkles,
};
export function Icon({
  name,
  size = 20,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Component = icons[name] || BookOpen;
  return (
    <Component size={size} strokeWidth={1.8} aria-hidden="true" {...props} />
  );
}
export function Brand() {
  return (
    <span className="brand">
      <span className="brand-icon">
        <Icon name="logo" size={25} />
      </span>
      estud<span>aí</span>
      <span className="brand-dot">.</span>
    </span>
  );
}
export function Badge({
  children,
  color = "purple",
}: {
  children: ReactNode;
  color?: string;
}) {
  return <span className={`badge ${color}`}>{children}</span>;
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-head">
        <h2 id="modal-title">{title}</h2>
        <button className="icon-button" aria-label="Fechar" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Empty({
  title = "Um novo começo",
  text = "Adicione seu primeiro item para começar.",
  action,
}: {
  title?: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty">
      <span className="icon-tile purple">
        <Icon name="book" size={28} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
export function Heading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.min(100, Math.round(value))}
    >
      <span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
