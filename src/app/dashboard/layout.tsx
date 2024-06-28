import { Navbar } from '~/components/navbar'
import { ScrollArea } from '~/components/ui/scroll-area'
import { TypographyMuted, TypographySmall } from '~/components/ui/typography'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="max-h-dvh h-full">
      <Navbar />
      <div className="p-4 h-full">{children}</div>
      <footer className="p-4 text-center">
        <TypographyMuted>
          Powered by <TypographySmall>Meeting Potes</TypographySmall>
        </TypographyMuted>
      </footer>
    </ScrollArea>
  )
}
