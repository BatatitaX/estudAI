import type { Metadata } from "next";
import { ToolPage } from "@/components/tools";
export const metadata: Metadata = {
  title: "Calculadora de porcentagem",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
};
export default function Page() {
  return <ToolPage slug="calculadora-porcentagem" />;
}
