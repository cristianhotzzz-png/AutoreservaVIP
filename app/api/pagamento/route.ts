import { NextResponse } from "next/server";
import { categorias, DESCONTO_PIX } from "../../config";

type Link = { rel?: string; href?: string };

export async function POST(req: Request) {
  const token = process.env.PAGBANK_TOKEN;
  if (!token) {
    return NextResponse.json({ erro: "Pagamento online ainda não configurado." }, { status: 503 });
  }
  const base =
    process.env.PAGBANK_SANDBOX === "true" ? "https://sandbox.api.pagseguro.com" : "https://api.pagseguro.com";

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
  }

  const nome = String(body.nome ?? "").trim().slice(0, 80);
  const telefone = String(body.telefone ?? "").replace(/\D/g, "").slice(0, 13);
  const forma = body.pagamento === "Pix" ? "Pix" : "Cartão";
  const cat = categorias.find((c) => c.id === body.catId);
  const pacote = cat?.pacotes.find((p) => p.aulas === Number(body.aulas));

  if (nome.length < 3 || telefone.length < 10 || !cat || !pacote) {
    return NextResponse.json({ erro: "Confira os dados da inscrição." }, { status: 400 });
  }

  const valor = forma === "Pix" ? pacote.preco - DESCONTO_PIX : pacote.preco;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const site = process.env.SITE_URL || `${proto}://${host}`;

  const checkout = {
    reference_id: `RVIP-${telefone}-${Date.now()}`,
    items: [
      {
        reference_id: `${cat.id}-${pacote.aulas}`,
        name: `${cat.nome} - ${pacote.aulas} aulas - ${nome}`.slice(0, 64),
        quantity: 1,
        unit_amount: Math.round(valor * 100),
      },
    ],
    payment_methods: [{ type: forma === "Pix" ? "PIX" : "CREDIT_CARD" }],
    redirect_url: `${site}/?pagamento=sucesso`,
  };

  const falha = { erro: "Não foi possível abrir o pagamento agora." };
  try {
    const res = await fetch(`${base}/checkouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(checkout),
    });
    const data = await res.json();
    const pay = ((data?.links ?? []) as Link[]).find((l) => l.rel === "PAY")?.href;
    if (!res.ok || !pay) {
      console.error("PagBank recusou o checkout:", res.status, JSON.stringify(data));
      return NextResponse.json(falha, { status: 502 });
    }
    return NextResponse.json({ url: pay });
  } catch (e) {
    console.error("Erro ao falar com o PagBank:", e);
    return NextResponse.json(falha, { status: 502 });
  }
}
