import { Epilogue, Lora, Instrument_Serif, Inter} from 'next/font/google' // Import Google Fonts
import './globals.css'
import type { Metadata } from "next"

// Configure the fonts
const epilogue = Epilogue({ subsets: ['latin'], variable: '--font-epilogue' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const instrument = Instrument_Serif({ weight: '400', subsets: ['latin'], variable: '--font-instrument' })

export const metadata: Metadata = {
  title: "It Had To Be Sew - Admin",
  description: "Production Management Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      {/* Inject variables into the body */}
      <body className={`${epilogue.variable} ${lora.variable} ${instrument.variable} font-serif bg-background-light text-[#1a2e2b]`}>
        {children}
      </body>
    </html>
  )
}