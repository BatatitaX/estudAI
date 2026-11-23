import type { Metadata } from "next";
import { Dashboard } from "@/components/study";
export const metadata: Metadata = {
  title: "Visão geral",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <Dashboard />;
}
