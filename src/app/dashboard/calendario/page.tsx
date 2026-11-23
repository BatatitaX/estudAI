import type { Metadata } from "next";
import { Calendar } from "@/components/study";
export const metadata: Metadata = {
  title: "Meu calendário",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <Calendar />;
}
