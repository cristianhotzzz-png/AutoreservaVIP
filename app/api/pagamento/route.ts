import { NextResponse } from "next/server";
import { categorias, DESCONTO_PIX } from "../../config";

export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ erro: "Pagamento online ainda não configurado." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
  }

  const nome = String(body.nome ?? "").trim().slice(0, 80);
  const telefone = String(body.telefone ?? "").replace(/\D/g, "").slice(0, 13);
  const turno = String(body.turno ?? "").slice(0, 20);
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

  const preferencia = {
    items: [
      {
        id: `${cat.id}-${pacote.aulas}`,
        title: `${cat.nome} - ${pacote.aulas} aulas (${forma})`,
        description: `Aluno: ${nome} | Tel: ${telefone} | Turno: ${turno}`,
        quantity: 1,
        currency_id: "BRL",
        unit_price: valor,
      },
    ],
    payer: { name: nome },
    metadata: { nome, telefone, turno, categoria: cat.nome, aulas: pacote.aulas, forma },
    external_reference: `RVIP-${Date.now()}`,
    statement_descriptor: "RESERVA VIP",
    back_urls: {
      success: `${site}/?pagamento=sucesso`,
      pending: `${site}/?pagamento=pendente`,
      failure: `${site}/?pagamento=falhou`,
    },
    auto_return: "approved",
    payment_methods:
      forma === "Pix"
        ? { excluded_payment_types: [{ id: "credit_card" }, { id: "debit_card" }, { id: "ticket" }, { id: "atm" }] }
        : { excluded_payment_methods: [{ id: "pix" }], excluded_payment_types: [{ id: "ticket" }, { id: "atm" }] },
  };

  try {
    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(preferencia),
    });
    const data = await res.json();
    if (!res.ok || !data.init_point) {
      console.error("Mercado Pago recusou a preferência:", res.status, JSON.stringify(data));
      return NextResponse.json({ erro: "Não foi possível abrir o pagamento agora." }, { status: 502 });
    }
    return NextResponse.json({ url: data.init_point });
  } catch (e) {
    console.error("Erro ao falar com o Mercado Pago:", e);
    return NextResponse.json({ erro: "Não foi possível abrir o pagamento agora." }, { status: 502 });
  }
}
