// Utilitaires côté serveur uniquement (génération des métadonnées). Ne pas importer dans un composant client.
import fs from "node:fs";
import path from "node:path";
import type { MenuItem } from "@/lib/menu";

/** URL publique du site, utilisée pour rendre absolues les images d'aperçu. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

const exists = (publicPath: string) => fs.existsSync(path.join(process.cwd(), "public", publicPath));

/** Image par défaut du site (public/images/og-default.jpg), si elle existe. */
export function getDefaultOgImage(): string | undefined {
  return exists("/images/og-default.jpg") ? "/images/og-default.jpg" : undefined;
}

/** Photo du plat si elle existe dans public, sinon l'image par défaut, sinon rien. */
export function getOgImage(item: MenuItem): string | undefined {
  return exists(item.image) ? item.image : getDefaultOgImage();
}
