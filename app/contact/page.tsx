import type { Metadata } from "next";
import { Clock, ExternalLink, Globe, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Horaires, téléphones, WhatsApp et plan d'accès de Top Luxe à Lomé.",
};

const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${SITE.maps.lat},${SITE.maps.lng}`;

const card = "rounded-2xl border border-line bg-surface p-5";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Une commande, une réservation ou un événement à préparer ? Écrivez-nous sur WhatsApp ou appelez-nous.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className={card}>
            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="font-semibold">Horaires</h2>
                <p className="mt-1 text-sm text-muted">{SITE.hours}</p>
              </div>
            </div>
          </div>

          <div className={card}>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="font-semibold">Téléphone</h2>
                <ul className="mt-1 space-y-1 text-sm">
                  {SITE.phones.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} className="text-muted transition hover:text-accent">
                        {p.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href={whatsappLink(`Bonjour ${SITE.name}, j'aimerais avoir des informations.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-black transition hover:bg-brand-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Écrire sur WhatsApp
            </a>
          </div>

          <div className={card}>
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="font-semibold">Adresse</h2>
                <p className="mt-1 text-sm text-muted">{SITE.maps.name}, Lomé, Togo</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <a
                    href={DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                  >
                    <Navigation className="h-4 w-4" aria-hidden />
                    Itinéraire
                  </a>
                  <a
                    href={SITE.maps.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={card}>
            <div className="flex items-start gap-4">
              <Globe className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <div>
                <h2 className="font-semibold">En ligne</h2>
                <ul className="mt-1 space-y-1 text-sm text-muted">
                  {SITE.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-accent">
                        {s.label} : {s.handle}
                      </a>
                    </li>
                  ))}
                  <li>{SITE.website}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[360px] overflow-hidden rounded-2xl border border-line bg-surface lg:min-h-full">
          <iframe
            src={SITE.maps.embed}
            title="Plan d'accès Top Luxe"
            className="h-full min-h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
