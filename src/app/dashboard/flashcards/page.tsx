import type { Metadata } from "next";
import { Flashcards } from "@/components/learning";
export const metadata: Metadata = {
  title: "Meus flashcards",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <Flashcards />;
}
