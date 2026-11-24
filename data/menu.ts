export type GroupId = "cuisine" | "boissons" | "autres";

export type CategoryId =
  | "plats"
  | "salades"
  | "pizzas"
  | "sandwichs"
  | "petit-dejeuner"
  | "manakish"
  | "pack-enfant"
  | "cocktails-alcool"
  | "cocktails-sans-alcool"
  | "softs"
  | "bieres"
  | "cafes"
  | "jus"
  | "caves"
  | "vins"
  | "champagnes"
  | "glaces"
  | "chichas";

export type Tag =
  | "poulet"
  | "boeuf"
  | "viande"
  | "poisson"
  | "fruits-de-mer"
  | "vegetarien"
  | "specialite-maison"
  | "avec-alcool"
  | "sans-alcool";

export interface Category {
  id: CategoryId;
  label: string;
  group: GroupId;
}

export interface PriceVariant {
  label: string;
  amount: number;
}

export interface MenuItem {
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  /** Prix de départ en F CFA (sert au tri et aux filtres). */
  price: number;
  /** Prix maximum quand le prix varie (ex. 4800 F à 6800 F). */
  priceMax?: number;
  /** Affiche "À partir de" devant le prix. */
  priceFrom?: boolean;
  /** Précision affichée avec le prix (ex. "Petit modèle"). */
  priceNote?: string;
  /** Prix par format (ex. au verre / bouteille, 1 à 3 boules). */
  variants?: PriceVariant[];
  /** Choix possibles pour un même prix (ex. Viande / Poulet, parfums). */
  options?: string[];
  ingredients?: string[];
  /** Accompagnements ou éléments inclus dans le prix. */
  includes?: string[];
  tags: Tag[];
  image: string;
  featured?: boolean;
}

export const GROUPS: { id: GroupId; label: string }[] = [
  { id: "cuisine", label: "Cuisine" },
  { id: "boissons", label: "Boissons" },
  { id: "autres", label: "Glaces et chichas" },
];

export const CATEGORIES: Category[] = [
  { id: "plats", label: "Plats", group: "cuisine" },
  { id: "salades", label: "Salades", group: "cuisine" },
  { id: "pizzas", label: "Pizzas", group: "cuisine" },
  { id: "sandwichs", label: "Sandwichs", group: "cuisine" },
  { id: "petit-dejeuner", label: "Petit-déjeuner", group: "cuisine" },
  { id: "manakish", label: "Manakish", group: "cuisine" },
  { id: "pack-enfant", label: "Pack enfant", group: "cuisine" },
  { id: "cocktails-alcool", label: "Cocktails avec alcool", group: "boissons" },
  { id: "cocktails-sans-alcool", label: "Cocktails sans alcool", group: "boissons" },
  { id: "softs", label: "Softs et eaux", group: "boissons" },
  { id: "bieres", label: "Bières", group: "boissons" },
  { id: "cafes", label: "Cafés et thés", group: "boissons" },
  { id: "jus", label: "Jus", group: "boissons" },
  { id: "caves", label: "Caves (spiritueux)", group: "boissons" },
  { id: "vins", label: "Vins", group: "boissons" },
  { id: "champagnes", label: "Champagnes", group: "boissons" },
  { id: "glaces", label: "Glaces et desserts", group: "autres" },
  { id: "chichas", label: "Chichas", group: "autres" },
];

export const TAG_LABELS: Record<Tag, string> = {
  poulet: "Poulet",
  boeuf: "Bœuf",
  viande: "Viande",
  poisson: "Poisson",
  "fruits-de-mer": "Fruits de mer",
  vegetarien: "Végétarien",
  "specialite-maison": "Spécialité maison",
  "avec-alcool": "Avec alcool",
  "sans-alcool": "Sans alcool",
};

export const PRICE_RANGES = [
  { id: "lt-2000", label: "Moins de 2 000 F", min: 0, max: 1999 },
  { id: "2000-3999", label: "2 000 à 3 999 F", min: 2000, max: 3999 },
  { id: "4000-5999", label: "4 000 à 5 999 F", min: 4000, max: 5999 },
  { id: "gte-6000", label: "6 000 F et plus", min: 6000, max: Infinity },
] as const;

/** Accompagnements supplémentaires disponibles pour les plats. */
export const EXTRA_SIDES = {
  price: 1500,
  items: [
    "Riz blanc",
    "Riz aux légumes",
    "Riz cantonais",
    "Pomme sautée",
    "Frites",
    "Légumes vapeur",
    "Atiéké",
    "Salade",
    "Aloco",
    "Akpan",
    "Djinkoumé",
  ],
};

/** Supplément possible sur les pizzas. */
export const PIZZA_SUPPLEMENT = { min: 500, max: 1000 };

export const MENU_ITEMS: MenuItem[] = [

  // Plats (15)
  {
    slug: "poisson-barracuda-special-topluxe-baE6ntv",
    name: "Poisson barracuda spécial Topluxe",
    category: "plats",
    description: "Barracuda préparé à la façon spéciale Topluxe, servi avec riz au légume ou frites.",
    price: 6000,
    includes: ["Riz au légume ou frites"],
    tags: ["poisson", "specialite-maison"],
    image: "/images/menu/poisson-barracuda-special-topluxe.jpg",
    featured: true,
  },
  {
    slug: "poisson-peche-du-jour-W5xXv1n",
    name: "Poisson (pêche du jour)",
    category: "plats",
    description: "Poisson du jour, le prix varie selon le poisson. Servi avec riz au légume ou frites.",
    price: 4800,
    priceMax: 6800,
    includes: ["Riz au légume ou frites"],
    tags: ["poisson"],
    image: "/images/menu/poisson-peche-du-jour.jpg",
  },
  {
    slug: "demi-poulet-roti-braise-rwVBv5R",
    name: "Demi poulet rôti / braisé",
    category: "plats",
    description: "Demi poulet rôti ou braisé, servi avec riz au légume ou frites.",
    price: 4800,
    priceMax: 5800,
    variants: [{ label: "Rôti", amount: 4800 }, { label: "Braisé", amount: 5800 }],
    includes: ["Riz au légume ou frites"],
    tags: ["poulet"],
    image: "/images/menu/demi-poulet-roti-braise.jpg",
    featured: true,
  },
  {
    slug: "demi-pintade-y9ZTVti",
    name: "Demi pintade",
    category: "plats",
    description: "Demi pintade servie avec riz au légume ou frites.",
    price: 6000,
    includes: ["Riz au légume ou frites"],
    tags: ["viande"],
    image: "/images/menu/demi-pintade.jpg",
  },
  {
    slug: "brochette-viande-poulet-PdJRvih",
    name: "Brochette viande / poulet",
    category: "plats",
    description: "Brochettes de viande ou de poulet, servies avec riz au légume ou frites.",
    price: 5500,
    options: ["Viande", "Poulet"],
    includes: ["Riz au légume ou frites"],
    tags: ["viande", "poulet"],
    image: "/images/menu/brochette-viande-poulet.jpg",
  },
  {
    slug: "plat-broasted-kfc-poulet-arj5b5h",
    name: "Plat Broasted / KFC (½ poulet)",
    category: "plats",
    description: "Poulet croustillant façon broasted ou KFC (½ poulet), servi avec frites et salade de choux.",
    price: 4000,
    priceMax: 5800,
    variants: [{ label: "Plat Broasted", amount: 4000 }, { label: "KFC (½ poulet)", amount: 5800 }],
    includes: ["Frites", "Salade de choux"],
    tags: ["poulet"],
    image: "/images/menu/plat-broasted-kfc-poulet.jpg",
  },
  {
    slug: "filet-pane-Nl01jMo",
    name: "Filet pané",
    category: "plats",
    description: "Filet pané de poulet, de poisson ou de viande, servi avec riz au légume ou frites.",
    price: 4800,
    options: ["Poulet", "Poisson", "Viande"],
    includes: ["Riz au légume ou frites"],
    tags: ["poulet", "poisson", "viande"],
    image: "/images/menu/filet-pane.jpg",
  },
  {
    slug: "steak-a-la-creme-de-champignons-HTJtMtc",
    name: "Steak à la crème de champignons",
    category: "plats",
    description: "Steak nappé d'une crème aux champignons, servi avec riz au légume ou frites.",
    price: 6500,
    includes: ["Riz au légume ou frites"],
    tags: ["boeuf", "viande"],
    image: "/images/menu/steak-a-la-creme-de-champignons.jpg",
  },
  {
    slug: "crevette-provencale-salade-sQcrADt",
    name: "Crevette provençale salade",
    category: "plats",
    description: "Crevettes provençale accompagnées de salade, avec riz au légume ou frites.",
    price: 6000,
    includes: ["Riz au légume ou frites"],
    tags: ["fruits-de-mer"],
    image: "/images/menu/crevette-provencale-salade.jpg",
  },
  {
    slug: "cote-de-boeuf-jjhPTId",
    name: "Côte de bœuf",
    category: "plats",
    description: "Côte de bœuf servie avec riz au légume ou frites.",
    price: 4800,
    includes: ["Riz au légume ou frites"],
    tags: ["boeuf", "viande"],
    image: "/images/menu/cote-de-boeuf.jpg",
  },
  {
    slug: "riz-au-gras-topluxe-au-feu-PMlAgLm",
    name: "Riz au gras Topluxe au feu",
    category: "plats",
    description: "Riz au gras spécial Topluxe cuit au feu, avec de la viande ou du poulet au choix.",
    price: 5000,
    options: ["Viande", "Poulet"],
    tags: ["viande", "poulet", "specialite-maison"],
    image: "/images/menu/riz-au-gras-topluxe-au-feu.jpg",
  },
  {
    slug: "pates-bolognaise-aux-legumes-ROgazQt",
    name: "Pâtes bolognaise / aux légumes",
    category: "plats",
    description: "Pâtes à la sauce bolognaise ou aux légumes.",
    price: 3000,
    options: ["Bolognaise", "Aux légumes"],
    tags: [],
    image: "/images/menu/pates-bolognaise-aux-legumes.jpg",
  },
  {
    slug: "soupe-viande-poulet-BQVshVu",
    name: "Soupe viande / poulet",
    category: "plats",
    description: "Soupe à la viande ou au poulet.",
    price: 3000,
    options: ["Viande", "Poulet"],
    tags: ["viande", "poulet"],
    image: "/images/menu/soupe-viande-poulet.jpg",
  },
  {
    slug: "samoussa-nems-Xq1Goca",
    name: "Samoussa / Nems",
    category: "plats",
    description: "Samoussas ou nems, à choisir selon l'envie.",
    price: 3500,
    options: ["Samoussa", "Nems"],
    tags: [],
    image: "/images/menu/samoussa-nems.jpg",
  },
  {
    slug: "omelette-aux-frites-Y1Z8xHV",
    name: "Omelette aux frites",
    category: "plats",
    description: "Omelette servie avec des frites.",
    price: 2500,
    tags: ["vegetarien"],
    image: "/images/menu/omelette-aux-frites.jpg",
  },

  // Salades (5)
  {
    slug: "salade-macedoine-special-topluxe-qP5mKZF",
    name: "Salade macédoine spécial Topluxe",
    category: "salades",
    description: "Salade composée de pomme de terre, carotte, mayonnaise, thon, saucisse, petit pois, tomate, viande et œuf.",
    price: 4500,
    ingredients: ["pomme de terre", "carotte", "mayonnaise", "thon", "saucisse", "petit pois", "tomate", "viande", "œuf"],
    tags: ["specialite-maison", "poisson", "viande"],
    image: "/images/menu/salade-macedoine-special-topluxe.jpg",
    featured: true,
  },
  {
    slug: "salade-africaine-AaQGwut",
    name: "Salade africaine",
    category: "salades",
    description: "Salade composée de laitue, oignon, tomate, concombre, spaghetti, viande, œuf et mayonnaise.",
    price: 3500,
    ingredients: ["laitue", "oignon", "tomate", "concombre", "spaghetti", "viande", "œuf", "mayonnaise"],
    tags: ["viande"],
    image: "/images/menu/salade-africaine.jpg",
  },
  {
    slug: "salade-fatouch-N9L2xGb",
    name: "Salade fatouch",
    category: "salades",
    description: "Salade composée de laitue, oignon, tomate, concombre, ail, citron et huile d'olive.",
    price: 3500,
    ingredients: ["laitue", "oignon", "tomate", "concombre", "ail", "citron", "huile d'olive"],
    tags: ["vegetarien"],
    image: "/images/menu/salade-fatouch.jpg",
  },
  {
    slug: "salade-mixte-a-l-avocat-2cHIUna",
    name: "Salade mixte à l'avocat",
    category: "salades",
    description: "Salade composée de laitue, tomate, oignon, poivron, avocat, maïs doux et sauce vinaigrette.",
    price: 3000,
    ingredients: ["laitue", "tomate", "oignon", "poivron", "avocat", "maïs doux", "sauce vinaigrette"],
    tags: ["vegetarien"],
    image: "/images/menu/salade-mixte-a-l-avocat.jpg",
  },
  {
    slug: "salade-nicoise-baZtDXA",
    name: "Salade niçoise",
    category: "salades",
    description: "Salade composée de laitue, tomate, oignon, filet d'anchois, poivron, olive noire, œuf, pomme de terre et sauce vinaigrette.",
    price: 4500,
    ingredients: ["laitue", "tomate", "oignon", "filet d'anchois", "poivron", "olive noire", "œuf", "pomme de terre", "sauce vinaigrette"],
    tags: ["poisson"],
    image: "/images/menu/salade-nicoise.jpg",
  },

  // Pizzas (15)
  {
    slug: "margarita-AlgCdqq",
    name: "Margarita",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, origan et olive.",
    price: 2700,
    ingredients: ["sauce pizza", "fromage", "origan", "olive"],
    tags: ["vegetarien"],
    image: "/images/menu/margarita.jpg",
  },
  {
    slug: "royal-1dugROK",
    name: "Royal",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, viande hachée, jambon et œuf.",
    price: 4800,
    ingredients: ["sauce pizza", "fromage", "viande hachée", "jambon", "œuf"],
    tags: ["viande"],
    image: "/images/menu/royal.jpg",
    featured: true,
  },
  {
    slug: "pizza-forestier-OlSZSyJ",
    name: "Pizza forestier",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, champignons et olive.",
    price: 3800,
    ingredients: ["sauce pizza", "fromage", "champignons", "olive"],
    tags: ["vegetarien"],
    image: "/images/menu/pizza-forestier.jpg",
  },
  {
    slug: "4-saisons-MfnurJy",
    name: "4 Saisons",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, saucisses, jambon, poulet, salami et olive.",
    price: 5000,
    ingredients: ["sauce pizza", "fromage", "saucisses", "jambon", "poulet", "salami", "olive"],
    tags: ["poulet", "viande"],
    image: "/images/menu/4-saisons.jpg",
  },
  {
    slug: "hawai-UEkKo6q",
    name: "Hawaï",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, viande hachée, poivrons, ananas et oignon.",
    price: 4500,
    ingredients: ["sauce pizza", "fromage", "viande hachée", "poivrons", "ananas", "oignon"],
    tags: ["viande"],
    image: "/images/menu/hawai.jpg",
  },
  {
    slug: "super-special-Hrx9gdt",
    name: "Super Spécial",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, poulet, thon, viande hachée et olive.",
    price: 5500,
    ingredients: ["sauce pizza", "fromage", "poulet", "thon", "viande hachée", "olive"],
    tags: ["poulet", "poisson", "viande"],
    image: "/images/menu/super-special.jpg",
    featured: true,
  },
  {
    slug: "la-paysanne-qWmJ9SM",
    name: "La Paysanne",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, saucisse et oignon.",
    price: 3800,
    ingredients: ["sauce pizza", "fromage", "saucisse", "oignon"],
    tags: ["viande"],
    image: "/images/menu/la-paysanne.jpg",
  },
  {
    slug: "crazy-dog-VExTAk3",
    name: "Crazy dog",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, jambon, saucisses et viande hachée.",
    price: 4500,
    ingredients: ["sauce pizza", "fromage", "jambon", "saucisses", "viande hachée"],
    tags: ["viande"],
    image: "/images/menu/crazy-dog.jpg",
  },
  {
    slug: "pepperoni-aPrQ2R2",
    name: "Pepperoni",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, origan, pepperoni et oignons.",
    price: 4500,
    ingredients: ["sauce pizza", "fromage", "origan", "pepperoni", "oignons"],
    tags: ["viande"],
    image: "/images/menu/pepperoni.jpg",
  },
  {
    slug: "americaine-a6qbevH",
    name: "Américaine",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, saucisse et salami.",
    price: 4500,
    ingredients: ["sauce pizza", "fromage", "saucisse", "salami"],
    tags: ["viande"],
    image: "/images/menu/americaine.jpg",
  },
  {
    slug: "la-vegetarienne-MA0puuX",
    name: "La végétarienne",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, oignons, champignons, poivrons, maïs et olive.",
    price: 4500,
    ingredients: ["sauce pizza", "fromage", "oignons", "champignons", "poivrons", "maïs", "olive"],
    tags: ["vegetarien"],
    image: "/images/menu/la-vegetarienne.jpg",
  },
  {
    slug: "la-reine-TpnIdkd",
    name: "La reine",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, jambon, champignon et olive.",
    price: 4500,
    ingredients: ["sauce pizza", "fromage", "jambon", "champignon", "olive"],
    tags: ["viande"],
    image: "/images/menu/la-reine.jpg",
  },
  {
    slug: "la-sicilienne-wSeX2qV",
    name: "La Sicilienne",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage, anchois et olive.",
    price: 4500,
    ingredients: ["sauce pizza", "fromage", "anchois", "olive"],
    tags: ["poisson"],
    image: "/images/menu/la-sicilienne.jpg",
  },
  {
    slug: "pizza-fruits-de-mer-eh3C0PW",
    name: "Pizza fruits de mer",
    category: "pizzas",
    description: "Pizza garnie de sauce pizza, fromage et fruits de mer.",
    price: 6500,
    ingredients: ["sauce pizza", "fromage", "fruits de mer"],
    tags: ["fruits-de-mer"],
    image: "/images/menu/pizza-fruits-de-mer.jpg",
  },
  {
    slug: "la-calzone-pizza-fermee-8OSKNSf",
    name: "La calzone (pizza fermée)",
    category: "pizzas",
    description: "Pizza fermée garnie de sauce pizza, fromage, saucisses, jambon et champignons.",
    price: 4800,
    ingredients: ["sauce pizza", "fromage", "saucisses", "jambon", "champignons"],
    tags: ["viande"],
    image: "/images/menu/la-calzone-pizza-fermee.jpg",
  },

  // Sandwichs (13)
  // {
  //   slug: "sandwich-fahita-viande-poulet-D9JOLaW",
  //   name: "Sandwich fahita viande / poulet",
  //   category: "sandwichs",
  //   description: "Sandwich composé de filet de poulet, poivrons, maïs, champignons, oignons, fromages, laitue, sauce et frites.",
  //   price: 2500,
  //   options: ["Viande", "Poulet"],
  //   ingredients: ["filet de poulet", "poivrons", "maïs", "champignons", "oignons", "fromages", "laitue", "sauce", "frites"],
  //   tags: ["poulet", "viande"],
  //   image: "/images/menu/sandwich-fahita-viande-poulet.jpg",
  // },
  // {
  //   slug: "sandwich-grec-cpWI8Fn",
  //   name: "Sandwich grec",
  //   category: "sandwichs",
  //   description: "Sandwich composé de viande de bœuf, laitue, tomates, oignons et sauce.",
  //   price: 1500,
  //   ingredients: ["viande de bœuf", "laitue", "tomates", "oignons", "sauce"],
  //   tags: ["boeuf", "viande"],
  //   image: "/images/menu/sandwich-grec.jpg",
  // },
  // {
  //   slug: "sandwich-merguez-sojok-xBkS3um",
  //   name: "Sandwich merguez / sojok",
  //   category: "sandwichs",
  //   description: "Sandwich composé de mouton haché à la sauce merguez, salade de choux, frites et tomates.",
  //   price: 2500,
  //   ingredients: ["mouton haché à la sauce merguez", "salade de choux", "frites", "tomates"],
  //   tags: ["viande"],
  //   image: "/images/menu/sandwich-merguez-sojok.jpg",
  // },
  // {
  //   slug: "sandwich-kebab-g9DhfJp",
  //   name: "Sandwich kebab",
  //   category: "sandwichs",
  //   description: "Sandwich composé de viande hachée de bœuf, oignons, persil, tomates et sauce.",
  //   price: 2000,
  //   ingredients: ["viande hachée de bœuf", "oignons", "persil", "tomates", "sauce"],
  //   tags: ["boeuf", "viande"],
  //   image: "/images/menu/sandwich-kebab.jpg",
  // },
  // {
  //   slug: "sandwich-poisson-gZGGPmm",
  //   name: "Sandwich poisson",
  //   category: "sandwichs",
  //   description: "Sandwich composé de filet de poisson, salade de choux, frites et sauce.",
  //   price: 3000,
  //   ingredients: ["filet de poisson", "salade de choux", "frites", "sauce"],
  //   tags: ["poisson"],
  //   image: "/images/menu/sandwich-poisson.jpg",
  // },
  // {
  //   slug: "sandwich-falafel-pmSSYKV",
  //   name: "Sandwich falafel",
  //   category: "sandwichs",
  //   description: "Sandwich végétarien aux falafels et aux légumes.",
  //   price: 2000,
  //   ingredients: ["légumes"],
  //   tags: ["vegetarien"],
  //   image: "/images/menu/sandwich-falafel.jpg",
  // },
  // {
  //   slug: "sandwich-jambon-fromage-IO1NoFb",
  //   name: "Sandwich jambon / fromage",
  //   category: "sandwichs",
  //   description: "Sandwich composé de jambon, tomates, fromage, laitue et sauce.",
  //   price: 1500,
  //   ingredients: ["jambon", "tomates", "fromage", "laitue", "sauce"],
  //   tags: ["viande"],
  //   image: "/images/menu/sandwich-jambon-fromage.jpg",
  // },
  // {
  //   slug: "chawarma-viande-poulet-WeKEDZj",
  //   name: "Chawarma viande / poulet",
  //   category: "sandwichs",
  //   description: "Sandwich composé de tranche de poulet, salade de choux, frites et sauce.",
  //   price: 1500,
  //   options: ["Viande", "Poulet"],
  //   ingredients: ["tranche de poulet", "salade de choux", "frites", "sauce"],
  //   tags: ["poulet", "viande"],
  //   image: "/images/menu/chawarma-viande-poulet.jpg",
  // },
  // {
  //   slug: "plat-chawarma-viande-poulet-Siozd5W",
  //   name: "Plat chawarma viande / poulet",
  //   category: "sandwichs",
  //   description: "Sandwich composé de tranches de bœuf, oignons, tomates, frites et sauce.",
  //   price: 3500,
  //   options: ["Viande", "Poulet"],
  //   ingredients: ["tranches de bœuf", "oignons", "tomates", "frites", "sauce"],
  //   tags: ["boeuf", "poulet", "viande"],
  //   image: "/images/menu/plat-chawarma-viande-poulet.jpg",
  // },
  // {
  //   slug: "burger-viande-poulet-ftU1tnj",
  //   name: "Burger viande / poulet",
  //   category: "sandwichs",
  //   description: "Sandwich composé de viande hachée de poulet, salade de choux, frites et ketchup.",
  //   price: 1500,
  //   options: ["Viande", "Poulet"],
  //   ingredients: ["viande hachée de poulet", "salade de choux", "frites", "ketchup"],
  //   tags: ["poulet", "viande"],
  //   image: "/images/menu/burger-viande-poulet.jpg",
  // },
  // {
  //   slug: "plat-burger-viande-poulet-YhQ4AKn",
  //   name: "Plat burger viande / poulet",
  //   category: "sandwichs",
  //   description: "Sandwich composé de viande hachée de burger, fromage, salade de choux, laitue, tomate, oignons et frites.",
  //   price: 3500,
  //   options: ["Viande", "Poulet"],
  //   ingredients: ["viande hachée de burger", "fromage", "salade de choux", "laitue", "tomate", "oignons", "frites"],
  //   tags: ["poulet", "viande"],
  //   image: "/images/menu/plat-burger-viande-poulet.jpg",
  // },
  // {
  //   slug: "cheese-burger-poulet-gNwWRFf",
  //   name: "Cheese burger / poulet",
  //   category: "sandwichs",
  //   description: "Sandwich composé de viande hachée de burger, fromage, salade de choux, laitue, tomate, oignons et frites.",
  //   price: 1800,
  //   options: ["Viande", "Poulet"],
  //   ingredients: ["viande hachée de burger", "fromage", "salade de choux", "laitue", "tomate", "oignons", "frites"],
  //   tags: ["poulet", "viande"],
  //   image: "/images/menu/cheese-burger-poulet.jpg",
  // },
  // {
  //   slug: "plat-nuggets-1TpAcbF",
  //   name: "Plat nuggets",
  //   category: "sandwichs",
  //   description: "Nuggets servis avec salade de choux et sauce Topluxe.",
  //   price: 3500,
  //   ingredients: ["nuggets", "salade de choux", "sauce Topluxe"],
  //   tags: ["poulet"],
  //   image: "/images/menu/plat-nuggets.jpg",
  // },

  // Petit-déjeuner (3)
  {
    slug: "omelette-confiture-et-cafe-au-lait-the-x5Otsyy",
    name: "Omelette, confiture et café au lait / thé",
    category: "petit-dejeuner",
    description: "Omelette accompagnée de confiture et d'un café au lait ou d'un thé.",
    price: 3500,
    options: ["Café au lait", "Thé"],
    tags: ["vegetarien"],
    image: "/images/menu/omelette-confiture-et-cafe-au-lait-the.jpg",
  },
  {
    slug: "sandwich-romana-9hLA4QE",
    name: "Sandwich romana",
    category: "petit-dejeuner",
    description: "Sandwich composé de fromage, tomate, origan et huile d'olive.",
    price: 1500,
    ingredients: ["fromage", "tomate", "origan", "huile d'olive"],
    tags: ["vegetarien"],
    image: "/images/menu/sandwich-romana.jpg",
  },
  {
    slug: "croissant-0FMmIQm",
    name: "Croissant",
    category: "petit-dejeuner",
    description: "Croissant pour bien commencer la journée.",
    price: 800,
    tags: ["vegetarien"],
    image: "/images/menu/croissant.jpg",
  },

  // Manakish (4)
  {
    slug: "manakish-zatar-SZ3yVsQ",
    name: "Manakish zatar",
    category: "manakish",
    description: "Manakish garni de zatar.",
    price: 2000,
    tags: ["vegetarien"],
    image: "/images/menu/manakish-zatar.jpg",
  },
  {
    slug: "manakish-fromage-UUS6PXO",
    name: "Manakish fromage",
    category: "manakish",
    description: "Manakish garni de fromage.",
    price: 2500,
    tags: ["vegetarien"],
    image: "/images/menu/manakish-fromage.jpg",
  },
  {
    slug: "manakish-jambon-avec-fromage-RNdwoxr",
    name: "Manakish jambon avec fromage",
    category: "manakish",
    description: "Manakish garni de jambon et de fromage.",
    price: 3000,
    tags: ["viande"],
    image: "/images/menu/manakish-jambon-avec-fromage.jpg",
  },
  {
    slug: "manakish-tomate-avec-oignons-Hl7yoGP",
    name: "Manakish tomate avec oignons",
    category: "manakish",
    description: "Manakish garni de tomate et d'oignons.",
    price: 2500,
    tags: ["vegetarien"],
    image: "/images/menu/manakish-tomate-avec-oignons.jpg",
  },

  // Pack enfant (1)
  {
    slug: "pack-enfant-V9vcFJ3",
    name: "Pack enfant",
    category: "pack-enfant",
    description: "Un pack pensé pour les enfants : une pizza medium, un jus et une boule de glace au choix.",
    price: 3500,
    includes: ["1 pizza medium (sauce pizza, fromage, saucisse, origan)", "1 jus", "1 boule de glace au choix"],
    tags: [],
    image: "/images/menu/pack-enfant.jpg",
    featured: true,
  },

  // Cocktails avec alcool (11)
  {
    slug: "flamingo-fF9D9a2",
    name: "Flamingo",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec rhum, jus d'ananas, jus de citron vert et sirop de grenadine.",
    price: 3500,
    ingredients: ["rhum", "jus d'ananas", "jus de citron vert", "sirop de grenadine"],
    tags: ["avec-alcool"],
    image: "/images/menu/flamingo.jpg",
  },
  {
    slug: "margarita-cocktail-WHS8T8r",
    name: "Margarita (cocktail)",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec tequila, triple sec et jus de citron vert.",
    price: 3000,
    ingredients: ["tequila", "triple sec", "jus de citron vert"],
    tags: ["avec-alcool"],
    image: "/images/menu/margarita-cocktail.jpg",
  },
  {
    slug: "colibri-xD4L16L",
    name: "Colibri",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec rhum, sucre de canne, eau gazeuse, menthe et citron vert.",
    price: 3500,
    ingredients: ["rhum", "sucre de canne", "eau gazeuse", "menthe", "citron vert"],
    tags: ["avec-alcool"],
    image: "/images/menu/colibri.jpg",
  },
  {
    slug: "pina-colada-WmQnWT6",
    name: "Pina colada",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec rhum, jus d'ananas et lait de coco.",
    price: 3500,
    ingredients: ["rhum", "jus d'ananas", "lait de coco"],
    tags: ["avec-alcool"],
    image: "/images/menu/pina-colada.jpg",
  },
  {
    slug: "pink-lady-2jg7I98",
    name: "Pink lady",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec gin, jus d'ananas et sirop de grenadine.",
    price: 3000,
    ingredients: ["gin", "jus d'ananas", "sirop de grenadine"],
    tags: ["avec-alcool"],
    image: "/images/menu/pink-lady.jpg",
  },
  {
    slug: "mojito-juSoF7Z",
    name: "Mojito",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec rhum blanc, sucre de canne, menthe fraîche et citron vert.",
    price: 3500,
    ingredients: ["rhum blanc", "sucre de canne", "menthe fraîche", "citron vert"],
    tags: ["avec-alcool"],
    image: "/images/menu/mojito.jpg",
    featured: true,
  },
  {
    slug: "ti-punch-paillote-yxelDGX",
    name: "Ti punch paillote",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec rhum blanc, rhum brun, citron vert et sucre de canne.",
    price: 3000,
    ingredients: ["rhum blanc", "rhum brun", "citron vert", "sucre de canne"],
    tags: ["avec-alcool"],
    image: "/images/menu/ti-punch-paillote.jpg",
  },
  {
    slug: "fond-de-culotte-QST1XxC",
    name: "Fond de culotte",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec suze, crème de cassis et soda.",
    price: 3500,
    ingredients: ["suze", "crème de cassis", "soda"],
    tags: ["avec-alcool"],
    image: "/images/menu/fond-de-culotte.jpg",
  },
  {
    slug: "cuba-libre-oKH4bOx",
    name: "Cuba libre",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec rhum blanc, coca et citron vert.",
    price: 3000,
    ingredients: ["rhum blanc", "coca", "citron vert"],
    tags: ["avec-alcool"],
    image: "/images/menu/cuba-libre.jpg",
  },
  {
    slug: "americano-XXb8CiL",
    name: "Americano",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec martini rouge, campari, gin et soda.",
    price: 3000,
    ingredients: ["martini rouge", "campari", "gin", "soda"],
    tags: ["avec-alcool"],
    image: "/images/menu/americano.jpg",
  },
  {
    slug: "morito-503mP0Y",
    name: "Morito",
    category: "cocktails-alcool",
    description: "Cocktail préparé avec rhum, sucre de canne, eau gazeuse, menthe et citron vert.",
    price: 3500,
    ingredients: ["rhum", "sucre de canne", "eau gazeuse", "menthe", "citron vert"],
    tags: ["avec-alcool"],
    image: "/images/menu/morito.jpg",
  },

  // Cocktails sans alcool (4)
  {
    slug: "bora-bora-5eJIZEZ",
    name: "Bora Bora",
    category: "cocktails-sans-alcool",
    description: "Cocktail sans alcool préparé avec jus de passion, jus de citron et sirop de grenadine.",
    price: 2500,
    ingredients: ["jus de passion", "jus de citron", "sirop de grenadine"],
    tags: ["sans-alcool"],
    image: "/images/menu/bora-bora.jpg",
  },
  {
    slug: "pomme-d-amour-2eThtwN",
    name: "Pomme d'amour",
    category: "cocktails-sans-alcool",
    description: "Cocktail sans alcool préparé avec jus de pomme, jus d'orange et sirop de fraise.",
    price: 2500,
    ingredients: ["jus de pomme", "jus d'orange", "sirop de fraise"],
    tags: ["sans-alcool"],
    image: "/images/menu/pomme-d-amour.jpg",
  },
  {
    slug: "virgin-mojito-CTVZwmZ",
    name: "Virgin Mojito",
    category: "cocktails-sans-alcool",
    description: "Cocktail sans alcool préparé avec citron, menthe, sucre de canne et eau gazeuse.",
    price: 3000,
    ingredients: ["citron", "menthe", "sucre de canne", "eau gazeuse"],
    tags: ["sans-alcool"],
    image: "/images/menu/virgin-mojito.jpg",
  },
  {
    slug: "virgin-punch-3jKWaXg",
    name: "Virgin punch",
    category: "cocktails-sans-alcool",
    description: "Cocktail sans alcool préparé avec jus d'orange, jus d'ananas, jus de citron et sirop de grenadine.",
    price: 2500,
    ingredients: ["jus d'orange", "jus d'ananas", "jus de citron", "sirop de grenadine"],
    tags: ["sans-alcool"],
    image: "/images/menu/virgin-punch.jpg",
  },

  // Softs et eaux (4)
  {
    slug: "sodas-qz58TRT",
    name: "Sodas",
    category: "softs",
    description: "Sodas en petit modèle : Coca, Sprite, Cocktail, Malta et autres.",
    price: 1000,
    priceNote: "Petit modèle",
    options: ["Coca", "Sprite", "Cocktail", "Malta"],
    tags: ["sans-alcool"],
    image: "/images/menu/sodas.jpg",
  },
  {
    slug: "energy-drink-1eWTVbd",
    name: "Energy drink",
    category: "softs",
    description: "Boisson énergisante.",
    price: 1500,
    tags: ["sans-alcool"],
    image: "/images/menu/energy-drink.jpg",
  },
  {
    slug: "eau-gazeuse-wn2c3iO",
    name: "Eau gazeuse",
    category: "softs",
    description: "Eau gazeuse.",
    price: 2500,
    tags: ["sans-alcool"],
    image: "/images/menu/eau-gazeuse.jpg",
  },
  {
    slug: "eau-minerale-4sPmhs0",
    name: "Eau minérale",
    category: "softs",
    description: "Eau minérale en petit ou grand modèle.",
    price: 500,
    priceMax: 1500,
    variants: [{ label: "Petit modèle", amount: 500 }, { label: "Grand modèle", amount: 1500 }],
    tags: ["sans-alcool"],
    image: "/images/menu/eau-minerale.jpg",
  },

  // Bières (5)
  {
    slug: "bieres-petit-modele-0JetVVv",
    name: "Bières petit modèle",
    category: "bieres",
    description: "Sélection de bières en petit modèle : Beaufort, Djama, Pils, Lager et autres.",
    price: 1000,
    priceNote: "Petit modèle",
    options: ["Beaufort", "Djama", "Pils", "Lager"],
    tags: ["avec-alcool"],
    image: "/images/menu/bieres-petit-modele.jpg",
  },
  {
    slug: "bieres-grand-modele-VpJIELq",
    name: "Bières grand modèle",
    category: "bieres",
    description: "Sélection de bières en grand modèle : Chill, Awooyo, Doppel, Racine et autres.",
    price: 1500,
    priceNote: "Grand modèle",
    options: ["Chill", "Awooyo", "Doppel", "Racine"],
    tags: ["avec-alcool"],
    image: "/images/menu/bieres-grand-modele.jpg",
  },
  {
    slug: "heineken-desperado-smirnoff-lEA8DCf",
    name: "Heineken / Desperado / Smirnoff",
    category: "bieres",
    description: "Heineken, Desperado ou Smirnoff.",
    price: 2000,
    options: ["Heineken", "Desperado", "Smirnoff"],
    tags: ["avec-alcool"],
    image: "/images/menu/heineken-desperado-smirnoff.jpg",
  },
  {
    slug: "biere-pression-bzdQPvz",
    name: "Bière pression",
    category: "bieres",
    description: "Bière pression en 33 cl ou 50 cl.",
    price: 2000,
    priceMax: 3000,
    variants: [{ label: "33 cl", amount: 2000 }, { label: "50 cl", amount: 3000 }],
    tags: ["avec-alcool"],
    image: "/images/menu/biere-pression.jpg",
  },
  {
    slug: "monaco-uRrOnKx",
    name: "Monaco",
    category: "bieres",
    description: "Monaco.",
    price: 3000,
    tags: ["avec-alcool"],
    image: "/images/menu/monaco.jpg",
  },

  // Cafés et thés (2)
  {
    slug: "expresso-cafe-ou-the-zudCbOm",
    name: "Expresso, café ou thé",
    category: "cafes",
    description: "Expresso, café ou thé au choix.",
    price: 1000,
    options: ["Expresso", "Café au choix", "Thé au choix"],
    tags: ["sans-alcool"],
    image: "/images/menu/expresso-cafe-ou-the.jpg",
  },
  {
    slug: "cafe-au-lait-cappuccino-ou-chocolat-chaud-dFmDnXI",
    name: "Café au lait, cappuccino ou chocolat chaud",
    category: "cafes",
    description: "Café au lait, cappuccino ou chocolat chaud.",
    price: 1500,
    options: ["Café au lait", "Cappuccino", "Chocolat chaud"],
    tags: ["sans-alcool"],
    image: "/images/menu/cafe-au-lait-cappuccino-ou-chocolat-chaud.jpg",
  },

  // Jus (2)
  {
    slug: "jus-de-fruits-lNJ5WOL",
    name: "Jus de fruits",
    category: "jus",
    description: "Jus de mangue, goyave, ananas ou cocktail.",
    price: 1500,
    options: ["Mangue", "Goyave", "Ananas", "Cocktail"],
    tags: ["sans-alcool"],
    image: "/images/menu/jus-de-fruits.jpg",
  },
  {
    slug: "jus-gingembre-coco-orange-C8QbJ3q",
    name: "Jus gingembre / coco / orange",
    category: "jus",
    description: "Jus de gingembre, de coco ou d'orange.",
    price: 1500,
    options: ["Gingembre", "Jus de coco", "Orange"],
    tags: ["sans-alcool"],
    image: "/images/menu/jus-gingembre-coco-orange.jpg",
  },

  // Caves (spiritueux) (9)
  {
    slug: "ballantines-black-label-jack-daniel-s-baileys-xwl4LDC",
    name: "Ballantines / Black Label / Jack Daniel's / Baileys",
    category: "caves",
    description: "Au choix : Ballantines, Black Label, Jack Daniel's et Baileys. Servi au verre ou en bouteille.",
    price: 2500,
    priceMax: 35000,
    variants: [{ label: "Au verre", amount: 2500 }, { label: "Bouteille", amount: 35000 }],
    options: ["Ballantines", "Black Label", "Jack Daniel's", "Baileys"],
    tags: ["avec-alcool"],
    image: "/images/menu/ballantines-black-label-jack-daniel-s-baileys.jpg",
  },
  {
    slug: "red-label-j-b-grant-s-campari-dePgV4F",
    name: "Red Label / J&B / Grant's / Campari",
    category: "caves",
    description: "Au choix : Red Label, J&B, Grant's et Campari. Servi au verre ou en bouteille.",
    price: 2000,
    priceMax: 30000,
    variants: [{ label: "Au verre", amount: 2000 }, { label: "Bouteille", amount: 30000 }],
    options: ["Red Label", "J&B", "Grant's", "Campari"],
    tags: ["avec-alcool"],
    image: "/images/menu/red-label-j-b-grant-s-campari.jpg",
  },
  {
    slug: "absolut-gordon-s-gin-saint-james-blanc-xrOTWYw",
    name: "Absolut / Gordon's Gin / Saint James blanc",
    category: "caves",
    description: "Au choix : Absolut, Gordon's Gin et Saint James blanc. Servi au verre ou en bouteille.",
    price: 2000,
    priceMax: 30000,
    variants: [{ label: "Au verre", amount: 2000 }, { label: "Bouteille", amount: 30000 }],
    options: ["Absolut", "Gordon's Gin", "Saint James blanc"],
    tags: ["avec-alcool"],
    image: "/images/menu/absolut-gordon-s-gin-saint-james-blanc.jpg",
  },
  {
    slug: "tequila-blanco-pastis-ricard-suze-6JF0MjT",
    name: "Tequila Blanco / Pastis Ricard / Suze",
    category: "caves",
    description: "Au choix : Tequila Blanco, Pastis Ricard et Suze. Servi au verre ou en bouteille.",
    price: 2000,
    priceMax: 30000,
    variants: [{ label: "Au verre", amount: 2000 }, { label: "Bouteille", amount: 30000 }],
    options: ["Tequila Blanco", "Pastis Ricard", "Suze"],
    tags: ["avec-alcool"],
    image: "/images/menu/tequila-blanco-pastis-ricard-suze.jpg",
  },
  {
    slug: "martini-rose-blanc-rouge-bacardi-fdqe7Pa",
    name: "Martini Rosé / Blanc / Rouge / Bacardi",
    category: "caves",
    description: "Au choix : Martini Rosé, Martini Blanc, Martini Rouge et Bacardi. Servi au verre ou en bouteille.",
    price: 2000,
    priceMax: 30000,
    variants: [{ label: "Au verre", amount: 2000 }, { label: "Bouteille", amount: 30000 }],
    options: ["Martini Rosé", "Martini Blanc", "Martini Rouge", "Bacardi"],
    tags: ["avec-alcool"],
    image: "/images/menu/martini-rose-blanc-rouge-bacardi.jpg",
  },
  {
    slug: "porto-cruz-marie-brizard-malibu-get-7-8pkmjfb",
    name: "Porto Cruz / Marie Brizard / Malibu / Get 7",
    category: "caves",
    description: "Au choix : Porto Cruz, Marie Brizard, Malibu et Get 7. Servi au verre ou en bouteille.",
    price: 2500,
    priceMax: 20000,
    variants: [{ label: "Au verre", amount: 2500 }, { label: "Bouteille", amount: 20000 }],
    options: ["Porto Cruz", "Marie Brizard", "Malibu", "Get 7"],
    tags: ["avec-alcool"],
    image: "/images/menu/porto-cruz-marie-brizard-malibu-get-7.jpg",
  },
  {
    slug: "chivas-dimple-hennessy-RMgIEIO",
    name: "Chivas / Dimple / Hennessy",
    category: "caves",
    description: "Au choix : Chivas, Dimple et Hennessy. Servi au verre ou en bouteille.",
    price: 3500,
    priceMax: 40000,
    variants: [{ label: "Au verre", amount: 3500 }, { label: "Bouteille", amount: 40000 }],
    options: ["Chivas", "Dimple", "Hennessy"],
    tags: ["avec-alcool"],
    image: "/images/menu/chivas-dimple-hennessy.jpg",
  },
  {
    slug: "glenfiddich-12-ans-Jbjcrkc",
    name: "Glenfiddich 12 ans",
    category: "caves",
    description: "Servi au verre ou en bouteille.",
    price: 4000,
    priceMax: 40000,
    variants: [{ label: "Au verre", amount: 4000 }, { label: "Bouteille", amount: 40000 }],
    options: ["Glenfiddich 12 ans"],
    tags: ["avec-alcool"],
    image: "/images/menu/glenfiddich-12-ans.jpg",
  },
  {
    slug: "glenfiddich-15-ans-mCGb741",
    name: "Glenfiddich 15 ans",
    category: "caves",
    description: "Servi au verre ou en bouteille.",
    price: 5000,
    priceMax: 55000,
    variants: [{ label: "Au verre", amount: 5000 }, { label: "Bouteille", amount: 55000 }],
    options: ["Glenfiddich 15 ans"],
    tags: ["avec-alcool"],
    image: "/images/menu/glenfiddich-15-ans.jpg",
  },

  // Vins (2)
  {
    slug: "vins-et-mousseux-OVX2VCx",
    name: "Vins et mousseux",
    category: "vins",
    description: "Notre sélection de vins et de vins mousseux, à partir de 7 000 F.",
    price: 7000,
    priceFrom: true,
    tags: ["avec-alcool"],
    image: "/images/menu/vins-et-mousseux.jpg",
  },
  {
    slug: "coupe-de-vin-eGJENip",
    name: "Coupe de vin",
    category: "vins",
    description: "Coupe de vin rouge, blanc ou rosé.",
    price: 2500,
    options: ["Rouge", "Blanc", "Rosé"],
    tags: ["avec-alcool"],
    image: "/images/menu/coupe-de-vin.jpg",
  },

  // Champagnes (3)
  {
    slug: "laurent-perrier-nSpJWF9",
    name: "Laurent Perrier",
    category: "champagnes",
    description: "Champagne Laurent Perrier.",
    price: 50000,
    tags: ["avec-alcool"],
    image: "/images/menu/laurent-perrier.jpg",
  },
  {
    slug: "moet-et-chandon-9HXQNEK",
    name: "Moët et Chandon",
    category: "champagnes",
    description: "Champagne Moët et Chandon.",
    price: 55000,
    tags: ["avec-alcool"],
    image: "/images/menu/moet-et-chandon.jpg",
  },
  {
    slug: "autres-champagnes-pLPtyEY",
    name: "Autres champagnes",
    category: "champagnes",
    description: "Autres champagnes, à partir de 30 000 F.",
    price: 30000,
    priceFrom: true,
    tags: ["avec-alcool"],
    image: "/images/menu/autres-champagnes.jpg",
  },

  // Glaces et desserts (5)
  {
    slug: "glaces-dnmRpiU",
    name: "Glaces",
    category: "glaces",
    description: "Glaces en 1, 2 ou 3 boules. Parfums : vanille, choco, fraise, menthe, raisins et autres.",
    price: 1000,
    priceMax: 2500,
    variants: [{ label: "1 boule", amount: 1000 }, { label: "2 boules", amount: 2000 }, { label: "3 boules", amount: 2500 }],
    options: ["Vanille", "Choco", "Fraise", "Menthe", "Raisins"],
    tags: [],
    image: "/images/menu/glaces.jpg",
  },
  {
    slug: "salade-de-fruits-DRLtWZc",
    name: "Salade de fruits",
    category: "glaces",
    description: "Salade de fruits frais.",
    price: 2000,
    tags: [],
    image: "/images/menu/salade-de-fruits.jpg",
  },
  {
    slug: "gaufres-crepe-cXUKNjK",
    name: "Gaufres / Crêpe",
    category: "glaces",
    description: "Gaufres ou crêpe.",
    price: 3000,
    options: ["Gaufres", "Crêpe"],
    tags: [],
    image: "/images/menu/gaufres-crepe.jpg",
  },
  {
    slug: "milkshake-au-choix-46nvgSp",
    name: "Milkshake au choix",
    category: "glaces",
    description: "Milkshake au parfum de votre choix.",
    price: 2000,
    tags: [],
    image: "/images/menu/milkshake-au-choix.jpg",
  },
  {
    slug: "gateau-de-fete-Lc7Syic",
    name: "Gâteau de fête",
    category: "glaces",
    description: "Gâteau pour vos fêtes et événements, de 12 000 F à 30 000 F selon la taille.",
    price: 12000,
    priceMax: 30000,
    tags: [],
    image: "/images/menu/gateau-de-fete.jpg",
  },

  // Chichas (3)
  {
    slug: "chicha-standard-lxfDf4i",
    name: "Chicha standard",
    category: "chichas",
    description: "Chicha standard. Parfums : pomme, menthe, raisins, citron, cocktail, love.",
    price: 3000,
    options: ["Pomme", "Menthe", "Raisins", "Citron", "Cocktail", "Love"],
    tags: [],
    image: "/images/menu/chicha-standard.jpg",
  },
  {
    slug: "chicha-premium-eOWOfKz",
    name: "Chicha premium",
    category: "chichas",
    description: "Chicha premium. Parfums : pomme, menthe, raisins, citron, cocktail, love.",
    price: 5000,
    options: ["Pomme", "Menthe", "Raisins", "Citron", "Cocktail", "Love"],
    tags: [],
    image: "/images/menu/chicha-premium.jpg",
  },
  {
    slug: "chicha-topluxe-ThI4DOB",
    name: "Chicha Topluxe",
    category: "chichas",
    description: "La chicha Topluxe. Parfums : pomme, menthe, raisins, citron, cocktail, love.",
    price: 7000,
    options: ["Pomme", "Menthe", "Raisins", "Citron", "Cocktail", "Love"],
    tags: ["specialite-maison"],
    image: "/images/menu/chicha-topluxe.jpg",
    featured: true,
  },
];

/* ---------- Utilitaires ---------- */

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} F`;
}

/** Texte de prix prêt à afficher pour un repas. */
export function getPriceLabel(item: MenuItem): string {
  if (item.variants?.length) {
    return item.variants.map((v) => `${v.label} : ${formatPrice(v.amount)}`).join(" / ");
  }
  if (item.priceMax) return `${formatPrice(item.price)} à ${formatPrice(item.priceMax)}`;
  if (item.priceFrom) return `À partir de ${formatPrice(item.price)}`;
  return formatPrice(item.price);
}

export function getItemBySlug(slug: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.slug === slug);
}

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id)!;
}

export function getFeaturedItems(): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.featured);
}

export function getRelatedItems(item: MenuItem, limit = 4): MenuItem[] {
  return MENU_ITEMS.filter((i) => i.category === item.category && i.slug !== item.slug).slice(0, limit);
}

export interface MenuFilters {
  query?: string;
  group?: GroupId;
  category?: CategoryId;
  tags?: Tag[];
  priceRange?: (typeof PRICE_RANGES)[number]["id"];
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function filterMenu(filters: MenuFilters = {}): MenuItem[] {
  const { query, group, category, tags, priceRange } = filters;
  const q = query ? normalize(query.trim()) : "";
  const range = priceRange ? PRICE_RANGES.find((r) => r.id === priceRange) : undefined;

  return MENU_ITEMS.filter((item) => {
    if (category && item.category !== category) return false;
    if (group && getCategory(item.category).group !== group) return false;
    if (tags?.length && !tags.every((t) => item.tags.includes(t))) return false;
    if (range) {
      const max = item.priceMax ?? item.price;
      if (item.price > range.max || max < range.min) return false;
    }
    if (q) {
      const haystack = normalize(
        [item.name, item.description, ...(item.ingredients ?? []), ...(item.options ?? [])].join(" ")
      );
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}