import type { Metadata } from "next";
import { ToolPage } from "@/components/tools";
export const metadata: Metadata = {
  title: "Contador de dias",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
};
export default function Page() {
  return <ToolPage slug="contador-de-dias" />;
}
