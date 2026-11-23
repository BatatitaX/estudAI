"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="empty">
      <h1>Ops, precisamos de mais uma tentativa.</h1>
      <p>Não foi possível abrir esta página agora.</p>
      <button className="button primary" onClick={reset}>
        Tentar novamente
      </button>
    </section>
  );
}
