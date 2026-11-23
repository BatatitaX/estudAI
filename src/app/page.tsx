import type { Metadata } from "next";
import { Home } from "@/components/public-pages";
export const metadata: Metadata = {
  title: "Seu espaço para estudar melhor",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
};
export default function Page() {
  return <Home />;
}
