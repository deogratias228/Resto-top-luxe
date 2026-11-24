export const SITE = {
  name: "Top Luxe",
  tagline: "Restaurant, lounge bar et terrasse à Lomé",
  hours: "7j/7, de 7h à l'aube",
  // Numéro WhatsApp au format international, sans + ni espaces
  whatsapp: "22890003535",
  phones: [
    { label: "+228 97 11 11 17", href: "tel:+22897111117" },
    { label: "+228 90 00 35 35", href: "tel:+22890003535" },
    { label: "+228 99 00 35 35", href: "tel:+22899003535" },
  ],
  maps: {
    name: "Top Luxe la terrasse",
    lat: 6.1596221,
    lng: 1.2042346,
    url: "https://maps.app.goo.gl/bMmvdjLApLMyL7v4A",
    embed: "https://www.google.com/maps?q=6.1596221,1.2042346&z=17&output=embed",
  },
  socials: [
    { label: "TikTok", handle: "@topluxeloungebar", href: "https://www.tiktok.com/@topluxeloungebar" },
    { label: "Instagram", handle: "@topluxe_lome", href: "https://www.instagram.com/topluxe_lome" },
  ],
  website: "topluxelome.com",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
