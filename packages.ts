// ÚNICA fonte de preços do site. Valores em centavos. O servidor sempre recalcula a partir daqui.
export type CategoryId = "B" | "AB" | "C";
export type Pkg = { category: CategoryId; lessons: number; priceCents: number };

export const CATEGORIES: Record<CategoryId, { label: string; vehicle: string }> = {
  B: { label: "Categoria B", vehicle: "Somente carro" },
  AB: { label: "Categorias A + B", vehicle: "Moto e carro" },
  C: { label: "Categoria C", vehicle: "Caminhão" },
};

export const PACKAGES: Pkg[] = [
  { category: "B", lessons: 3, priceCents: 75000 },
  { category: "B", lessons: 5, priceCents: 90000 },
  { category: "B", lessons: 10, priceCents: 125000 },
  { category: "B", lessons: 15, priceCents: 172500 },
  { category: "AB", lessons: 3, priceCents: 95000 },
  { category: "AB", lessons: 5, priceCents: 127500 },
  { category: "AB", lessons: 10, priceCents: 172500 },
  { category: "AB", lessons: 15, priceCents: 190000 },
  { category: "C", lessons: 10, priceCents: 135000 },
];
