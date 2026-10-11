# Autoescola Reserva VIP — site oficial

## Rodar
    npm install
    npm run dev      # http://localhost:3000
    npm test         # cálculo de todos os pacotes e do desconto Pix

## Estrutura
- `src/lib/packages.ts` — única tabela de preços (centavos). Nunca duplicar valores em outro lugar.
- `src/lib/pricing.ts` — cálculo Pix/cartão. O pagamento deve sempre recalcular no servidor com isto.
- `src/lib/config.ts` — WhatsApp e instrutores.
- `src/app/page.tsx` — página inicial (Fase 1).
- `.env.example` — variáveis das Fases 3 e 4 (segredos só no servidor).

## Status
Fase 1 pronta. Faltam as rotas `/inscricao` e `/acompanhar` (Fase 2 e 5).
