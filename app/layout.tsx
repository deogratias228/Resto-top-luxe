import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDefaultOgImage, getSiteUrl } from "@/lib/og";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const defaultImage = getDefaultOgImage();
const defaultTitle = "Top Luxe | Restaurant, lounge bar et terrasse à Lomé";
const defaultDescription =
  "Top Luxe à Lomé : plats, pizzas, sandwichs, cocktails, chichas et événements. Ouvert 7j/7 de 7h à l'aube.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: defaultTitle,
    template: "%s | Top Luxe",
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    siteName: "Top Luxe",
    locale: "fr_FR",
    title: defaultTitle,
    description: defaultDescription,
    images: defaultImage ? [{ url: defaultImage }] : undefined,
  },
};

// Applique le thème enregistré avant l'affichage pour éviter un flash.
// Sans choix enregistré, le thème sombre est utilisé (mettre false pour partir du clair).
const themeScript = `try{var t=localStorage.getItem("theme");var d=t?t==="dark":true;document.documentElement.classList.toggle("dark",d)}catch(e){document.documentElement.classList.add("dark")}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
