import type { Metadata } from "next";
import { Account } from "@/components/account";
export const metadata: Metadata = {
  title: "Meu perfil",
  description:
    "Estudaí: ferramentas gratuitas e organização para seus estudos.",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <Account />;
}
