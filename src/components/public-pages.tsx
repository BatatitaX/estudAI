"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "./provider";
import { Icon, Badge, Heading } from "./ui";
import { toolsList } from "@/lib/data";
import { AdSlot } from "./ad-slot";
export function ToolCards({ limit }: { limit?: number }) {
  return (
    <div className="tool-grid">
      {toolsList.slice(0, limit).map((t) => (
        <Link href={"/" + t.slug} className="tool-card" key={t.slug}>
          <span className={`icon-tile ${t.color}`}>
            <Icon name={t.icon} size={25} />
          </span>
          <h3>{t.title}</h3>
          <p>{t.short}</p>
          <span className="tool-link">
            Usar ferramenta <Icon name="arrow" size={17} />
          </span>
        </Link>
      ))}
    </div>
  );
}
export function Home() {
  const { demo, state, setState } = useStore();
  const router = useRouter();
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Badge>
            <Icon name="sparkles" size={15} /> SEU NOVO JEITO DE ESTUDAR
          </Badge>
          <h1>
            Menos caos.
            <br />
            Mais <span>conquistas.</span>
          </h1>
          <p>
            Suas notas, seus planos e aquele foco que faltava. Tudo em um só
            lugar, para estudar no seu ritmo.
          </p>
          <div className="row wrap">
            <Link href="/cadastro" className="button primary large">
              Criar meu espaço <Icon name="arrow" />
            </Link>
            <Link href="/ferramentas" className="button secondary large">
              Explorar ferramentas
            </Link>
          </div>
          <p className="hero-note">
            <Icon name="check" size={16} /> Ferramentas gratuitas <span>·</span>{" "}
            Sem cartão de crédito
          </p>
        </div>
        <div
          className="hero-preview"
          aria-label="Prévia ilustrativa do painel de estudos"
        >
          <div className="preview-top">
            <span className="preview-dots">● ● ●</span>
            <span>meu espaço / visão geral</span>
            <Icon name="sparkles" size={16} />
          </div>
          <div className="preview-body">
            <div className="row between">
              <div>
                <p className="eyebrow">UM BOM DIA PARA APRENDER</p>
                <h2>Bora fazer acontecer?</h2>
              </div>
              <span className="icon-tile yellow">
                <Icon name="sun" size={28} />
              </span>
            </div>
            <div className="preview-stats">
              <div>
                <Icon name="flame" />
                <b>7 dias</b>
                <span>de constância</span>
              </div>
              <div>
                <Icon name="clock" />
                <b>4h 30min</b>
                <span>de aprendizado</span>
              </div>
            </div>
            <div className="preview-task">
              <span className="check-circle">
                <Icon name="check" size={15} />
              </span>
              <div>
                <strong>Revisar o conteúdo da prova</strong>
                <small>Matemática · Hoje</small>
              </div>
              <Badge color="green">Concluído</Badge>
            </div>
            <div className="preview-focus">
              <Icon name="timer" size={27} />
              <div>
                <strong>Seu momento de foco</strong>
                <small>Um passo mais perto da sua meta.</small>
              </div>
              <b>25:00</b>
            </div>
            <div className="preview-bottom">
              <span>Seu progresso importa. Celebre cada passo.</span>
              <Icon name="trophy" size={18} />
            </div>
          </div>
          <div className="floating-badge">
            <span className="icon-tile yellow">
              <Icon name="zap" />
            </span>
            <div>
              <strong>Pequenos passos, grandes resultados.</strong>
              <small>Comece com o que você tem hoje.</small>
            </div>
          </div>
        </div>
      </section>
      <section className="public-section">
        <Heading
          eyebrow="DESCOMPLIQUE SEUS ESTUDOS"
          title="O que você precisa hoje?"
          description="Escolha uma ferramenta e comece. Não precisa de cadastro."
          action={
            <Link href="/ferramentas" className="text-link">
              Ver todas <Icon name="arrow" size={17} />
            </Link>
          }
        />
        <ToolCards limit={4} />
      </section>
      <AdSlot placement="home-middle" wide />
      <section className="benefit-section">
        <div>
          <p className="eyebrow">TUDO CONECTADO, TUDO SEU</p>
          <h2>
            Abra espaço para
            <br />o que você quer aprender.
          </h2>
          <p>
            Troque as abas espalhadas por um lugar que acompanha você, da
            primeira revisão à última prova.
          </p>
          <button
            className="button primary"
            onClick={() => {
              if (!state.profile) demo();
              else setState((s) => ({ ...s, loggedIn: true }));
              router.push("/dashboard");
            }}
          >
            Explorar demonstração <Icon name="arrow" size={17} />
          </button>
          <small className="muted block">
            A demonstração carrega um perfil com dados de exemplo.
          </small>
        </div>
        <div className="benefit-list">
          {[
            [
              "plan",
              "Um plano que cabe na sua rotina",
              "Organize matérias, tarefas e provas sem perder de vista o seu tempo.",
            ],
            [
              "timer",
              "Foco em um passo de cada vez",
              "Alterne estudo e descanso com um Pomodoro feito para seu ritmo.",
            ],
            [
              "trend",
              "Veja o quanto você já evoluiu",
              "Acompanhe seu tempo de estudo e transforme constância em conquistas.",
            ],
          ].map(([icon, title, desc], i) => (
            <article key={title}>
              <span className={`icon-tile ${["purple", "green", "orange"][i]}`}>
                <Icon name={icon} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <AdSlot placement="home-bottom" wide />
      <section className="cta-band">
        <div>
          <Badge color="yellow">SEU PRÓXIMO CAPÍTULO</Badge>
          <h2>
            Você cuida dos sonhos.
            <br />A gente ajuda com os estudos.
          </h2>
        </div>
        <Link href="/cadastro" className="button white large">
          Vamos começar? <Icon name="arrow" />
        </Link>
      </section>
    </>
  );
}
export function ToolsIndex({ embedded = false }: { embedded?: boolean }) {
  const [query, setQuery] = useState("");
  return (
    <section className="public-section tools-index">
      <Heading
        eyebrow="SIMPLES, ÚTEIS E GRATUITAS"
        title="Um atalho para estudar melhor."
        description="Menos contas na cabeça. Mais tempo para aprender."
      />
      <label className="search-box">
        <Icon name="search" />
        <input
          aria-label="Buscar ferramenta"
          placeholder="O que você precisa resolver?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="tool-grid">
        {toolsList
          .filter((t) =>
            (t.title + t.short).toLowerCase().includes(query.toLowerCase()),
          )
          .map((t) => (
            <Link href={(embedded ? "/dashboard/ferramentas/" : "/") + t.slug} className="tool-card" key={t.slug}>
              <span className={`icon-tile ${t.color}`}>
                <Icon name={t.icon} />
              </span>
              <h3>{t.title}</h3>
              <p>{t.short}</p>
              <span className="tool-link">
                Abrir ferramenta <Icon name="arrow" size={16} />
              </span>
            </Link>
          ))}
      </div>
      <AdSlot placement="tools-directory" />
      {!toolsList.some((t) =>
        (t.title + t.short).toLowerCase().includes(query.toLowerCase()),
      ) && (
        <p className="empty">
          Nenhuma ferramenta encontrada. Tente “média” ou “foco”.
        </p>
      )}
    </section>
  );
}
export function Auth({
  signup = false,
  recover = false,
}: {
  signup?: boolean;
  recover?: boolean;
}) {
  const { state, setState, demo, toast } = useStore();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  return (
    <section className="auth-layout">
      <div className="auth-story">
        <Badge color="yellow">SEU ESPAÇO DE POSSIBILIDADES</Badge>
        <h1>
          O próximo passo
          <br />
          começa <span>com você.</span>
        </h1>
        <p>
          Organize o que precisa fazer.
          <br />
          Encontre o seu ritmo.
          <br />
          Celebre o que já conquistou.
        </p>
        <div className="auth-quote">
          <Icon name="sparkles" size={30} />
          <h3>Não precisa dar conta de tudo hoje.</h3>
          <p>Só precisa começar.</p>
        </div>
      </div>
      <div className="auth-form">
        <Link href="/" className="text-link">
          <Icon name="back" size={16} /> Voltar ao início
        </Link>
        <h2>
          {recover
            ? "Recuperar acesso"
            : signup
              ? "Vamos criar seu espaço?"
              : "Que bom ter você aqui."}
        </h2>
        <p className="muted">
          {recover
            ? "Veja como voltar ao seu espaço."
            : signup
              ? "Um novo jeito de cuidar dos seus estudos."
              : "Seus estudos estão esperando por você."}
        </p>
        <div className="notice">
          <Icon name="info" />
          <span>
            Você está experimentando o Estudaí. Use informações fictícias nesta
            versão de apresentação.
          </span>
        </div>
        {done ? (
          <div className="result-box">
            <Icon name="check" />
            <h3>Você pode voltar ao seu espaço</h3>
            <p>
              A recuperação por e-mail ainda não está disponível. Você pode
              continuar no espaço salvo neste navegador pela tela de entrada.
            </p>
            <Link href="/login" className="button primary">
              Voltar para entrar
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError("");
              const f = new FormData(e.currentTarget);
              const email = String(f.get("email")).trim().toLowerCase();
              if (recover) {
                setDone(true);
                return;
              }
              if (signup) {
                if (f.get("password") !== f.get("confirmPassword")) {
                  setError(
                    "As senhas não são iguais. Confira e tente novamente.",
                  );
                  return;
                }
                if (state.profile && state.profile.email !== email) {
                  setError(
                    "Já existe um espaço neste navegador. Entre nele ou exporte e apague os dados nas configurações antes de criar outro.",
                  );
                  return;
                }
                setState((s) => ({
                  ...s,
                  loggedIn: true,
                  profile: {
                    name: String(f.get("name")).trim(),
                    email,
                    course: "",
                    dailyGoal: 60,
                  },
                }));
              } else {
                if (!state.profile || state.profile.email !== email) {
                  setError(
                    "Não encontramos esse perfil neste navegador. Crie seu espaço ou explore a demonstração.",
                  );
                  return;
                }
                setState((s) => ({ ...s, loggedIn: true }));
              }
              toast(signup ? "Seu espaço está pronto!" : "Bom te ver de novo!");
              router.push("/dashboard");
            }}
          >
            {signup && (
              <label>
                Seu nome
                <input
                  name="name"
                  placeholder="Como podemos chamar você?"
                  required
                  minLength={2}
                  maxLength={60}
                />
              </label>
            )}
            <label>
              E-mail
              <input
                name="email"
                type="email"
                placeholder="voce@exemplo.com"
                required
                defaultValue={!signup ? state.profile?.email : ""}
              />
            </label>
            {!recover && (
              <label>
                Senha
                <div className="password-field">
                  <input
                    name="password"
                    type={show ? "text" : "password"}
                    autoComplete={signup ? "new-password" : "current-password"}
                    placeholder="Pelo menos 6 caracteres"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                    onClick={() => setShow(!show)}
                  >
                    <Icon name="eye" size={18} />
                  </button>
                </div>
              </label>
            )}
            {signup && (
              <label>
                Confirmar senha
                <div className="password-field">
                  <input
                    name="confirmPassword"
                    type={show ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Digite a senha novamente"
                    minLength={6}
                    required
                  />
                </div>
              </label>
            )}
            {!signup && !recover && (
              <Link href="/recuperar-senha" className="text-link align-right">
                Esqueci minha senha
              </Link>
            )}
            {signup && (
              <label className="checkbox-label">
                <input type="checkbox" required />{" "}
                <span>
                  Li os <Link href="/termos">termos de uso</Link> e a{" "}
                  <Link href="/privacidade">política de privacidade</Link>.
                </span>
              </label>
            )}
            {error && (
              <p role="alert" className="error-text">
                {error}
              </p>
            )}
            <button className="button primary full" type="submit">
              {recover
                ? "Ver instruções"
                : signup
                  ? "Criar meu espaço"
                  : "Entrar no meu espaço"}
              <Icon name="arrow" size={18} />
            </button>
          </form>
        )}
        {!recover && (
          <>
            <div className="divider">
              <span>ou conheça antes de começar</span>
            </div>
            <button
              className="button secondary full"
              onClick={() => {
                if (state.profile) {
                  setState((s) => ({ ...s, loggedIn: true }));
                  router.push("/dashboard");
                  return;
                }
                demo();
                router.push("/dashboard");
              }}
            >
              {state.profile
                ? "Continuar no espaço salvo"
                : "Explorar demonstração"}
            </button>
            <p className="auth-switch">
              {signup ? "Já tem um espaço?" : "Primeira vez aqui?"}{" "}
              <Link href={signup ? "/login" : "/cadastro"}>
                {signup ? "Entrar" : "Criar meu espaço"}
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
export function Plus() {
  const { state, setState, toast } = useStore();
  const router = useRouter();
  return (
    <section className="plus-page public-section">
      <Badge>
        <Icon name="sparkles" size={16} /> ESTUDAÍ+
      </Badge>
      <h1>
        Mais possibilidades.
        <br />O mesmo <span>seu ritmo.</span>
      </h1>
      <p className="lead muted">
        Escolha o espaço que combina com seus objetivos.
        <br />
        Comece grátis ou conheça as possibilidades do Estudaí+.
      </p>
      <div className="pricing-grid">
        <article className="card">
          <Badge color="green">PARA COMEÇAR</Badge>
          <h2>Seu espaço</h2>
          <div className="price">Grátis</div>
          <p>O essencial para começar e continuar.</p>
          {[
            "Todas as calculadoras e Pomodoro",
            "Matérias, tarefas e provas",
            "Flashcards para revisar no seu ritmo",
            "3 quizzes por semana com seu conteúdo",
            "Resultado do quiz sem explicações",
            "Progresso salvo neste navegador",
          ].map((x) => (
            <p className="row" key={x}>
              <Icon name="check" />
              {x}
            </p>
          ))}
          <Link href="/cadastro" className="button secondary full">
            Começar agora
          </Link>
        </article>
        <article className="card highlighted">
          <Badge>PARA IR ALÉM</Badge>
          <h2>Estudaí+</h2>
          <div className="price">
            R$ 9,90<small>/mês</small>
          </div>
          <p>Preço de referência, sujeito a validação.</p>
          {[
            "Tudo do plano gratuito",
            "Aplicativo sem anúncios",
            "Fontes para seu nome e aparência dos estudos compartilhados",
            "Plano de estudos personalizado",
            "Quizzes com IA sem limite de tentativas",
            "Explicações para aprender com cada resposta",
            "Dificuldade ajustada ao seu desempenho",
            "Evolução baseada nas suas preferências e estatísticas",
            "Capa por imagem e título escrito por você",
            "Borda, capa e título exclusivos que ficam para sempre",
          ].map((x) => (
            <p className="row" key={x}>
              <Icon name="sparkles" />
              {x}
            </p>
          ))}
          <div className="notice">
            Experimente os recursos do Estudaí+ sem cobrança. A assinatura ainda
            não está disponível.
          </div>
          <button
            className="button primary full"
            onClick={() => {
              if (!state.profile) {
                router.push("/cadastro");
                return;
              }
              setState((s) => ({ ...s, plan: "plus" }));
              toast(
                "Você está experimentando o Estudaí+. Nenhuma cobrança foi feita.",
              );
              router.push("/dashboard/ia");
            }}
          >
            Experimentar Estudaí+
          </button>
        </article>
      </div>
    </section>
  );
}
export function InfoPage({ kind }: { kind: string }) {
  const content: Record<
    string,
    { title: string; sections: [string, string][] }
  > = {
    ajuda: {
      title: "Como podemos ajudar?",
      sections: [
        [
          "Como começo?",
          "As ferramentas são abertas. Para organizar seus estudos, crie seu espaço ou explore o exemplo pela tela de entrada.",
        ],
        [
          "Onde ficam meus dados?",
          "Neste navegador, no próprio aparelho. Eles não são enviados a um servidor. Limpar os dados do navegador também apaga seu espaço. Exporte um backup nas configurações.",
        ],
        [
          "Como funciona o Pomodoro?",
          "Escolha sua matéria, ajuste os minutos e inicie. Você pode pausar e navegar pelo app. Uma sessão de foco concluída é registrada no seu progresso se houver um perfil.",
        ],
        [
          "O login é real?",
          "Ainda não. Esta é uma versão de apresentação: a senha não é guardada nem verificada e não protege seus dados. Use informações fictícias.",
        ],
        [
          "A IA já funciona?",
          "Na área Quiz com IA, envie seu conteúdo para estudar com perguntas. Enquanto a geração não estiver disponível, você pode experimentar o exemplo. O plano gratuito permite três tentativas por semana; o Estudaí+ inclui tentativas ilimitadas e explicações.",
        ],
      ],
    },
    privacidade: {
      title: "Privacidade",
      sections: [
        [
          "Sobre esta versão",
          "Esta política descreve a versão de apresentação do Estudaí. As condições serão atualizadas antes do lançamento.",
        ],
        [
          "Dados locais",
          "Nome, e-mail, preferências e registros de estudo ficam salvos neste navegador. Use informações fictícias. Não há envio de senhas ou análise de visitas. Os espaços de publicidade são apenas reservados: não carregam anúncios reais nem enviam dados a anunciantes nesta versão.",
        ],
        [
          "Controle dos dados",
          "Você pode exportar seus dados em um arquivo ou apagar seu espaço em Configurações. O backup contém as informações do seu perfil e estudos. Guarde-o em local seguro.",
        ],
        [
          "Armazenamento e acesso",
          "Quem usa o mesmo navegador pode acessar o perfil. Esta demonstração não é adequada para dados sensíveis. O navegador pode remover os registros; mantenha backups.",
        ],
      ],
    },
    termos: {
      title: "Termos de uso",
      sections: [
        [
          "Sobre esta versão",
          "Esta versão permite experimentar a interface e as ferramentas do Estudaí. Ainda não oferece contas protegidas por senha, pagamentos ou acesso aos mesmos dados em aparelhos diferentes.",
        ],
        [
          "Uso das ferramentas",
          "Os cálculos são auxiliares. Confira a escala de notas, pesos e critérios definidos pela sua instituição. A indicação de média não substitui o resultado oficial.",
        ],
        [
          "Conteúdo e continuidade",
          "Você é responsável pelo conteúdo inserido. Não inclua dados sensíveis. Exporte seu progresso para evitar perdas ao limpar ou trocar o navegador.",
        ],
        [
          "Recursos futuros",
          "Você pode conhecer o Estudaí+ sem cobrança. Os quizzes feitos com seu conteúdo dependem da disponibilidade do serviço. A assinatura ainda não está à venda.",
        ],
      ],
    },
  };
  const page = content[kind] || content.ajuda;
  return (
    <section className="reading-page">
      <Heading eyebrow="ESTUDAÍ" title={page.title} />
      {page.sections.map(([title, text]) => (
        <section className="card" key={title}>
          <h2>{title}</h2>
          <p>{text}</p>
        </section>
      ))}
      <Link className="button secondary" href="/">
        Voltar ao início
      </Link>
    </section>
  );
}
