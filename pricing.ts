import { PACKAGES, type CategoryId } from "./packages.ts";

export const PIX_DISCOUNT_CENTS = 5000;
export type Method = "pix" | "card";

export const brl = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function quote(category: CategoryId, lessons: number, method: Method) {
  const pkg = PACKAGES.find((p) => p.category === category && p.lessons === lessons);
  if (!pkg) throw new Error("Pacote inexistente");
  const discountCents = method === "pix" ? PIX_DISCOUNT_CENTS : 0;
  return { ...pkg, method, discountCents, totalCents: pkg.priceCents - discountCents };
}
