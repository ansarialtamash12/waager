# waager.live (Next.js 14, App Router)

Forex & crypto education site. All visuals are inline SVG (no external images).

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure
- `app/layout.jsx`, `app/page.jsx`, `app/globals.css`
- `components/Charts.jsx` – client charts (candles, patterns, heatmap, sessions, etc.)
- `components/Calculator.jsx` – position-size calculator
- `components/Illustrations.jsx` – icons, coin-orbit art, phone mockup

Data shown is sample data. Replace `HeroChart` data with a real API (e.g. Binance WebSocket) when ready.
Educational content only; not financial advice.
