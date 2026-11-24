"use client";

import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold">
            Top <span className="text-accent">Luxe</span>
          </p>
          <p className="mt-3 text-sm text-muted">{SITE.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">Navigation</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-accent">Accueil</Link></li>
            <li><Link href="/menu" className="hover:text-accent">Menu</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Nous trouver</p>
          <ul className="mt-3 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              {SITE.hours}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <a href={SITE.maps.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Voir sur Google Maps
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span className="flex flex-col">
                {SITE.phones.map((p) => (
                  <a key={p.href} href={p.href} className="hover:text-accent">{p.label}</a>
                ))}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Réseaux</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {s.label} : {s.handle}
                </a>
              </li>
            ))}
            <li>{SITE.website}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        {"© "}{currentYear}{" Top Luxe. Tous droits réservés."}
      </div>
    </footer>
  );
}
