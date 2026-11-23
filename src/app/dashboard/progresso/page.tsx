import type { Metadata } from "next";
import { ProgressPage } from "@/components/learning";
export const metadata: Metadata = {
  title: "Meu progresso",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <ProgressPage />;
}
