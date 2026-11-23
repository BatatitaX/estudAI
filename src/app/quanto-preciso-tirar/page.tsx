import type { Metadata } from "next";
import { ToolPage } from "@/components/tools";
export const metadata: Metadata = {
  title: "Quanto preciso tirar?",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
};
export default function Page() {
  return <ToolPage slug="quanto-preciso-tirar" />;
}
