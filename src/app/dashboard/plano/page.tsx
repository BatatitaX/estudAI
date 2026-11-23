import type { Metadata } from "next";
import { Plan } from "@/components/study";
export const metadata: Metadata = {
  title: "Plano de estudos",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <Plan />;
}
