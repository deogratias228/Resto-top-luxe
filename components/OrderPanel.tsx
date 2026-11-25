"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { formatPrice, getPriceLabel, type MenuItem } from "@/lib/menu";
import { SITE, whatsappLink } from "@/lib/site";

function choice(active: boolean) {
  return `rounded-lg border px-3 py-2 text-sm transition ${
    active
      ? "border-brand bg-brand font-semibold text-black"
      : "border-line bg-surface hover:border-brand hover:text-accent"
  }`;
}

export default function OrderPanel({ item }: { item: MenuItem }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [option, setOption] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const variant = item.variants?.[variantIndex];
  // Prix unitaire connu ? (pas de fourchette ni de "à partir de")
  const unit = variant ? variant.amount : item.priceMax || item.priceFrom ? null : item.price;
  const total = unit === null ? null : unit * qty;

  const line =
    `${qty} x ${item.name}` + (variant ? ` (${variant.label})` : "") + (option ? ` - ${option}` : "");
  const message = [
    `Bonjour ${SITE.name}, je souhaite commander :`,
    line,
    total !== null ? `Total : ${formatPrice(total)}` : "Prix à confirmer",
  ].join("\n");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-3xl font-bold">{variant ? formatPrice(variant.amount) : getPriceLabel(item)}</p>
        {item.priceNote && <p className="mt-1 text-sm text-muted">{item.priceNote}</p>}
      </div>

      {item.variants && (
        <div>
          <p className="mb-2 text-sm font-semibold">Format</p>
          <div className="flex flex-wrap gap-2">
            {item.variants.map((v, i) => (
              <button
                key={v.label}
                type="button"
                aria-pressed={i === variantIndex}
                className={choice(i === variantIndex)}
                onClick={() => setVariantIndex(i)}
              >
                {v.label} : {formatPrice(v.amount)}
              </button>
            ))}
          </div>
        </div>
      )}

      {item.options && (
        <div>
          <p className="mb-2 text-sm font-semibold">Au choix</p>
          <div className="flex flex-wrap gap-2">
            {item.options.map((o) => (
              <button
                key={o}
                type="button"
                aria-pressed={option === o}
                className={choice(option === o)}
                onClick={() => setOption(option === o ? null : o)}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center rounded-lg border border-line bg-surface">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="p-3 hover:text-accent disabled:opacity-40"
            aria-label="Diminuer la quantité"
            disabled={qty <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-semibold" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="p-3 hover:text-accent"
            aria-label="Augmenter la quantité"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-muted">
          {total !== null ? (
            <>
              Total : <span className="font-semibold text-foreground">{formatPrice(total)}</span>
            </>
          ) : (
            "Prix à confirmer à la commande"
          )}
        </p>
      </div>

      <a
        href={whatsappLink(message)}
        onClick={(e) => {
          // L'adresse du site n'est connue que dans le navigateur : on ajoute le lien du plat au moment du clic.
          const link = window.location.origin + window.location.pathname;
          e.currentTarget.href = whatsappLink(`${message}\nLien : ${link}`);
        }}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 font-semibold text-black transition hover:bg-brand-dark sm:w-auto"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        Commander sur WhatsApp
      </a>
    </div>
  );
}
