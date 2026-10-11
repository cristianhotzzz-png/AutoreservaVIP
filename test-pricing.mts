import assert from "node:assert/strict";
import { PACKAGES } from "../src/lib/packages.ts";
import { quote } from "../src/lib/pricing.ts";

for (const p of PACKAGES) {
  assert.equal(quote(p.category, p.lessons, "card").totalCents, p.priceCents);
  assert.equal(quote(p.category, p.lessons, "pix").totalCents, p.priceCents - 5000);
}
// Exemplos oficiais do briefing
assert.equal(quote("B", 3, "pix").totalCents, 70000);
assert.equal(quote("B", 10, "pix").totalCents, 120000);
assert.equal(quote("AB", 15, "pix").totalCents, 185000);
assert.equal(quote("C", 10, "pix").totalCents, 130000);
assert.throws(() => quote("C", 3, "pix"));
assert.equal(PACKAGES.length, 9);
console.log(`OK: ${PACKAGES.length} pacotes x 2 formas de pagamento + exemplos oficiais`);
