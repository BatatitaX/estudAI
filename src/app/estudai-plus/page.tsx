import type { Metadata } from "next";
import { Plus } from "@/components/public-pages";
export const metadata: Metadata = {
  title: "Estudaí+",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
};
export default function Page() {
  return <Plus />;
}
