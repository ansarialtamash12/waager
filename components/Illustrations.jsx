// Inline SVG visuals: no external image requests, themed via CSS variables.
const I = { fill: 'none', stroke: 'var(--blue)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
export const icons = {
  forex: <svg viewBox="0 0 24 24" {...I}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>,
  crypto: <svg viewBox="0 0 24 24" {...I}><circle cx="12" cy="12" r="9"/><path d="M9 7v10M9 7h4a2.5 2.5 0 010 5H9m4 0a2.5 2.5 0 010 5H9M11 5v2M11 17v2"/></svg>,
  risk: <svg viewBox="0 0 24 24" {...I}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  ta: <svg viewBox="0 0 24 24" {...I}><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>,
  structure: <svg viewBox="0 0 24 24" {...I}><rect x="3" y="12" width="4" height="8"/><rect x="10" y="7" width="4" height="13"/><rect x="17" y="3" width="4" height="17"/></svg>,
  mind: <svg viewBox="0 0 24 24" {...I}><path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0012 3z"/></svg>,
}

function Coin({ x, y, r, label, fill }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} />
      <circle cx={x} cy={y} r={r - 5} fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
      <text x={x} y={y + r * 0.35} textAnchor="middle" fontSize={r * 0.95} fontWeight="700" fill="#fff">{label}</text>
    </g>
  )
}

export function MarketOrbit() {
  return (
    <svg viewBox="0 0 520 360" role="img" aria-label="Illustration of currencies and crypto orbiting a rising chart">
      <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2b9cf2"/><stop offset="1" stopColor="#0a1f5c"/></linearGradient></defs>
      <ellipse cx="260" cy="180" rx="230" ry="120" fill="none" stroke="var(--line)" strokeDasharray="6 8" />
      <ellipse cx="260" cy="180" rx="150" ry="78" fill="none" stroke="var(--line)" strokeDasharray="6 8" />
      <rect x="170" y="100" width="180" height="150" rx="18" fill="url(#g1)" />
      {[[195, 20], [225, 34], [255, 26], [285, 44], [315, 52]].map(([x, h], i) => (
        <rect key={i} x={x - 8} y={240 - h * 0.5} width="16" height={h * 0.5} rx="3" fill="#fff" opacity=".28" />
      ))}
      <polyline points="190,225 225,190 250,205 285,150 330,125" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <Coin x={70} y={170} r={34} label="€" fill="#2b9cf2" />
      <Coin x={455} y={120} r={34} label="$" fill="#12a36b" />
      <Coin x={400} y={290} r={30} label="₿" fill="#f7931a" />
      <Coin x={130} y={290} r={28} label="£" fill="#0a1f5c" />
      <Coin x={330} y={45} r={24} label="¥" fill="#e5484d" />
      <path transform="translate(240 28)" d="M20 0l4.8 15.2L40 20l-15.2 4.8L20 40l-4.8-15.2L0 20l15.2-4.8z" fill="var(--pink)" />
    </svg>
  )
}

export function PhoneMock() {
  const rows = [['Pips & lots', 'var(--blue)'], ['Stop-loss basics', 'var(--pink)'], ['Crypto wallets', 'var(--up)']]
  return (
    <svg viewBox="0 0 220 400" role="img" aria-label="Sample learning app screen" style={{ maxWidth: 260, margin: '0 auto' }}>
      <rect x="6" y="6" width="208" height="388" rx="30" fill="var(--card)" stroke="var(--ink)" strokeWidth="5" />
      <rect x="85" y="14" width="50" height="8" rx="4" fill="var(--ink)" />
      <text x="24" y="58" fontSize="16" fontWeight="700" fill="var(--ink)">Today’s lesson</text>
      <rect x="24" y="72" width="172" height="86" rx="14" fill="var(--blue)" />
      <polyline points="36,140 70,112 95,126 130,90 180,104" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="24" y="186" fontSize="13" fontWeight="600" fill="var(--ink)">Reading candlesticks</text>
      <rect x="24" y="196" width="172" height="7" rx="4" fill="var(--line)" /><rect x="24" y="196" width="110" height="7" rx="4" fill="var(--pink)" />
      {rows.map(([t, c], i) => (
        <g key={t} transform={`translate(24 ${222 + i * 52})`}>
          <rect width="172" height="42" rx="12" fill="var(--bg2)" />
          <circle cx="22" cy="21" r="11" fill={c} opacity=".85" />
          <text x="42" y="26" fontSize="12" fontWeight="600" fill="var(--ink)">{t}</text>
        </g>
      ))}
    </svg>
  )
}
