"use client";

import { MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export default function WhatsappInfoButton() {
  const handleInfo = () => {
    const currentUrl = window.location.href;

    const message = `Bonjour _*${SITE.name}*_ , je souhaite avoir des informations.

_Source :_ ${currentUrl}`;

    window.open(
      whatsappLink(message),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      type="button"
      onClick={handleInfo}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-black"
    >
      <MessageCircle className="h-4 w-4" />
      Ecrire sur WhatsApp
    </button>
  );
}
