import type { Metadata } from "next";
import { InfoPage } from "@/components/public-pages";
export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
};
export default function Page() {
  return <InfoPage kind="privacidade" />;
}
