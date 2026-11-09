'use client'
import { useState } from 'react'

export default function Calculator() {
  const [bal, setBal] = useState(1000), [risk, setRisk] = useState(1), [sl, setSl] = useState(25)
  const amt = (bal * risk) / 100, lots = amt / (Math.max(sl, 1) * 10)
  return (
    <div className="card">
      <h3>Position size</h3>
      <label htmlFor="bal">Account balance ($)</label><input id="bal" type="number" min="1" value={bal} onChange={e => setBal(+e.target.value)} />
      <label htmlFor="rk">Risk per trade (%)</label><input id="rk" type="number" min="0.1" step="0.1" value={risk} onChange={e => setRisk(+e.target.value)} />
      <label htmlFor="sl">Stop-loss distance (pips)</label><input id="sl" type="number" min="1" value={sl} onChange={e => setSl(+e.target.value)} />
      <div className="res">
        <div><b>${amt.toFixed(2).replace(/\.00$/, '')}</b><span>Amount at risk</span></div>
        <div><b>{lots.toFixed(2)}</b><span>Lots (EUR/USD, $10 per pip per lot)</span></div>
      </div>
    </div>
  )
}
