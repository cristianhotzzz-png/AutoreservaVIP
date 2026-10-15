"use client";

import { useEffect, useRef, useState } from "react";
import { categorias, instrutores, brl, DESCONTO_PIX, waLink } from "./config";
import fachada from "./fachada.jpg";
import aprovado1 from "./aprovado1.jpg";
import aprovado2 from "./aprovado2.jpg";
import aprovado3 from "./aprovado3.jpg";
import aprovado4 from "./aprovado4.jpg";
import aprovado5 from "./aprovado5.jpg";
import aprovado6 from "./aprovado6.jpg";
import aprovado7 from "./aprovado7.jpg";
import aprovado8 from "./aprovado8.jpg";
import aprovado9 from "./aprovado9.jpg";

// Para acrescentar ou tirar fotos de alunos aprovados, mexa só nesta lista.
const aprovados = [aprovado1, aprovado2, aprovado3, aprovado4, aprovado5, aprovado6, aprovado7, aprovado8, aprovado9].map((f) => f.src);

// O pagamento online liga quando a variável NEXT_PUBLIC_PAGAMENTO_ONLINE = true estiver no Render.
const PAGAMENTO_ONLINE = process.env.NEXT_PUBLIC_PAGAMENTO_ONLINE === "true";

const turnos = ["Manhã", "Tarde", "Noite"];

const brl2 = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const detranPorCategoria: Record<string, number> = { B: 199.76, AB: 253.96, C: 145 };

const custosExternos = (detran: number) => [
  { nome: "Exame Psicotécnico", valor: 222.14, clinica: true },
  { nome: "Aptidão Física e Mental", valor: 101.65, clinica: true },
  { nome: "Exame toxicológico", valor: 100, clinica: true },
  { nome: "Taxa Detran", valor: detran, clinica: false },
];

const perguntas = [
  { q: "Como funciona o desconto no Pix?",
    a: "Pagando no Pix você ganha R$ 50 de desconto fixo sobre o valor do pacote. No cartão, vale o preço cheio." },
  { q: "Qual pacote devo escolher?",
    a: "Quem nunca dirigiu costuma precisar de mais aulas. Se estiver em dúvida, chame a equipe no WhatsApp e conte sua experiência." },
  { q: "Exames e taxas do Detran estão incluídos nos pacotes?",
    a: "Não. Os valores dos pacotes são das aulas. Os exames e a taxa do Detran têm valores à parte, que aparecem logo abaixo de cada tabela de preços. Para mais opções de pagamento, fale com a equipe pelo WhatsApp." },
  { q: "Em quais horários há aulas?",
    a: "Há instrutores nos turnos da manhã, tarde e noite. Na inscrição você diz o turno que prefere." },
  { q: "Como funciona o exame do psicotécnico?",
    a: "É um procedimento realizado por psicólogos credenciados para verificar se a pessoa possui as condições mentais, emocionais e comportamentais necessárias para exercer determinadas atividades com segurança, como conduzir um veículo." },
  { q: "Como são realizadas as aulas teóricas?",
    a: "Na modalidade EAD, com aulas gravadas pela nossa equipe!" },
  { q: "A prova do Detran é muito difícil de passar?",
    a: "Estudando bem, focando e se esforçando, não é difícil!" },
  { q: "O exame prático não tem mais baliza. Quais são os principais pontos que devo aprender?",
    a: "Aqui na nossa autoescola ensinamos a baliza para todos os alunos, independente do exame prático!" },
];

function Aprovados({ fotos }: { fotos: string[] }) {
  const trilho = useRef<HTMLDivElement>(null);
  const pausaAte = useRef(0);
  const [atual, setAtual] = useState(0);
  const n = fotos.length;

  function ir(i: number) {
    const el = trilho.current;
    if (!el) return;
    el.scrollTo({ left: ((i + n) % n) * el.clientWidth, behavior: "smooth" });
  }

  function pausar() {
    pausaAte.current = Date.now() + 8000;
  }

  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (Date.now() < pausaAte.current) return;
      const el = trilho.current;
      if (!el) return;
      ir(Math.round(el.scrollLeft / el.clientWidth) + 1);
    }, 4000);
    return () => clearInterval(t);
  });

  if (n === 0) return null;

  return (
    <section id="aprovados" className="bg-verde text-white">
      <div className="mx-auto max-w-5xl px-4 py-12 text-center">
        <h2 className="text-3xl font-extrabold text-ouro">Alunos aprovados</h2>
        <p className="mt-2 text-white/85">Você pode ser o próximo.</p>

        <div className="relative mx-auto mt-8 w-full max-w-sm" onPointerDown={pausar} onMouseEnter={pausar}>
          <div
            ref={trilho}
            onScroll={(e) => setAtual(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
            className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl border-4 border-ouro shadow-lg [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {fotos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Aluno aprovado na Autoescola Reserva VIP, foto ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="aspect-square w-full shrink-0 snap-center object-cover"
              />
            ))}
          </div>
          {n > 1 && (
            <>
              <button type="button" aria-label="Foto anterior" onClick={() => { pausar(); ir(atual - 1); }} className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-verde shadow">
                ‹
              </button>
              <button type="button" aria-label="Próxima foto" onClick={() => { pausar(); ir(atual + 1); }} className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-verde shadow">
                ›
              </button>
            </>
          )}
        </div>

        {n > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {fotos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para a foto ${i + 1}`}
                onClick={() => { pausar(); ir(i); }}
                className={`h-2.5 rounded-full transition-all ${i === atual ? "w-6 bg-ouro" : "w-2.5 bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

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

  async function pagarOnline(e: React.FormEvent) {
    e.preventDefault();
    if (!validar()) return;
    setEnviando(true);
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
              CNH Fácil, Rápida e Barata!
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">
              Somente uma Autoescola de verdade ensina a dirigir e a viver!
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
              <div className="mt-3 rounded-xl bg-verde-fundo p-4">
                <p className="font-bold text-verde">Além do pacote (valores à parte)</p>
                <ul className="mt-2 divide-y divide-verde/10">
                  {custosExternos(detranPorCategoria[c.id] ?? 0).map((i) => (
                    <li key={i.nome} className="flex items-baseline justify-between gap-4 py-2">
                      <span>
                        {i.nome}
                        {i.clinica && <span className="block text-xs text-grafite/60">Pago diretamente na clínica</span>}
                      </span>
                      <span className="shrink-0 font-bold text-verde">{brl2(i.valor)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-grafite/70">
                  Entre em contato para mais opções de pagamento dos exames e taxas.
                </p>
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
              <li key={i.nome} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
                <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-verde text-lg font-extrabold text-ouro">
                  {i.nome.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                </span>
                <span className="flex flex-col">
                  <span className="font-bold text-verde">{i.nome}</span>
                  <span className="text-sm text-grafite/70">{i.turnos}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Aprovados fotos={aprovados} />

      <section id="inscricao" className="mx-auto max-w-xl px-4 py-12">
        <h2 className="text-3xl font-extrabold text-verde">Começar minha habilitação</h2>
        <p className="mt-2 text-grafite/80">
          {PAGAMENTO_ONLINE ? "Escolha seu pacote e pague online, ou envie a inscrição para a equipe pelo WhatsApp." : "Escolha seu pacote e envie a inscrição para a equipe pelo WhatsApp."}
        </p>
        <form onSubmit={PAGAMENTO_ONLINE ? pagarOnline : (e) => { e.preventDefault(); enviarWhatsApp(); }} className="mt-8 space-y-5">
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
          {PAGAMENTO_ONLINE ? (
            <>
              <button type="submit" disabled={enviando} className="w-full rounded-full bg-ouro px-6 py-3 text-lg font-bold text-verde hover:bg-ouro-escuro hover:text-white disabled:opacity-60">
                {enviando ? "Abrindo pagamento..." : `Pagar online (${pagamento})`}
              </button>
              <button type="button" onClick={enviarWhatsApp} className="w-full rounded-full border-2 border-verde px-6 py-3 font-bold text-verde hover:bg-verde-fundo">
                Prefiro combinar pelo WhatsApp
              </button>
            </>
          ) : (
            <button type="submit" className="w-full rounded-full bg-ouro px-6 py-3 text-lg font-bold text-verde hover:bg-ouro-escuro hover:text-white">
              Enviar inscrição pelo WhatsApp
            </button>
          )}
        </form>
      </section>

      <section id="onde" className="bg-verde-fundo">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-extrabold text-verde">Onde estamos</h2>
          <p className="mt-3 text-lg font-semibold">Avenida Coronel Rogério Borba, 1297 - Centro</p>
          <p className="text-grafite/70">Reserva, Paraná</p>
          <ul className="mt-5 space-y-2">
            <li className="flex justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
              <span className="font-bold text-verde">Segunda a sexta</span>
              <span>08:00 às 18:00</span>
            </li>
            <li className="flex justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
              <span className="font-bold text-verde">Sábado (pelo WhatsApp)</span>
              <span>08:00 às 12:00</span>
            </li>
          </ul>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Avenida+Coronel+Rog%C3%A9rio+Borba%2C+1297%2C+Centro%2C+Reserva%2C+PR"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-verde px-6 py-3 font-bold text-white hover:bg-verde-claro"
          >
            Como chegar
          </a>
        </div>
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

      <section className="bg-verde text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="text-3xl font-extrabold text-ouro sm:text-4xl">Sua liberdade começa aqui!</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
            Conquiste sua CNH com confiança, segurança e o apoio de quem acredita no seu potencial.
          </p>
          <a href="#inscricao" className="mt-8 inline-block rounded-full bg-ouro px-8 py-3 text-lg font-bold text-verde hover:bg-ouro-escuro hover:text-white">
            Começar minha habilitação
          </a>
        </div>
      </section>
    </>

  );
}
