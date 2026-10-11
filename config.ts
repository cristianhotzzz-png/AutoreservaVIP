// Configuração central do contato. Troque aqui ou via variável de ambiente.
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "5542999230294";
export const WHATSAPP_LABEL = "(42) 99923-0294";
export const waLink = (msg = "Olá! Quero informações sobre a habilitação na Autoescola Reserva VIP.") =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
export const INSTRUCTORS = [
  { name: "Cristian Hotz", period: "Manhã e tarde" },
  { name: "João Hotz", period: "Manhã e tarde" },
  { name: "Juceli", period: "Tarde" },
  { name: "Bruno Oliniki", period: "Noite" },
];
