import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import FoodImage from "@/components/FoodImage";
import MenuCard from "@/components/MenuCard";
import OrderPanel from "@/components/OrderPanel";
import ShareButtons from "@/components/ShareButtons";
import {
  EXTRA_SIDES,
  MENU_ITEMS,
  PIZZA_SUPPLEMENT,
  TAG_LABELS,
  formatPrice,
  getCategory,
  getItemBySlug,
  getRelatedItems,
} from "@/lib/menu";
import { Suspense } from "react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MENU_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return {};
  return { title: item.name, description: item.description };
}

export default async function MealPage({ params }: Props) {
    return <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10 text-center text-muted">Chargement...</div>}>
      <MealContent params={params} />
    </Suspense>
}



async function MealContent ({params}: Props) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();

  const category = getCategory(item.category);
  const related = getRelatedItems(item);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href={`/menu?category=${item.category}`}
        className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Retour : {category.label}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-line bg-surface">
          <FoodImage
            src={item.image}
            alt={item.name}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">{category.label}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{item.name}</h1>

          {item.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {TAG_LABELS[t]}
                </span>
              ))}
            </div>
          )}

          <p className="mt-6 leading-relaxed text-muted">{item.description}</p>

          {item.ingredients && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold">Composition</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {item.ingredients.map((ing) => (
                  <li key={ing} className="rounded-lg bg-surface px-3 py-1 text-sm border border-line">
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.includes && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold">Inclus</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {item.includes.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <OrderPanel item={item} />
          </div>

          {item.category === "plats" && (
            <p className="mt-4 text-sm text-muted">
              Accompagnement supplémentaire à {formatPrice(EXTRA_SIDES.price)} : {EXTRA_SIDES.items.join(", ").toLowerCase()}.
            </p>
          )}
          {item.category === "pizzas" && (
            <p className="mt-4 text-sm text-muted">
              Supplément possible : {formatPrice(PIZZA_SUPPLEMENT.min)} ou {formatPrice(PIZZA_SUPPLEMENT.max)}.
            </p>
          )}
          {item.tags.includes("avec-alcool") && (
            <p className="mt-4 text-sm text-muted">L&apos;abus d&apos;alcool est dangereux pour la santé. À consommer avec modération.</p>
          )}

          <div className="mt-6">
            <ShareButtons title={`${item.name} | Top Luxe`} text={`Découvrez ${item.name} chez Top Luxe.`} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Dans la même catégorie</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <MenuCard key={r.slug} item={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
