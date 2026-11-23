"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useStore } from "./provider";
import { Brand, Icon } from "./ui";
import { dateKey } from "@/lib/data";
import { ProfileAvatar } from "./profile-customization";
import { AdSlot } from "./ad-slot";
const nav = [
  ["dashboard", "Visão geral", "dashboard"],
  ["dashboard/materias", "Matérias", "book"],
  ["dashboard/tarefas", "Tarefas", "tasks"],
  ["dashboard/provas", "Provas", "target"],
  ["dashboard/calendario", "Calendário", "calendar"],
  ["dashboard/plano", "Plano de estudos", "plan"],
  ["dashboard/flashcards", "Flashcards", "cards"],
  ["dashboard/anotacoes", "Anotações", "notes"],
];
export function Shell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { state, ready, setState } = useStore();
  const [open, setOpen] = useState(false);
  const dashboard = path.startsWith("/dashboard");
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (dashboard && ready && (!state.profile || !state.loggedIn))
      router.replace("/login");
  }, [dashboard, ready, state.profile, state.loggedIn, router]);
  if (dashboard) {
    if (!ready || !state.profile || !state.loggedIn)
      return (
        <main className="loading" aria-live="polite">
          Preparando seu espaço de estudos…
        </main>
      );
    const showAds = !path.startsWith("/dashboard/ferramentas") && !["/dashboard/amigos", "/dashboard/perfil", "/dashboard/configuracoes", "/dashboard/ia", "/dashboard/flashcards"].includes(path);
    const pending = state.collections.tasks.filter((t) => !t.completed).length;
    const reminders = state.preferences.reminders
      ? state.collections.tasks.filter(
          (t) => !t.completed && t.date && t.date <= dateKey(),
        ).length
      : 0;
    return (
      <div className="app-shell">
        <button
          className={`sidebar-overlay ${open ? "visible" : ""}`}
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
          tabIndex={open ? 0 : -1}
        />
        <aside className={`sidebar ${open ? "open" : ""}`}>
          <div className="sidebar-fixed">
            <Link href="/" aria-label="Estudaí, início" className="sidebar-brand">
              <Brand />
            </Link>
            <Link
              href="/dashboard/perfil"
              className="workspace-tag"
              aria-label={`Meu perfil: ${state.profile.name}`}
              aria-current={path === "/dashboard/perfil" ? "page" : undefined}
            >
              <ProfileAvatar look={state.rewards.look} name={state.profile.name} small />
              <div className="workspace-profile">
                <strong title={state.profile.name}>{state.profile.name}</strong>
                <span>Meu perfil</span>
              </div>
              <Icon name="right" size={16} />
            </Link>
          </div>
          <div className="sidebar-scroll" tabIndex={0} role="region" aria-label="Navegação de estudos">
            <p className="nav-label">MEUS ESTUDOS</p>
            <nav aria-label="Menu principal">
              {nav.map(([href, title, icon]) => (
                <Link
                  key={href}
                  href={"/" + href}
                  className={path === "/" + href ? "active" : ""}
                  aria-current={path === "/" + href ? "page" : undefined}
                >
                  <Icon name={icon} />
                  {title}
                  {href === "dashboard/plano" && state.plan !== "plus" && (
                    <Icon name="lock" size={14} />
                  )}
                  {icon === "tasks" && pending > 0 && (
                    <span className="nav-count">{pending}</span>
                  )}
                </Link>
              ))}
            </nav>
            <p className="nav-label">CONTINUE EVOLUINDO</p>
            <nav aria-label="Recursos">
              <Link
                href="/dashboard/progresso"
                className={path === "/dashboard/progresso" ? "active" : ""}
              >
                <Icon name="trend" />
                Meu progresso
              </Link>
              <Link href="/dashboard/amigos" className={path === "/dashboard/amigos" ? "active" : ""}><Icon name="users"/>Amigos</Link>
              <Link href="/dashboard/ferramentas" className={path.startsWith("/dashboard/ferramentas") ? "active" : ""}>
                <Icon name="calculator" />
                Ferramentas
              </Link>
              <Link
                href="/dashboard/ia"
                className={path === "/dashboard/ia" ? "active" : ""}
              >
                <Icon name="sparkles" />
                Quiz com IA<span className="soon-small">Quiz</span>
              </Link>
            </nav>
            <div className="sidebar-bottom">
              <Link href="/estudai-plus" className="plus-card">
                <Icon name="sparkles" />
                <strong>Seu próximo nível</strong>
                <span>Conheça o futuro Estudaí+</span>
                <Icon name="arrow" size={16} />
              </Link>
              <Link href="/dashboard/configuracoes" className="settings-link">
                <Icon name="settings" />
                Configurações
              </Link>

            </div>
          </div>
        </aside>
        <div className="app-main">
          <header className="app-header">
            <div className="row">
              <button
                className="icon-button mobile-only"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label="Abrir menu"
              >
                <Icon name="menu" />
              </button>
              <span className="breadcrumb">
                Meu espaço <span>/</span>{" "}
                <strong>
                  {(path.startsWith("/dashboard/ferramentas") ? "Ferramentas" : null) || nav.find((n) => path === "/" + n[0])?.[1] ||
                    {
                      progresso: "Meu progresso",
                      configuracoes: "Configurações",
                      perfil: "Meu perfil",
                      amigos: "Amigos",
                      ia: "Quiz com IA",
                    }[path.split("/").pop() || ""] ||
                    "Estudaí"}
                </strong>
              </span>
            </div>
            <div className="row header-actions">
              <span className="header-date">
                {new Date().toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                })}
              </span>
              <button
                className="icon-button"
                aria-label={
                  state.preferences.dark
                    ? "Ativar modo claro"
                    : "Ativar modo escuro"
                }
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    preferences: {
                      ...s.preferences,
                      dark: !s.preferences.dark,
                    },
                  }))
                }
              >
                <Icon name={state.preferences.dark ? "sun" : "moon"} />
              </button>
              <Link
                className="icon-button notification"
                href="/dashboard/tarefas"
                aria-label={`${reminders} tarefas para hoje ou atrasadas`}
              >
                <Icon name="bell" />
                {reminders > 0 && <span />}
              </Link>
              <Link
                href="/dashboard/configuracoes"
                className="icon-button"
                aria-label="Configurações"
              >
                <Icon name="settings" />
              </Link>
            </div>
          </header>
          <main id="conteudo" className="dashboard-content">
            {showAds && <AdSlot placement="dashboard-top" />}
            {children}
            {showAds && <AdSlot placement="dashboard-bottom" />}
          </main>
          <footer className="app-footer">
            Feito para o seu ritmo. <span>Estudaí · Seu espaço de estudos</span>
          </footer>
        </div>
      </div>
    );
  }
  return (
    <>
      <header className="public-header">
        <Link href="/" aria-label="Estudaí, início">
          <Brand />
        </Link>
        <nav aria-label="Navegação principal">
          <button
            className="icon-button"
            aria-label={
              state.preferences.dark
                ? "Ativar modo claro"
                : "Ativar modo escuro"
            }
            onClick={() =>
              setState((s) => ({
                ...s,
                preferences: { ...s.preferences, dark: !s.preferences.dark },
              }))
            }
          >
            <Icon name={state.preferences.dark ? "sun" : "moon"} />
          </button>
          <Link
            href="/ferramentas"
            className={path.includes("ferramentas") ? "selected" : ""}
          >
            Ferramentas
          </Link>
          <Link href="/estudai-plus" className="desktop-link">
            Estudaí+
          </Link>
          {state.profile ? (
            <Link href="/dashboard" className="button primary">
              Meu espaço <Icon name="arrow" size={17} />
            </Link>
          ) : (
            <>
              <Link href="/login" className="login-link">
                Entrar
              </Link>
              <Link href="/cadastro" className="button primary">
                Começar grátis <Icon name="arrow" size={17} />
              </Link>
            </>
          )}
        </nav>
      </header>
      <main id="conteudo">
        {children}
        {path !== "/" && path !== "/ferramentas" && !["/perfil-publico", "/login", "/cadastro", "/recuperar-senha", "/privacidade", "/termos", "/ajuda", "/estudai-plus", "/pomodoro", "/ferramentas/pomodoro"].includes(path) && <AdSlot placement="tool-bottom" wide />}
      </main>
      <footer className="public-footer">
        <div>
          <Link href="/">
            <Brand />
          </Link>
          <p>
            Estudar, organizar e evoluir.
            <br />
            No seu tempo, do seu jeito.
          </p>
        </div>
        <div>
          <strong>Para estudar</strong>
          <Link href="/ferramentas">Todas as ferramentas</Link>
          <Link href="/pomodoro">Pomodoro</Link>
          <Link href="/dashboard">Meu espaço</Link>
        </div>
        <div>
          <strong>Estudaí</strong>
          <Link href="/ajuda">Precisa de ajuda?</Link>
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos de uso</Link>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Estudaí{" "}
          <span>Um pouco de foco. Um mundo de possibilidades.</span>
        </div>
      </footer>
    </>
  );
}
