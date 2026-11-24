import { Suspense } from "react";
import type { Metadata } from "next";
import MenuExplorer from "@/components/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu",
  description: "Toute la carte de Top Luxe : plats, pizzas, sandwichs, salades, cocktails, caves, glaces et chichas.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Notre menu</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Filtrez par famille, catégorie, type ou budget, ou cherchez directement un plat ou un ingrédient.
      </p>
      <Suspense fallback={null}>
        <MenuExplorer />
      </Suspense>
    </div>
  );
}
