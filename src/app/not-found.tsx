import Link from "next/link";
export default function NotFound() {
  return (
    <section className="empty" style={{ minHeight: "65vh" }}>
      <p className="eyebrow">404 · UM DESVIO NO CAMINHO</p>
      <h1>Essa página não está por aqui.</h1>
      <p>Mas seu próximo passo ainda está esperando.</p>
      <Link href="/" className="button primary">
        Voltar ao início
      </Link>
    </section>
  );
}
