import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata = {
  title: 'waager.live | Forex & Crypto Education',
  description: 'Learn Forex and crypto trading with clear lessons, charts and calculators. Education only.',
  icons:{
    icon: '/favicon.png',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  )
}
