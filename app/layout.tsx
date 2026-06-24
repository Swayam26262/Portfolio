import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const clashDisplay = localFont({
  src: [
    { path: './fonts/ClashDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/ClashDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://swayampatil.vercel.app'), // TODO: update if the domain changes
  title: 'Swayam Patil — Full-Stack & AI Engineer',
  description:
    'Full-Stack & AI Engineer building production AI products — RAG chatbots, voice agents, and full-stack SaaS. Currently at GoParkEasy.',
  generator: 'Next.js',
  openGraph: {
    title: 'Swayam Patil — Full-Stack & AI Engineer',
    description:
      'Building production AI products — RAG chatbots, voice agents, and full-stack SaaS.',
    url: 'https://swayampatil.vercel.app',
    siteName: 'Swayam Patil',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swayam Patil — Full-Stack & AI Engineer',
    description:
      'Building production AI products — RAG chatbots, voice agents, and full-stack SaaS.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${clashDisplay.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-canvas font-body text-ink antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
