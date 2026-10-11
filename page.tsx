import { CATEGORIES, PACKAGES, type CategoryId } from "@/lib/packages";
import { INSTRUCTORS, WHATSAPP_LABEL, waLink } from "@/lib/config";
import { brl, quote } from "@/lib/pricing";

const btn = "inline-flex min-h-14 items-center justify-center rounded-lg px-6 text-lg font-semibold transition-colors";
const faq = [
  ["Quanto custa tirar minha habilitação?", "Depende da categoria e do número de aulas. Os preços estão na seção Preços e pacotes, sem taxa escondida da autoescola."],
  ["O que está incluído no preço?", "Honorários da secretaria, combustível, instrutor, veículo para o teste e demais serviços previstos no pacote."],
  ["Quais valores são pagos separadamente?", "Taxas públicas, exames médicos, avaliação psicológica e outros serviços de terceiros não estão incluídos, a menos que a equipe confirme o contrário por escrito."],
  ["Como funciona o desconto no Pix?", "O Pix tem R$ 50 de desconto fixo em qualquer pacote. No cartão vale o preço normal, com parcelamento conforme as condições mostradas antes de você confirmar."],
  ["O que acontece depois que eu pago?", "Você recebe um protocolo, e a equipe confere seus dados e avisa os próximos passos. A inscrição só é confirmada depois dessa conferência."],
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-forest-deep">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
          <a href="#topo" aria-label="Autoescola Reserva VIP"><img src="/logo.jpg" alt="Autoescola Reserva VIP" width={1024} height={540} className="h-11 w-auto rounded" /></a>
          <a href="/acompanhar" className="text-sm font-medium text-white underline underline-offset-4">Acompanhar pedido</a>
        </div>
      </header>

      <main id="topo">
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <img src="/fachada.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
          <div className="hazard absolute inset-y-0 left-0 w-3 sm:w-5" aria-hidden />
          <div className="mx-auto max-w-5xl px-6 py-14 sm:py-24">
            <p className="font-display text-xl font-semibold text-gold">Centro de Formação de Condutores · Reserva, PR</p>
            <h1 className="mt-3 max-w-2xl font-display text-5xl font-bold leading-[1.02] sm:text-7xl">Sua habilitação começa aqui.</h1>
            <p className="mt-5 max-w-lg text-lg text-white/90">Faça sua inscrição online, escolha seu pacote e pague sem sair de casa.</p>
            <div className="mt-8 flex max-w-md flex-col gap-3">
              <a href="/inscricao" className={`${btn} bg-gold text-forest-deep hover:bg-gold-deep`}>Começar minha habilitação</a>
              <div className="grid grid-cols-2 gap-3">
                <a href="#precos" className={`${btn} border border-white/60 hover:bg-white/10`}>Ver preços</a>
                <a href="#duvidas" className={`${btn} border border-white/60 hover:bg-white/10`}>Tirar dúvidas</a>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/80">Pix com R$ 50 de desconto · Cartão com parcelamento</p>
          </div>
        </section>

        <section id="precos" className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="font-display text-4xl font-bold text-forest">Preços e pacotes</h2>
          <p className="mt-2 max-w-xl text-neutral-700">No Pix, R$ 50 de desconto em qualquer pacote. No cartão, o valor total é o preço normal.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {(Object.keys(CATEGORIES) as CategoryId[]).map((c) => (
              <article key={c} className="rounded-xl border border-forest/20 bg-forest-soft p-5">
                <h3 className="font-display text-2xl font-bold text-forest">{CATEGORIES[c].label}</h3>
                <p className="text-neutral-700">{CATEGORIES[c].vehicle}</p>
                <ul className="mt-4 divide-y divide-forest/15">
                  {PACKAGES.filter((p) => p.category === c).map((p) => (
                    <li key={p.lessons} className="flex items-baseline justify-between gap-3 py-3">
                      <span className="font-semibold">{p.lessons} aulas</span>
                      <span className="text-right">
                        <span className="block text-sm text-neutral-600 line-through decoration-neutral-400">{brl(p.priceCents)}</span>
                        <span className="font-display text-2xl font-bold text-forest">{brl(quote(c, p.lessons, "pix").totalCents)}</span>
                        <span className="block text-xs text-neutral-600">no Pix</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-lg border-l-4 border-gold bg-neutral-50 p-4 text-sm text-neutral-800">
            Os valores cobrem os serviços da autoescola: secretaria, combustível, instrutor e veículo para o teste. Taxas públicas, exames médicos e avaliação psicológica não estão incluídos.
          </p>
        </section>

        <section className="bg-neutral-50 py-14">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="font-display text-4xl font-bold text-forest">Como começar</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {["Escolha a categoria e o pacote", "Preencha seu cadastro", "Confira os valores e pague por Pix ou cartão", "Receba o protocolo e acompanhe sua inscrição"].map((t, i) => (
                <li key={t} className="rounded-lg bg-white p-4 shadow-sm"><span className="font-display text-3xl font-bold text-gold-deep">{i + 1}</span><p className="mt-1 font-medium">{t}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="font-display text-4xl font-bold text-forest">Nossos instrutores</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {INSTRUCTORS.map((i) => (
              <li key={i.name} className="flex items-center gap-3 border-l-4 border-gold pl-3">
                <div><p className="font-display text-xl font-bold">{i.name}</p><p className="text-sm text-neutral-600">{i.period}</p></div>
              </li>
            ))}
          </ul>
        </section>

        <section id="duvidas" className="bg-forest-soft py-14">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="font-display text-4xl font-bold text-forest">Dúvidas frequentes</h2>
            <div className="mt-6 space-y-3">
              {faq.map(([q, a]) => (
                <details key={q} className="rounded-lg bg-white p-4 open:shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold">{q}</summary>
                  <p className="mt-2 text-neutral-700">{a}</p>
                </details>
              ))}
            </div>
            <a href={waLink()} className={`${btn} mt-6 w-full bg-forest text-white hover:bg-forest-deep sm:w-auto`}>Falar com um atendente</a>
          </div>
        </section>
      </main>

      <footer className="bg-forest-deep py-8 text-center text-white">
        <img src="/logo.jpg" alt="Autoescola Reserva VIP" width={1024} height={540} className="mx-auto h-16 w-auto rounded" />
        <p className="mt-3 text-sm">Reserva, Paraná · WhatsApp {WHATSAPP_LABEL}</p>
      </footer>

      <a href={waLink()} aria-label="Chamar no WhatsApp" className="fixed bottom-4 right-4 z-30 rounded-full bg-[#25d366] px-5 py-3 font-semibold text-white shadow-lg">WhatsApp</a>
    </>
  );
}
