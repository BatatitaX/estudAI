import type { Metadata } from "next";
import { CollectionPage } from "@/components/study";
export const metadata: Metadata = {
  title: "Minhas anotações",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <CollectionPage collection="notes" />;
}
