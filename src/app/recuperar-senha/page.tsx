import type { Metadata } from "next";
import { Auth } from "@/components/public-pages";
export const metadata: Metadata = {
  title: "Recuperar acesso",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <Auth recover />;
}
