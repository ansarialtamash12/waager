'use client'
import { Fragment, useEffect, useState } from 'react'

const T = ({ x, y, children, a = 'middle', s = 12, c = 'var(--mut)' }) => (
  <text x={x} y={y} textAnchor={a} fontSize={s} fill={c}>{children}</text>
)

function rng(seed) { return () => (seed = (seed * 16807) % 2147483647, (seed - 1) / 2147483646) }
const pairs = [
  { n: 'EUR/USD', b: 1.1742, v: 0.0016, d: 4, s: 11 },
  { n: 'GBP/USD', b: 1.3481, v: 0.002, d: 4, s: 23 },
  { n: 'BTC/USD', b: 104285, v: 700, d: 0, s: 37 },
  { n: 'XAU/USD', b: 3876.2, v: 14, d: 2, s: 51 },
]
function makeCandles(p) {
  const r = rng(p.s), a = []
  let c = p.b * (p.n === 'BTC/USD' ? 0.965 : 0.988)
  for (let i = 0; i < 40; i++) {
    const o = c, cl = o + (r() - 0.44) * p.v * 2
    a.push([o, Math.max(o, cl) + r() * p.v, Math.min(o, cl) - r() * p.v, cl]); c = cl
  }
  return a
}

export function HeroChart() {
  const [i, setI] = useState(0)
  const [d, setD] = useState(() => makeCandles(pairs[0]))
  const p = pairs[i]
  useEffect(() => { setD(makeCandles(p)) }, [i])
  // gentle simulated tick on the last candle (sample data only)
  useEffect(() => {
    const id = setInterval(() => setD(old => {
      const n = old.slice(), l = [...n[n.length - 1]], nc = l[3] + (Math.random() - 0.5) * p.v * 0.6
      l[3] = nc; l[1] = Math.max(l[1], nc); l[2] = Math.min(l[2], nc); n[n.length - 1] = l; return n
    }), 1500)
    return () => clearInterval(id)
  }, [i])

  const W = 560, H = 280, pad = 24
  const hi = Math.max(...d.map(x => x[1])), lo = Math.min(...d.map(x => x[2]))
  const y = v => pad + (hi - v) / (hi - lo) * (H - 2 * pad), w = W / d.length
  const ma = d.map((_, k) => k < 9 ? null : `${k * w + w / 2},${y(d.slice(k - 9, k + 1).reduce((a, b) => a + b[3], 0) / 10)}`).filter(Boolean)
  const last = d[d.length - 1][3], ch = (last - d[0][0]) / d[0][0] * 100
  return (
    <div className="panel" aria-label="Sample market chart">
      <div className="float a"><span className="up">▲</span> Trend up</div>
      <div className="tick">
        <div><span className="small">{p.n} · sample data</span><br />
          <strong>{last.toLocaleString('en', { minimumFractionDigits: p.d, maximumFractionDigits: p.d })}</strong>{' '}
          <span className={ch >= 0 ? 'up' : 'dn'}>{ch >= 0 ? '+' : ''}{ch.toFixed(2)}%</span></div>
        <div className="tabs" role="group" aria-label="Choose market">
          {pairs.map((q, k) => <button key={q.n} aria-pressed={k === i} onClick={() => setI(k)}>{q.n}</button>)}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Candlestick chart with moving average">
        {[0, 1, 2, 3, 4].map(k => <line key={k} x1="0" x2={W} y1={pad + k * (H - 2 * pad) / 4} y2={pad + k * (H - 2 * pad) / 4} stroke="var(--line)" />)}
        {d.map((c, k) => {
          const x = k * w + w / 2, col = c[3] >= c[0] ? 'var(--up)' : 'var(--dn)'
          return <g key={k}><line x1={x} x2={x} y1={y(c[1])} y2={y(c[2])} stroke={col} strokeWidth="1.5" />
            <rect x={x - w * .32} y={Math.min(y(c[0]), y(c[3]))} width={w * .64} height={Math.max(2, Math.abs(y(c[0]) - y(c[3])))} fill={col} rx="1.5" /></g>
        })}
        <polyline points={ma.join(' ')} fill="none" stroke="var(--pink)" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <div className="legend"><span><i style={{ background: 'var(--up)' }} />Up</span><span><i style={{ background: 'var(--dn)' }} />Down</span><span><i style={{ background: 'var(--pink)' }} />10-period average</span></div>
      <div className="float b">Sample data, not live prices</div>
    </div>
  )
}

export function Patterns() {
  const cs = (x, o, h, l, c, col) => <g key={x}><line x1={x} x2={x} y1={h} y2={l} stroke={col} strokeWidth="2" /><rect x={x - 9} y={Math.min(o, c)} width="18" height={Math.abs(o - c)} fill={col} rx="2" /></g>
  const P = [
    ['Bullish engulfing', 'A large green candle swallows the prior red one. Often read as buyers taking control after a dip.',
      <>{cs(20, 35, 25, 60, 50, 'var(--dn)')}{cs(60, 50, 40, 95, 80, 'var(--dn)')}{cs(110, 95, 35, 100, 40, 'var(--up)')}</>],
    ['Support and resistance', 'Price stalls at a ceiling and bounces off a floor. Breaks can signal a new range.',
      <><line x1="8" x2="152" y1="30" y2="30" stroke="var(--dn)" strokeDasharray="5" /><line x1="8" x2="152" y1="95" y2="95" stroke="var(--up)" strokeDasharray="5" />
        <polyline points="10,90 35,35 60,90 85,38 110,92 135,32" fill="none" stroke="var(--blue)" strokeWidth="3" strokeLinejoin="round" /></>],
    ['Uptrend', 'Higher highs and higher lows. Traders look for pullbacks instead of chasing price.',
      <><polyline points="8,105 35,70 50,85 80,48 95,62 130,22" fill="none" stroke="var(--blue)" strokeWidth="3" strokeLinejoin="round" /><line x1="8" y1="108" x2="140" y2="50" stroke="var(--pink)" strokeWidth="2" strokeDasharray="5" /></>],
  ]
  return <div className="grid g3">{P.map(([t, d, g]) => (
    <div className="card" key={t}>
      <svg viewBox="0 0 160 120" style={{ background: 'var(--bg2)', borderRadius: 12, marginBottom: 12 }} role="img" aria-label={`${t} diagram`}>{g}</svg>
      <h3>{t}</h3><p style={{ margin: 0 }}>{d}</p>
    </div>))}</div>
}

export function Compare() {
  const rows = [['Hours', 5, 10], ['Volatility', 3, 9], ['Leverage', 9, 5], ['Regulation', 9, 4], ['Liquidity', 10, 6]]
  return (<>
    <svg viewBox="0 0 400 190" role="img" aria-label="Bar comparison of forex and crypto">
      {rows.map(([n, f, c], i) => { const y = 14 + i * 34; return <g key={n}><T x="0" y={y + 13} a="start" s={13} c="var(--ink)">{n}</T>
        <rect x="90" y={y} width={f * 30} height="11" rx="5" fill="var(--blue)" /><rect x="90" y={y + 13} width={c * 30} height="11" rx="5" fill="var(--pink)" /></g> })}
    </svg>
    <div className="legend"><span><i style={{ background: 'var(--blue)' }} />Forex</span><span><i style={{ background: 'var(--pink)' }} />Crypto</span></div></>)
}

export function Drawdown() {
  const X = a => 40 + a * 3.4, Y = v => 170 - v * 1.3, pts = []
  for (let l = 0; l <= 80; l += 2) pts.push(`${X(l)},${Y(Math.min(400, (100 / (100 - l) - 1) * 100))}`)
  return (
    <svg viewBox="0 0 400 200" role="img" aria-label="Gain needed to recover from a loss">
      {[0, 100, 200, 300, 400].map(v => <g key={v}><line x1="40" x2="380" y1={Y(v)} y2={Y(v)} stroke="var(--line)" /><T x="34" y={Y(v) + 4} a="end" s={11}>{v}%</T></g>)}
      <polyline points={pts.join(' ')} fill="none" stroke="var(--pink)" strokeWidth="3" />
      {[10, 25, 50, 75].map(l => <T key={l} x={X(l)} y="186" s={11}>{l}%</T>)}
      <T x="210" y="199" s={11}>Loss</T>
    </svg>)
}

export function Streak() {
  return (
    <svg viewBox="0 0 400 200" role="img" aria-label="Balance after ten losses at 1, 2, 5 and 10 percent risk">
      {[1, 2, 5, 10].map((r, i) => { const b = 1000 * Math.pow(1 - r / 100, 10), x = 30 + i * 92, h = b / 1000 * 140
        return <g key={r}><rect x={x} y={160 - h} width="64" height={h} rx="8" fill={i < 2 ? 'var(--blue)' : 'var(--pink)'} />
          <T x={x + 32} y={152 - h} s={13} c="var(--ink)">${Math.round(b)}</T><T x={x + 32} y="182">{r}% risk</T></g> })}
    </svg>)
}

export function Sessions() {
  const S = [['Sydney', 22, 7, 'var(--mut)'], ['Tokyo', 0, 9, 'var(--blue)'], ['London', 8, 17, 'var(--pink)'], ['New York', 13, 22, 'var(--ink)']]
  const seg = (a, b, y, c, k) => <rect key={k} x={70 + a * 30} y={y} width={(b - a) * 30} height="26" rx="8" fill={c} opacity=".85" />
  return (
    <svg viewBox="0 0 800 235" role="img" aria-label="Forex sessions in UTC">
      {Array.from({ length: 13 }, (_, k) => k * 2).map(h => <g key={h}><line x1={70 + h * 30} x2={70 + h * 30} y1="10" y2="170" stroke="var(--line)" /><T x={70 + h * 30} y="190" s={11}>{String(h).padStart(2, '0')}:00</T></g>)}
      <rect x={70 + 13 * 30} y="8" width={4 * 30} height="160" fill="var(--pink)" opacity=".13" />
      {S.map(([n, a, b, c], i) => { const y = 18 + i * 38
        return <g key={n}><T x="64" y={y + 18} a="end" s={13} c="var(--ink)">{n}</T>{a > b ? <>{seg(a, 24, y, c, 1)}{seg(0, b, y, c, 2)}</> : seg(a, b, y, c, 1)}</g> })}
      <T x={70 + 15 * 30} y="222" s={13} c="var(--pink)">London + New York overlap: usually the most active hours</T>
    </svg>)
}

// Sample currency strength heatmap (illustrative numbers)
export function Heatmap() {
  const cur = ['USD', 'EUR', 'GBP', 'JPY', 'AUD']
  const v = [[0, .42, .31, -.18, .22], [-.42, 0, -.12, -.55, -.2], [-.31, .12, 0, -.38, -.1], [.18, .55, .38, 0, .3], [-.22, .2, .1, -.3, 0]]
  return (
    <div className="heat" role="table" aria-label="Sample currency change matrix">
      <div className="h" />{cur.map(c => <div className="h" key={c}>{c}</div>)}
      {cur.map((r, i) => (<Fragment key={r}>
        <div className="h">{r}</div>
        {v[i].map((x, j) => <div key={j} style={{ background: x === 0 ? 'var(--bg2)' : x > 0 ? `rgba(18,163,107,${.15 + Math.abs(x)})` : `rgba(229,72,77,${.15 + Math.abs(x)})`, color: x === 0 ? 'var(--mut)' : 'var(--ink)' }}>{x === 0 ? '–' : (x > 0 ? '+' : '') + x.toFixed(2) + '%'}</div>)}
      </Fragment>))}
    </div>)
}

// Share of daily FX turnover by currency, approx. BIS 2022 (percent of 200% total)
export function CurrencyBars() {
  const d = [['USD', 88], ['EUR', 31], ['JPY', 17], ['GBP', 13], ['Other', 51]]
  return (
    <svg viewBox="0 0 400 190" role="img" aria-label="Approximate share of FX trading by currency">
      {d.map(([n, v], i) => <g key={n}><T x="0" y={26 + i * 34} a="start" s={13} c="var(--ink)">{n}</T>
        <rect x="56" y={12 + i * 34} width={v * 3.3} height="20" rx="6" fill={i === 0 ? 'var(--blue)' : 'var(--line)'} /><T x={64 + v * 3.3} y={27 + i * 34} a="start" s={12}>{v}%</T></g>)}
    </svg>)
}
