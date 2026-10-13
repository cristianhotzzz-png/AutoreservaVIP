"use client";

import { useEffect, useState } from "react";
import { categorias, instrutores, brl, DESCONTO_PIX, waLink } from "./config";
import fachada from "./fachada.jpg";

const turnos = ["Manhã", "Tarde", "Noite"];

const perguntas = [
  { q: "Como funciona o desconto no Pix?",
    a: "Pagando no Pix você ganha R$ 50 de desconto fixo sobre o valor do pacote. No cartão, vale o preço cheio." },
  { q: "Qual pacote devo escolher?",
    a: "Quem nunca dirigiu costuma precisar de mais aulas. Se estiver em dúvida, chame a equipe no WhatsApp e conte sua experiência." },
  { q: "Taxas públicas, exames médicos e avaliação psicológica estão nos pacotes?",
    a: "Os valores desta página são dos pacotes de aulas. Confirme com a equipe pelo WhatsApp quais custos externos se aplicam ao seu caso." },
  { q: "Em quais horários há aulas?",
    a: "Há instrutores nos turnos da manhã, tarde e noite. Na inscrição você diz o turno que prefere." },
];

export default function Home() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [catId, setCatId] = useState(categorias[0].id);
  const [aulas, setAulas] = useState(categorias[0].pacotes[0].aulas);
  const [pagamento, setPagamento] = useState<"Pix" | "Cartão">("Pix");
  const [turno, setTurno] = useState(turnos[0]);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState("");
  const [pix, setPix] = useState<{ text: string; png?: string } | null>(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("pagamento");
    if (r === "sucesso") setAviso("sucesso");
    else if (r === "pendente") setAviso("pendente");
    else if (r === "falhou") setAviso("falhou");
  }, []);

  const cat = categorias.find((c) => c.id === catId)!;
  const pacote = cat.pacotes.find((p) => p.aulas === aulas) ?? cat.pacotes[0];
  const total = pagamento === "Pix" ? pacote.preco - DESCONTO_PIX : pacote.preco;

  function trocaCategoria(id: string) {
    setCatId(id);
    setAulas(categorias.find((x) => x.id === id)!.pacotes[0].aulas);
  }

  function validar() {
    if (nome.trim().length < 3) { setErro("Digite seu nome completo."); return false; }
    if (telefone.replace(/\D/g, "").length < 10) { setErro("Digite um telefone com DDD."); return false; }
    setErro("");
    return true;
  }

  function enviarWhatsApp() {
    if (!validar()) return;
    const msg =
      `Olá! Quero fazer minha inscrição.\n` +
      `Nome: ${nome.trim()}\nTelefone: ${telefone.trim()}\n` +
      `Categoria: ${cat.nome}\nPacote: ${pacote.aulas} aulas\n` +
      `Pagamento: ${pagamento} (${brl(total)})\nTurno preferido: ${turno}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  }

  async function copiar() {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix.text);
      setCopiado(true);
    } catch {
      setErro("Não consegui copiar. Segure o código e copie manualmente.");
    }
  }

  async function pagarOnline(e: React.FormEvent) {
    e.preventDefault();
    if (!validar()) return;
    setEnviando(true);
    setPix(null);
    setCopiado(false);
    try {
      const res = await fetch("/api/pagamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, telefone, catId, aulas, pagamento, turno }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      if (res.ok && data.pix) {
        setPix(data.pix);
        setEnviando(false);
        return;
      }
      setErro(data.erro || "Não foi possível abrir o pagamento. Tente pelo WhatsApp.");
    } catch {
      setErro("Sem conexão. Tente de novo ou use o WhatsApp.");
    }
    setEnviando(false);
  }

  const campo = "mt-1 w-full rounded-lg border border-verde/30 bg-white p-3 text-base";
  const botaoOuro = "rounded-full bg-ouro px-6 py-3 text-center font-bold text-verde hover:bg-ouro-escuro hover:text-white";
  const botaoBorda = "rounded-full border-2 border-white/70 px-6 py-3 text-center font-bold hover:bg-white/10";

  return (
    <>
      {aviso && (
        <div role="status" className={`px-4 py-3 text-center font-semibold ${aviso === "sucesso" ? "bg-green-100 text-green-900" : aviso === "pendente" ? "bg-yellow-100 text-yellow-900" : "bg-red-100 text-red-900"}`}>
          {aviso === "sucesso" && "Pagamento aprovado! Guarde o comprovante e avise a equipe pelo WhatsApp se precisar."}
          {aviso === "pendente" && "Pagamento pendente. O Pix pode levar alguns minutos para confirmar."}
          {aviso === "falhou" && "O pagamento não foi concluído. Tente de novo ou chame a equipe no WhatsApp."}
        </div>
      )}
      <section className="bg-verde text-white">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 sm:py-16 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Tire sua habilitação em Reserva, do seu jeito.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">
              Escolha seu pacote de aulas, veja o preço e comece a inscrição pelo celular, a qualquer hora.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a href="#inscricao" className={botaoOuro}>Começar minha habilitação</a>
              <a href="#precos" className={botaoBorda}>Ver preços</a>
              <a href={waLink("Olá! Vim pelo site da Autoescola Reserva VIP e tenho uma dúvida.")} target="_blank" rel="noopener noreferrer" className={botaoBorda}>
                Tirar dúvidas
              </a>
            </div>
          </div>
          <img
            src={fachada.src}
            alt="Fachada da Autoescola Reserva VIP, em Reserva (PR)"
            className="w-full rounded-xl border-4 border-ouro/80 shadow-lg"
          />
        </div>
      </section>

      <section id="precos" className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-3xl font-extrabold text-verde">Preços dos pacotes</h2>
        <p className="mt-2 max-w-2xl text-grafite/80">
          Pagando no Pix, você ganha {brl(DESCONTO_PIX)} de desconto em qualquer pacote. No cartão, vale o preço cheio.
        </p>
        <div className="mt-8 space-y-8">
          {categorias.map((c) => (
            <div key={c.id}>
              <h3 className="text-xl font-bold text-verde">
                {c.nome} <span className="font-normal text-grafite/60">({c.descricao})</span>
              </h3>
              <div className="mt-3 overflow-x-auto rounded-xl border border-verde/20">
                <table className="w-full min-w-[420px] text-left">
                  <thead className="bg-verde text-white">
                    <tr><th className="p-3">Pacote</th><th className="p-3">Cartão</th><th className="p-3">Pix</th></tr>
                  </thead>
                  <tbody>
                    {c.pacotes.map((p) => (
                      <tr key={p.aulas} className="border-t border-verde/10">
                        <td className="p-3 font-semibold">{p.aulas} aulas</td>
                        <td className="p-3">{brl(p.preco)}</td>
                        <td className="p-3 font-bold text-verde">{brl(p.preco - DESCONTO_PIX)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-verde-fundo">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-2xl font-extrabold text-verde">Nossos instrutores</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {instrutores.map((i) => (
              <li key={i.nome} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                <span className="font-bold text-verde">{i.nome}</span>
                <span className="text-sm text-grafite/70">{i.turnos}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="inscricao" className="mx-auto max-w-xl px-4 py-12">
        <h2 className="text-3xl font-extrabold text-verde">Começar minha habilitação</h2>
        <p className="mt-2 text-grafite/80">
          Escolha seu pacote e pague online, ou envie a inscrição para a equipe pelo WhatsApp.
        </p>
        <form onSubmit={pagarOnline} className="mt-8 space-y-5">
          <label className="block font-semibold">
            Nome completo
            <input className={campo} value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />
          </label>
          <label className="block font-semibold">
            Telefone com DDD
            <input className={campo} value={telefone} onChange={(e) => setTelefone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="(42) 90000-0000" />
          </label>
          <label className="block font-semibold">
            Categoria
            <select className={campo} value={catId} onChange={(e) => trocaCategoria(e.target.value)}>
              {categorias.map((c) => (<option key={c.id} value={c.id}>{c.nome} ({c.descricao})</option>))}
            </select>
          </label>
          <label className="block font-semibold">
            Pacote
            <select className={campo} value={aulas} onChange={(e) => setAulas(Number(e.target.value))}>
              {cat.pacotes.map((p) => (<option key={p.aulas} value={p.aulas}>{p.aulas} aulas, {brl(p.preco)}</option>))}
            </select>
          </label>
          <fieldset>
            <legend className="font-semibold">Forma de pagamento</legend>
            <div className="mt-1 grid grid-cols-2 gap-3">
              {(["Pix", "Cartão"] as const).map((f) => (
                <label key={f} className={`cursor-pointer rounded-lg border-2 p-3 text-center font-semibold ${pagamento === f ? "border-verde bg-verde-fundo" : "border-verde/20"}`}>
                  <input type="radio" name="pagamento" className="sr-only" checked={pagamento === f} onChange={() => setPagamento(f)} />
                  {f}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block font-semibold">
            Turno preferido
            <select className={campo} value={turno} onChange={(e) => setTurno(e.target.value)}>
              {turnos.map((t) => (<option key={t}>{t}</option>))}
            </select>
          </label>
          <div className="rounded-xl bg-verde-fundo p-4">
            <p className="text-sm text-grafite/70">Valor no {pagamento}</p>
            <p className="text-3xl font-extrabold text-verde">{brl(total)}</p>
          </div>
          {erro && <p role="alert" className="font-semibold text-red-700">{erro}</p>}
          <button type="submit" disabled={enviando} className="w-full rounded-full bg-ouro px-6 py-3 text-lg font-bold text-verde hover:bg-ouro-escuro hover:text-white disabled:opacity-60">
            {enviando ? "Abrindo pagamento..." : `Pagar online (${pagamento})`}
          </button>
          <button type="button" onClick={enviarWhatsApp} className="w-full rounded-full border-2 border-verde px-6 py-3 font-bold text-verde hover:bg-verde-fundo">
            Prefiro combinar pelo WhatsApp
          </button>
        </form>

        {pix && (
          <div className="mt-8 rounded-xl border-2 border-verde bg-verde-fundo p-5 text-center">
            <p className="text-lg font-extrabold text-verde">Pague {brl(total)} no Pix</p>
            <p className="mt-1 text-sm text-grafite/80">
              Abra o app do seu banco, escolha Pix e leia o QR Code ou use o copia e cola.
            </p>
            {pix.png && (
              <img src={pix.png} alt="QR Code do Pix" className="mx-auto mt-4 h-56 w-56 rounded-lg bg-white p-2" />
            )}
            <p className="mt-4 break-all rounded-lg bg-white p-3 text-left text-xs">{pix.text}</p>
            <button type="button" onClick={copiar} className="mt-3 w-full rounded-full bg-ouro px-6 py-3 font-bold text-verde hover:bg-ouro-escuro hover:text-white">
              {copiado ? "Código copiado!" : "Copiar código Pix"}
            </button>
            <p className="mt-4 text-sm text-grafite/80">Depois de pagar, avise a equipe para confirmar sua matrícula.</p>
            <a
              href={waLink(`Olá! Paguei no Pix o pacote ${pacote.aulas} aulas (${cat.nome}). Nome: ${nome.trim()}. Telefone: ${telefone.trim()}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-bold text-verde underline"
            >
              Avisar no WhatsApp
            </a>
          </div>
        )}
      </section>

      <section id="duvidas" className="mx-auto max-w-3xl px-4 pb-14">
        <h2 className="mb-6 text-2xl font-extrabold text-verde">Dúvidas frequentes</h2>
        <div className="divide-y divide-verde/15 rounded-xl border border-verde/15 bg-white">
          {perguntas.map((p) => (
            <details key={p.q} className="p-4">
              <summary className="cursor-pointer font-semibold text-verde">{p.q}</summary>
              <p className="mt-2 text-grafite/80">{p.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
