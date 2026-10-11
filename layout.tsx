import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--f-display" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-body" });

export const metadata: Metadata = {
  title: "Autoescola Reserva VIP | Habilitação em Reserva, PR",
  description:
    "Centro de Formação de Condutores em Reserva, Paraná. Escolha seu pacote de aulas, faça a inscrição online e pague por Pix com R$ 50 de desconto ou no cartão.",
  openGraph: { title: "Autoescola Reserva VIP", locale: "pt_BR", type: "website", images: ["/fachada.jpg"] },
};
export const viewport: Viewport = { themeColor: "#17561f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
