import Link from "next/link";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import MenuCard from "@/components/MenuCard";
import { CATEGORIES, MENU_ITEMS, getFeaturedItems, type MenuItem } from "@/lib/menu";
import { SITE, whatsappLink } from "@/lib/site";

// Les 3 plats du slider, choisis par nom (modifier cette liste pour changer les slides).
const HERO_NAMES = ["Poisson barracuda spécial Topluxe", "Super Spécial", "Mojito"];

export default function HomePage() {
  const featured = getFeaturedItems();
  const heroItems = HERO_NAMES.map((name) => MENU_ITEMS.find((i) => i.name === name)).filter(
    (i): i is MenuItem => Boolean(i)
  );

  return (
    <>
      <h1 className="sr-only">Top Luxe, restaurant, lounge bar et terrasse à Lomé</h1>
      <HeroSlider items={heroItems} />

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-accent" aria-hidden />
            <div>
              <p className="text-sm font-semibold">Horaires</p>
              <p className="text-sm text-muted">{SITE.hours}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-accent" aria-hidden />
            <div>
              <p className="text-sm font-semibold">Adresse</p>
              <Link href="/contact" className="text-sm text-muted hover:text-accent">
                Voir le plan d&apos;accès
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-accent" aria-hidden />
            <div>
              <p className="text-sm font-semibold">Réservations</p>
              <a href={SITE.phones[0].href} className="text-sm text-muted hover:text-accent">
                {SITE.phones[0].label}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Nos incontournables</h2>
            <p className="mt-2 text-muted">Une sélection de ce que nos clients commandent le plus.</p>
          </div>
          <Link href="/menu" className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
            Tout le menu
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <MenuCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">Parcourir par catégorie</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/menu?category=${c.id}`}
                className="rounded-full border border-line px-4 py-2 text-sm transition hover:border-brand hover:text-accent"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-line bg-surface p-8 sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Un événement à organiser ?</h2>
          <p className="mt-3 max-w-xl text-muted">
            Anniversaire, soirée privée ou repas d&apos;équipe : écrivez-nous pour réserver la terrasse et préparer votre événement.
          </p>
          <a
            href={whatsappLink(`Bonjour ${SITE.name}, je souhaite réserver pour un événement.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 font-semibold text-black transition hover:bg-brand-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Réserver sur WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
