'use client'
import { Fragment, useEffect,useRef, useState } from 'react'

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
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        ["EUR/USD", "FX:EURUSD|12M"],
        ["GBP/USD", "FX:GBPUSD|12M"],
        ["Bitcoin", "BINANCE:BTCUSDT|12M"],
        ["Ethereum", "BINANCE:ETHUSDT|12M"],
        ["Gold", "OANDA:XAUUSD|12M"]
      ],
      chartOnly: false,
      width: "100%",
      height: "400", 
      locale: "en",
      colorTheme: "light",
      autosize: false, 
      showVolume: true,
      showMA: true,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      fontSize: "10",
      noTimeScale: false,
      valuesTracking: "3",
      changeMode: "price-only",
      chartType: "candlesticks",
      maLineColor: "#2962FF",
      maLineWidth: 1,
      maLength: 9,
      lineType: 0,
      dateRanges: [
        "1w|60",
        "1m|1D",
        "6m|120",
        "12m|1D",
        "60m|1W"
      ],
      downColor: "#f7525f",
      upColor: "#22ab94",
      borderUpColor: "#22ab94",
      borderDownColor: "#f7525f",
      wickUpColor: "#22ab94",
      wickDownColor: "#f7525f"
    });
    container.current.appendChild(script);
  }, []);

  return (
    <div className="panel" style={{ width: '100%', height: '400px', padding: 0, overflow: 'hidden', background: '#fff' }}>
      <div className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}>
        <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }}></div>
      </div>
    </div>
  );
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

// Sample currency strength
const TV_SRC = 'https://widgets.tradingview-widget.com/w/en/tv-forex-table.js'

export function LiveForexTable() {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const existing = document.querySelector(`script[src="${TV_SRC}"]`)
    if (existing) {
      if (customElements.get('tv-forex-table')) setReady(true)
      else existing.addEventListener('load', () => setReady(true), { once: true })
      return
    }
    const s = document.createElement('script')
    s.src = TV_SRC
    s.type = 'module'
    s.async = true
    s.addEventListener('load', () => setReady(true))
    document.head.appendChild(s)
  }, [])

  useEffect(() => {
    if (!ready || !ref.current) return
    ref.current.innerHTML = ''
    const el = document.createElement('tv-forex-table')
    el.setAttribute('theme', 'light')
    el.setAttribute('width', '100%')
    el.setAttribute('height', '400') 
    el.setAttribute('autosize', 'true')
    el.style.display = 'block'
    el.style.width = '100%'
    ref.current.appendChild(el)
  }, [ready])

  return (
    <div style={{ width: '100%', height: '340px', overflow: 'hidden', position: 'relative' }}>
      
      <div 
        ref={ref} 
        style={{ width: '100%', height: '400px', position: 'absolute', top: 0, left: 0 }} 
      />
      
    </div>
  )
}



export function CurrencyBars() {
  const d = [['USD', 88], ['EUR', 31], ['JPY', 17], ['GBP', 13], ['Other', 51]]
  return (
    <svg viewBox="0 0 400 190" role="img" aria-label="Approximate share of FX trading by currency">
      {d.map(([n, v], i) => <g key={n}><T x="0" y={26 + i * 34} a="start" s={13} c="var(--ink)">{n}</T>
        <rect x="56" y={12 + i * 34} width={v * 3.3} height="20" rx="6" fill={i === 0 ? 'var(--blue)' : 'var(--line)'} /><T x={64 + v * 3.3} y={27 + i * 34} a="start" s={12}>{v}%</T></g>)}
    </svg>)
}
