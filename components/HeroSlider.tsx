"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import FoodImage from "@/components/FoodImage";
import { getShortPriceLabel, type MenuItem } from "@/lib/menu";

const INTERVAL_MS = 6000;

export default function HeroSlider({ items }: { items: MenuItem[] }) {
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false); // survol ou focus clavier
  const [playing, setPlaying] = useState(true); // bouton pause
  const touchStartX = useRef<number | null>(null);

  const go = (i: number) => setIndex(((i % count) + count) % count);

  // Défilement automatique : arrêté au survol, en pause, ou si l'utilisateur réduit les animations.
  // "index" est dans les dépendances : le minuteur repart de zéro après une navigation manuelle.
  useEffect(() => {
    if (!playing || hovered || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(id);
  }, [playing, hovered, count, index]);

  if (count === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Plats à la une"
      className="mx-auto max-w-6xl px-4 pt-6 sm:pt-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-surface"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live={playing && !hovered ? "off" : "polite"}
        >
          {items.map((item, i) => {
            const active = i === index;
            return (
              <div
                key={item.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} sur ${count}`}
                aria-hidden={!active}
                className="relative min-w-full"
              >
                <div className="relative h-[440px] sm:h-[500px]">
                  <FoodImage
                    src={item.image}
                    alt={item.name}
                    sizes="(min-width: 1152px) 1152px, 100vw"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-xl px-6 pb-10 text-white sm:px-14">
                      <p className="text-sm font-medium uppercase tracking-widest text-brand">
                        Bienvenue chez Top Luxe
                      </p>
                      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                        {item.name}
                      </h2>
                      <p className="mt-4 line-clamp-3 text-base text-white/80 sm:text-lg">{item.description}</p>
                      <p className="mt-5 text-xl font-semibold">{getShortPriceLabel(item)}</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href={`/menu/${item.slug}`}
                          tabIndex={active ? 0 : -1}
                          className="rounded-lg bg-brand px-5 py-3 font-semibold text-black transition hover:bg-brand-dark"
                        >
                          Voir le plat
                        </Link>
                        <Link
                          href="/menu"
                          tabIndex={active ? 0 : -1}
                          className="rounded-lg border border-white/40 px-5 py-3 font-semibold text-white transition hover:border-brand hover:text-brand"
                        >
                          Tout le menu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 sm:block"
              aria-label="Diapositive précédente"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 sm:block"
              aria-label="Diapositive suivante"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-5 left-6 flex items-center gap-3 sm:left-14">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                aria-label={playing ? "Mettre le défilement en pause" : "Reprendre le défilement"}
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <div className="flex items-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Aller à la diapositive ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-brand" : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
