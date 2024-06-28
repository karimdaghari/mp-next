import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './devices.css'
import '~/styles/globals.css'
import { cn } from '~/lib/utils'
import { TRPCReactProvider } from '~/trpc/react'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meeting Potes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <TRPCReactProvider>
        <body className={cn('min-h-dvh h-dvh bg-muted', manrope.className)}>
          {children}
        </body>
      </TRPCReactProvider>
    </html>
  )
}
