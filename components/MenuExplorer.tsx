"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
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
  return `rounded-full border px-4 py-2 text-sm transition ${
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
  const [open, setOpen] = useState(false);

  // Les filtres (hors recherche) vivent dans l'URL : liens partageables, retour arrière naturel.
  const group = GROUPS.find((g) => g.id === searchParams.get("group"))?.id;
  const category = CATEGORIES.find((c) => c.id === searchParams.get("category"))?.id;
  const price = PRICE_RANGES.find((p) => p.id === searchParams.get("price"))?.id;
  const tags = (searchParams.get("tags") ?? "")
    .split(",")
    .filter((t): t is Tag => t in TAG_LABELS);

  // Panneau de filtres : fermeture avec Échap, et page figée derrière.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

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

  function resetFilters() {
    router.replace(pathname, { scroll: false });
  }

  function resetAll() {
    setQuery("");
    resetFilters();
  }

  const activeCount = (group ? 1 : 0) + (category ? 1 : 0) + (price ? 1 : 0) + tags.length;
  const hasFilters = Boolean(query.trim() || activeCount);
  const results = filterMenu({ query, group, category, tags, priceRange: price });
  const visibleCategories = CATEGORIES.filter((c) => !group || c.group === group);

  // Filtres actifs, affichés sous la barre de recherche et retirables un par un.
  const activeChips: { key: string; label: string; remove: () => void }[] = [];
  if (group) {
    activeChips.push({
      key: "group",
      label: GROUPS.find((g) => g.id === group)?.label ?? group,
      remove: () => update({ group: null, category: null }),
    });
  }
  if (category) {
    activeChips.push({
      key: "category",
      label: CATEGORIES.find((c) => c.id === category)?.label ?? category,
      remove: () => update({ category: null }),
    });
  }
  for (const t of tags) {
    activeChips.push({ key: `tag-${t}`, label: TAG_LABELS[t], remove: () => toggleTag(t) });
  }
  if (price) {
    activeChips.push({
      key: "price",
      label: PRICE_RANGES.find((p) => p.id === price)?.label ?? price,
      remove: () => update({ price: null }),
    });
  }

  return (
    <div className="mt-8">
      <div className="flex gap-3">
        <div className="relative flex-1">
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

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-surface px-4 transition hover:border-brand hover:text-accent"
          aria-label={activeCount ? `Filtres, ${activeCount} actif${activeCount > 1 ? "s" : ""}` : "Filtres"}
          aria-haspopup="dialog"
        >
          <SlidersHorizontal className="h-5 w-5" aria-hidden />
          <span className="hidden sm:inline">Filtres</span>
          {activeCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-black">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {activeChips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeChips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={c.remove}
              className="inline-flex items-center gap-1 rounded-full border border-brand/60 bg-surface py-1 pl-3 pr-2 text-sm transition hover:border-brand"
              aria-label={`Retirer le filtre ${c.label}`}
            >
              {c.label}
              <X className="h-4 w-4 text-muted" aria-hidden />
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          {hasFilters ? `${results.length} résultat${results.length > 1 ? "s" : ""}` : `${MENU_ITEMS.length} propositions`}
        </p>
        {hasFilters && (
          <button type="button" onClick={resetAll} className="text-sm font-medium text-accent hover:underline">
            Tout réinitialiser
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

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filtres du menu">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl border border-line bg-background sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-96 sm:rounded-none sm:rounded-l-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <SlidersHorizontal className="h-5 w-5 text-accent" aria-hidden />
                Filtres
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-surface"
                aria-label="Fermer les filtres"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto px-5 py-6">
              <div>
                <p className="mb-3 text-sm font-semibold">Famille</p>
                <div className="flex flex-wrap gap-2">
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
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold">Catégorie</p>
                <div className="flex flex-wrap gap-2">
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
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold">Régime et type</p>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={tags.includes(t)}
                      className={chip(tags.includes(t))}
                      onClick={() => toggleTag(t)}
                    >
                      {TAG_LABELS[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold">Prix</p>
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

            <div className="flex items-center gap-3 border-t border-line px-5 py-4">
              <button
                type="button"
                onClick={resetFilters}
                disabled={activeCount === 0}
                className="rounded-lg border border-line px-4 py-3 text-sm font-medium transition hover:border-brand disabled:opacity-40"
              >
                Réinitialiser
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-black transition hover:bg-brand-dark"
              >
                {`Voir ${results.length} résultat${results.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
