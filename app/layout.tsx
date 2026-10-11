import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { WHATSAPP_LABEL, waLink } from "./config";

const font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-main" });

export const metadata: Metadata = {
  title: "Autoescola Reserva VIP | Reserva, PR",
  description:
    "Faça sua habilitação na Autoescola Reserva VIP, em Reserva (PR). Veja os pacotes, os preços e comece sua inscrição pelo celular.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0f3d2e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const duvida = waLink("Olá! Vim pelo site da Autoescola Reserva VIP e tenho uma dúvida.");
  return (
    <html lang="pt-BR">
      <body className={`${font.variable} font-sans antialiased`}>
        <header className="sticky top-0 z-40 bg-verde text-white shadow">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <a href="#topo" className="text-lg font-extrabold leading-tight">
              Autoescola <span className="text-ouro">Reserva VIP</span>
            </a>
            <nav className="flex items-center gap-4 text-sm font-semibold">
              <a href="#precos" className="hover:text-ouro">Preços</a>
              <a href="#inscricao" className="rounded-full bg-ouro px-4 py-2 text-verde hover:bg-ouro-escuro hover:text-white">
                Inscrever-se
              </a>
            </nav>
          </div>
        </header>

        <main id="topo">{children}</main>

        <footer className="bg-verde text-white">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm">
            <p className="text-base font-bold">Autoescola Reserva VIP</p>
            <p className="mt-1 text-white/80">Reserva, Paraná</p>
            <p className="mt-3">
              WhatsApp:{" "}
              <a className="font-semibold text-ouro underline" href={duvida}>{WHATSAPP_LABEL}</a>
            </p>
            <p className="mt-6 text-xs text-white/60">© Autoescola Reserva VIP. Todos os direitos reservados.</p>
          </div>
        </footer>

        <a
          href={duvida}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="fixed bottom-4 right-4 z-50 rounded-full bg-[#25d366] px-5 py-3 font-bold text-white shadow-lg hover:brightness-95"
        >
          WhatsApp
        </a>
      </body>
    </html>
  );
}
