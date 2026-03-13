import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "700", "900"],
})

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  variable: "--font-source-sans-pro",
  weight: ["300", "400", "600", "700"],
})

export const metadata = {
  title: "वैदSeva - AI-Powered Healthcare Platform",
  description: "Experience the future of healthcare with AI-powered diagnostics and comprehensive medical services",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${sourceSansPro.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
