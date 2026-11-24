import Link from "next/link";
import FoodImage from "@/components/FoodImage";
import { TAG_LABELS, formatPrice, getCategory, type MenuItem } from "@/lib/menu";

function cardPrice(item: MenuItem): string {
  const varies = item.variants?.length || item.priceMax || item.priceFrom;
  return varies ? `À partir de ${formatPrice(item.price)}` : formatPrice(item.price);
}

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <Link
      href={`/menu/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:border-brand"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-line">
        <FoodImage
          src={item.image}
          alt={item.name}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          {getCategory(item.category).label}
        </span>
        <h3 className="font-semibold leading-snug">{item.name}</h3>
        <p className="line-clamp-2 text-sm text-muted">{item.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-semibold">{cardPrice(item)}</span>
          <span className="flex flex-wrap justify-end gap-1">
            {item.tags.slice(0, 2).map((t) => (
              <span key={t} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">
                {TAG_LABELS[t]}
              </span>
            ))}
          </span>
        </div>
      </div>
    </Link>
  );
}
