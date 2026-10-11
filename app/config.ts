export const WHATSAPP = "5542999230294";
export const WHATSAPP_LABEL = "(42) 99923-0294";
export const DESCONTO_PIX = 50;

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export type Pacote = { aulas: number; preco: number };
export type Categoria = { id: string; nome: string; descricao: string; pacotes: Pacote[] };

export const categorias: Categoria[] = [
  { id: "B", nome: "Categoria B", descricao: "Carro",
    pacotes: [{ aulas: 3, preco: 750 }, { aulas: 5, preco: 900 }, { aulas: 10, preco: 1250 }, { aulas: 15, preco: 1725 }] },
  { id: "AB", nome: "Categoria A+B", descricao: "Moto e carro",
    pacotes: [{ aulas: 3, preco: 950 }, { aulas: 5, preco: 1275 }, { aulas: 10, preco: 1725 }, { aulas: 15, preco: 1900 }] },
  { id: "C", nome: "Categoria C", descricao: "Caminhão",
    pacotes: [{ aulas: 10, preco: 1350 }] },
];

export const instrutores = [
  { nome: "Cristian Hotz", turnos: "Manhã e tarde" },
  { nome: "João Hotz", turnos: "Manhã e tarde" },
  { nome: "Juceli", turnos: "Tarde" },
  { nome: "Bruno Oliniki", turnos: "Noite" },
];
