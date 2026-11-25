import Link from "next/link";
import FoodImage from "@/components/FoodImage";
import { TAG_LABELS, getCategory, getShortPriceLabel, type MenuItem } from "@/lib/menu";

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
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          <div className="font-semibold text-right">{getShortPriceLabel(item)}</div>
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
