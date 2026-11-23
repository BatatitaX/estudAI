import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/provider";
import { Shell } from "@/components/shell";
export const metadata: Metadata = {
  title: {
    default: "Estudaí — Seu espaço para estudar melhor",
    template: "%s | Estudaí",
  },
  description:
    "Ferramentas gratuitas para calcular médias, focar com Pomodoro e organizar matérias, tarefas e provas.",
  applicationName: "Estudaí",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        {/* The app owns both themes. Keep this static and before page content
            so Dark Reader does not mutate SVG attributes before hydration. */}
        <meta name="darkreader-lock" content="" />
      </head>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Provider>
          <Shell>{children}</Shell>
        </Provider>
      </body>
    </html>
  );
}
