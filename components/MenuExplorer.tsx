"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import {
  CATEGORIES,
  GROUPS,
  MENU_ITEMS,
  PRICE_RANGES,
  TAG_LABELS,
  filterMenu,
  type Tag,
} from "@/lib/menu";

const TAGS = Object.keys(TAG_LABELS) as Tag[];

function chip(active: boolean) {
  return `shrink-0 rounded-full border px-4 py-2 text-sm transition ${
    active
      ? "border-brand bg-brand font-semibold text-black"
      : "border-line bg-surface hover:border-brand hover:text-accent"
  }`;
}

export default function MenuExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  // Les filtres (hors recherche) vivent dans l'URL : liens partageables, retour arrière naturel.
  const group = GROUPS.find((g) => g.id === searchParams.get("group"))?.id;
  const category = CATEGORIES.find((c) => c.id === searchParams.get("category"))?.id;
  const price = PRICE_RANGES.find((p) => p.id === searchParams.get("price"))?.id;
  const tags = (searchParams.get("tags") ?? "")
    .split(",")
    .filter((t): t is Tag => t in TAG_LABELS);

  function update(patch: Record<string, string | null | Tag[]>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (Array.isArray(value)) {
        if (value.length) next.set(key, value.join(","));
        else next.delete(key);
      } else if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function toggleTag(tag: Tag) {
    update({ tags: tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag] });
  }

  function reset() {
    setQuery("");
    router.replace(pathname, { scroll: false });
  }

  const hasFilters = Boolean(query.trim() || group || category || price || tags.length);
  const results = filterMenu({ query, group, category, tags, priceRange: price });
  const visibleCategories = CATEGORIES.filter((c) => !group || c.group === group);

  return (
    <div className="mt-8">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un plat, une boisson, un ingrédient"
          aria-label="Rechercher dans le menu"
          className="w-full rounded-xl border border-line bg-surface py-3 pl-12 pr-12 outline-none transition placeholder:text-muted focus:border-brand"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-foreground"
            aria-label="Effacer la recherche"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Familles">
        <button type="button" className={chip(!group)} onClick={() => update({ group: null, category: null })}>
          Tout
        </button>
        {GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            className={chip(group === g.id)}
            onClick={() => update({ group: g.id, category: null })}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Catégories">
        {visibleCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={chip(category === c.id)}
            onClick={() => update({ category: category === c.id ? null : c.id })}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 border-y border-line py-5 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold">Régime et type</p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <button key={t} type="button" aria-pressed={tags.includes(t)} className={chip(tags.includes(t))} onClick={() => toggleTag(t)}>
                {TAG_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Prix</p>
          <div className="flex flex-wrap gap-2">
            {PRICE_RANGES.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={price === p.id}
                className={chip(price === p.id)}
                onClick={() => update({ price: price === p.id ? null : p.id })}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          {hasFilters ? `${results.length} résultat${results.length > 1 ? "s" : ""}` : `${MENU_ITEMS.length} propositions`}
        </p>
        {hasFilters && (
          <button type="button" onClick={reset} className="text-sm font-medium text-accent hover:underline">
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {hasFilters ? (
        results.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((item) => (
              <MenuCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-line p-10 text-center">
            <p className="font-semibold">Aucun résultat</p>
            <p className="mt-1 text-sm text-muted">Essayez d&apos;enlever un filtre ou de modifier votre recherche.</p>
          </div>
        )
      ) : (
        <div className="mt-6 space-y-14">
          {CATEGORIES.map((c) => {
            const items = MENU_ITEMS.filter((i) => i.category === c.id);
            return (
              <section key={c.id} id={c.id} className="scroll-mt-24">
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <h2 className="text-xl font-bold sm:text-2xl">{c.label}</h2>
                  <span className="text-sm text-muted">{items.length}</span>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((item) => (
                    <MenuCard key={item.slug} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
