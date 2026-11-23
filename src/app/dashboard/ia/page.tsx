import type { Metadata } from "next";
import { AIPage } from "@/components/learning";
export const metadata: Metadata = {
  title: "Quiz com IA",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <AIPage />;
}
