"use client";

import { useState } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";

type Props = { title: string; text: string };

const btn =
  "inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm transition hover:border-brand hover:text-accent";

export default function ShareButtons({ title, text }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // presse-papiers indisponible
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.href });
      } catch {
        // partage annulé par l'utilisateur
      }
      return;
    }
    await copyLink();
  }

  function shareOnWhatsapp() {
    const message = `${text} ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Partager ce plat">
      <button type="button" onClick={share} className={btn}>
        <Share2 className="h-4 w-4" aria-hidden />
        Partager
      </button>
      <button type="button" onClick={shareOnWhatsapp} className={btn}>
        <MessageCircle className="h-4 w-4" aria-hidden />
        WhatsApp
      </button>
      <button type="button" onClick={copyLink} className={btn} aria-live="polite">
        {copied ? <Check className="h-4 w-4 text-accent" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
        {copied ? "Lien copié" : "Copier le lien"}
      </button>
    </div>
  );
}
