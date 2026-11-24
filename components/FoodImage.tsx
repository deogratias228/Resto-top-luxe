"use client";

import Image from "next/image";
import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

// À placer dans un parent en "relative" avec une hauteur ou un aspect-ratio.
// Affiche un visuel de remplacement tant que la photo n'existe pas dans public/images/menu.
export default function FoodImage({ src, alt, sizes, priority, className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface text-muted">
        <UtensilsCrossed className="h-8 w-8" aria-hidden />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
