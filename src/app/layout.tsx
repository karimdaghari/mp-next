import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './devices.css'
import '~/styles/globals.css'
import { cn } from '~/lib/utils'
import { TRPCReactProvider } from '~/trpc/react'
import { Toaster } from '~/components/ui/sonner'

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
        <body className={manrope.className}>
          <main className={cn('min-h-dvh h-dvh bg-muted')}>{children}</main>
          <Toaster richColors position="top-right" closeButton />
        </body>
      </TRPCReactProvider>
    </html>
  )
}
