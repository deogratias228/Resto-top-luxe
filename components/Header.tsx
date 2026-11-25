"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE, whatsappLink } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/contact", label: "Contact" },
];

const ORDER_LINK = whatsappLink(`Bonjour ${SITE.name}, je souhaite passer une commande.`);

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Top <span className="text-accent">Luxe</span>
          {/* <img src="/images/logo/image.png" alt="Top Luxe" className="ml-2 h-12 w-auto" /> */}
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Navigation principale">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition hover:text-accent ${
                isActive(l.href) ? "text-accent" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <a
            href={ORDER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-black transition hover:bg-brand-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Commander
          </a>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-background md:hidden" aria-label="Navigation mobile">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-base font-medium ${isActive(l.href) ? "text-accent" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={ORDER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="my-3 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-black"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Commander sur WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
