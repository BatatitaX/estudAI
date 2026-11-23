import type { Metadata } from "next";
import { ToolsIndex } from "@/components/public-pages";
export const metadata: Metadata = {
  title: "Ferramentas gratuitas",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
};
export default function Page() {
  return <ToolsIndex />;
}
