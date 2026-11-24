import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">Erreur 404</p>
      <h1 className="mt-3 text-3xl font-bold">Page introuvable</h1>
      <p className="mt-3 text-muted">Ce plat ou cette page n&apos;existe pas ou n&apos;est plus à la carte.</p>
      <Link
        href="/menu"
        className="mt-8 inline-flex rounded-lg bg-brand px-5 py-3 font-semibold text-black transition hover:bg-brand-dark"
      >
        Retour au menu
      </Link>
    </div>
  );
}
