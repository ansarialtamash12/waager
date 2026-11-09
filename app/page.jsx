"use client";
import { useState } from "react";

import {
  HeroChart,
  Patterns,
  Compare,
  Drawdown,
  Streak,
  Sessions,
  LiveForexTable,
  CurrencyBars,
} from "../components/Charts";
import Calculator from "../components/Calculator";
import { icons, MarketOrbit, PhoneMock } from "../components/Illustrations";
import Image from "next/image";

const courses = [
  [
    "forex",
    "Beginner",
    "Forex fundamentals",
    "Pairs, pips, lots, spreads and what moves currencies.",
    82,
  ],
  [
    "crypto",
    "Beginner",
    "Crypto fundamentals",
    "Bitcoin, stablecoins, exchanges, wallets and volatility.",
    64,
  ],
  [
    "risk",
    "Beginner",
    "Risk management",
    "Position sizing, stop-losses and surviving losing streaks.",
    56,
  ],
  [
    "ta",
    "Intermediate",
    "Technical analysis",
    "Trends, support and resistance, candlesticks and indicators.",
    31,
  ],
  [
    "structure",
    "Advanced",
    "Market structure",
    "Liquidity, order flow and how participants move price.",
    18,
  ],
  [
    "mind",
    "Advanced",
    "Trading psychology",
    "Discipline, journaling and decisions under pressure.",
    9,
  ],
];
const steps = [
  ["Learn the basics", "Pairs, pips, spreads and how a trade works."],
  ["Read charts", "Candles, trends, support and resistance."],
  ["Control risk", "Size every position before you enter."],
  ["Practise on demo", "Test ideas with no real money at stake."],
];
const faq = [
  [
    "Is Forex the same as crypto trading?",
    "Both involve speculating on price. Forex trades currency pairs on a 24/5 market; crypto trades digital assets 24/7 and is usually more volatile.",
  ],
  [
    "How much money do I need to start?",
    "Many brokers allow small deposits, but start on a demo account. Only risk money you can afford to lose.",
  ],
  [
    "Can I make guaranteed profit?",
    "No. Anyone promising guaranteed returns is a red flag. Most retail traders lose money, so risk control comes first.",
  ],
  [
    "Does waager.live give signals or manage funds?",
    "No. This site is educational and informational only. It is not investment advice.",
  ],
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header>
        <div className="w">
          <nav aria-label="Main navigation">
            <a
              className="logo"
              href="#top"
              aria-label="waager.live home"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Image
                src="/waager.jpeg"
                alt="waager.live"
                width={120}
                height={35}
                className="logo-img"
                priority
                style={{ objectFit: "contain", width: "auto", height: "35px" }}
              />
            </a>

            <button
              className="hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>

            <ul className={isMenuOpen ? "nav-links open" : "nav-links"}>
              {[
                ["learn", "Courses"],
                ["charts", "Charts"],
                ["markets", "Markets"],
                ["tools", "Calculators"],
                ["sessions", "Sessions"],
                ["faq", "FAQ"],
              ].map(([h, t]) => (
                <li key={h}>
                  <a href={`#${h}`} onClick={() => setIsMenuOpen(false)}>
                    {t}
                  </a>
                </li>
              ))}
            </ul>

            <a className="btn" href="#learn">
              Connect wallet
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <div className="w hero">
          <div>
            <h1>
              Learn Forex and crypto trading, <span className="star" /> clearly.
            </h1>
            <p className="lead">
              waager.live explains how currency and crypto markets work, with
              charts, calculators and plain-language lessons. Education only: no
              signals, no promises, no pressure.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn" href="#learn">
                Browse courses
              </a>
              <a className="btn alt" href="#charts">
                See the charts
              </a>
            </div>
          </div>
          <HeroChart />
        </div>

        <div className="w">
          <div className="stats">
            {[
              ["24/5", "Forex market hours"],
              ["24/7", "Crypto market hours"],
              ["$7.5T", "Approx. daily forex volume (BIS 2022)"],
              ["6", "Free learning tracks"],
            ].map(([b, s]) => (
              <div key={s}>
                <b>{b}</b>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <section id="learn" className="alt-bg">
          <div className="w">
            <h2>Six tracks, from first pip to trading psychology</h2>
            <p className="lead">
              Pick a level and work through short lessons. Progress bars are
              sample data.
            </p>
            <div className="grid g3" style={{ marginTop: 24 }}>
              {courses.map(([ic, lvl, t, d, pr]) => (
                <div className="card" key={t}>
                  <div className="ico">{icons[ic]}</div>
                  <span className="lvl">{lvl}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <div className="row">
                    <span>Sample progress</span>
                    <span>{pr}%</span>
                  </div>
                  <div className="bar">
                    <i style={{ width: `${pr}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="w">
            <h2>A simple path for new traders</h2>
            <div
              className="grid g2"
              style={{ alignItems: "center", marginTop: 20 }}
            >
              <div className="path" style={{ rowGap: 30 }}>
                {steps.map(([t, d]) => (
                  <div className="card" key={t}>
                    <h3>{t}</h3>
                    <p style={{ margin: 0 }}>{d}</p>
                  </div>
                ))}
              </div>
              <PhoneMock />
            </div>
          </div>
        </section>

        <section id="charts" className="alt-bg">
          <div className="w">
            <h2>Learn to read the chart</h2>
            <p className="lead">
              Three patterns every beginner meets first. These are diagrams, not
              predictions: patterns fail often.
            </p>
            <div style={{ marginTop: 24 }}>
              <Patterns />
            </div>
            <div className="grid g2" style={{ marginTop: 18 }}>
              <div className="card">
                <h3>Forex vs crypto</h3>
                <p>Relative scale, 1 to 10 (general guide).</p>
                <Compare />
              </div>
              <div className="card">
                <h3>Why risk per trade matters</h3>
                <p>Gain needed to recover from a loss.</p>
                <Drawdown />
                <p className="small">
                  Lose 50% and you need a 100% gain to break even.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="markets">
          <div className="w">
            <h2>How the currency market is built</h2>
            <p className="lead">
              Money moves between currencies every second. These visuals show
              who is involved and how pairs move.
            </p>
            <div
              className="grid g2"
              style={{ marginTop: 24, alignItems: "center" }}
            >
              <MarketOrbit />
              <div className="card">
                <h3>Share of daily FX trading</h3>
                <p>
                  Approximate, from the BIS 2022 survey. Totals 200% because
                  every trade has two currencies.
                </p>
                <CurrencyBars />
              </div>
            </div>
            <div className="card" style={{ marginTop: 18 }}>
              <h3>Currency change matrix</h3>
              <p>
                Sample data showing how each row currency moved against each
                column currency.
              </p>
              <LiveForexTable />
            </div>
          </div>
        </section>

        <section id="tools" className="alt-bg">
          <div className="w">
            <h2>Calculators you can try</h2>
            <p className="lead">
              Fixed numbers make risk real. Change the inputs and see what a
              trade could cost.
            </p>
            <div className="grid g2" style={{ marginTop: 24 }}>
              <Calculator />
              <div className="card">
                <h3>Losing streak simulator</h3>
                <p>Balance after 10 straight losses, starting from $1,000.</p>
                <Streak />
              </div>
            </div>
          </div>
        </section>

        <section id="sessions">
          <div className="w">
            <h2>When the forex market is busiest</h2>
            <p className="lead">
              Activity rises when major financial centres overlap. Times shown
              in UTC.
            </p>
            <div className="card" style={{ marginTop: 22 }}>
              <Sessions />
            </div>
            <div className="grid g3" style={{ marginTop: 18 }}>
              {[
                [
                  "Pip",
                  "The smallest common price move, usually 0.0001 on EUR/USD.",
                ],
                [
                  "Spread",
                  "The gap between buy and sell price. It is a cost on every trade.",
                ],
                [
                  "Leverage",
                  "Borrowed exposure. It magnifies gains and losses equally.",
                ],
              ].map(([t, d]) => (
                <div className="card" key={t}>
                  <h3>{t}</h3>
                  <p style={{ margin: 0 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="alt-bg">
          <div className="w" style={{ maxWidth: 820 }}>
            <h2>Common questions</h2>
            {faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
            <div className="warn" style={{ marginTop: 26 }}>
              <strong>Risk disclosure:</strong> Forex and crypto trading involve
              substantial risk and may not suit everyone. You can lose some or
              all of your capital. Leverage amplifies losses. Past performance
              does not indicate future results. All figures and charts here are
              illustrative sample data. Consult a licensed financial
              professional before investing.
            </div>
          </div>
        </section>

        <section>
          <div className="w">
            <div className="cta">
              <h2>Start with one lesson today</h2>
              <p>Free, plain-language and built around risk first.</p>
              <a className="btn" href="#learn">
                Browse courses
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="w">
          <div className="fl">
            <div>
              <div
                className="logo"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Image
                  src="/waager.jpeg"
                  alt="waager.live"
                  width={120}
                  height={35}
                  className="logo-img"
                  style={{
                    objectFit: "contain",
                    width: "auto",
                    height: "35px",
                  }}
                />
              </div>
              <p>Forex and crypto education.</p>
            </div>
            <div>
              <a href="#learn">Courses</a>
              <br />
              <a href="#charts">Charts</a>
              <br />
              <a href="#tools">Calculators</a>
            </div>
            <div>
              <a href="#faq">FAQ</a>
              <br />
              <a href="#faq">Risk disclosure</a>
            </div>
          </div>
          <p>
            © 2026 waager.live. Educational content only, not financial advice.
          </p>
        </div>
      </footer>
    </>
  );
}
