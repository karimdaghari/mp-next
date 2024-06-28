import { Heart, HistoryIcon, Send, Share2, Users } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { StatCard } from '~/app/dashboard/_components/stat-card'
import { getEvent } from '~/app/dashboard/_lib/data'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { ScrollArea } from '~/components/ui/scroll-area'
import { TypographyLarge, TypographyMuted } from '~/components/ui/typography'
import { HistoryList } from '../../../_components/history-list'
import { EventPreview } from '../../_components/event-preview'

export default function Page({
  params: { id, eid },
}: {
  params: {
    id: string
    eid: string
  }
}) {
  const event = getEvent(Number(eid))

  if (!event) {
    redirect('/404')
  }

  const { agenda, name, description, history } = event

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/agendas">Mes agendas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/dashboard/agendas/${id}`}>{agenda.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid gap-1 lg:grid-cols-3 lg:mx-auto">
        <div className="space-y-1 lg:col-span-2">
          <div>
            <div className="grid lg:grid-cols-4 gap-1">
              <StatCard icon={Heart} title="Likes" value={6} />
              <StatCard icon={Users} title="Participants" value={6} />
              <StatCard title="Partages" value={221} icon={Share2} />
              <StatCard title="Envois" value={432} icon={Send} />
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div>
              <TypographyLarge>{name}</TypographyLarge>
              <TypographyMuted>{description}</TypographyMuted>
            </div>
            <div className="scale-90 hidden lg:block">
              <EventPreview />
            </div>
            <TypographyMuted className="lg:hidden mt-4 lg:mt-0">
              Vous êtes sur une version mobile, pour afficher la
              prévisualisation de {"l'événement"}, veuillez utiliser un écran
              plus large.
            </TypographyMuted>
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4 lg:col-span-1">
          <div className="mb-4">
            <TypographyLarge className="flex items-center">
              <HistoryIcon className="w-4 h-4 mr-1" />
              Historique de {"l'événement"}
            </TypographyLarge>
          </div>
          <ScrollArea className="h-[99dvh]">
            {history && history?.length > 0 ? (
              <HistoryList data={history} />
            ) : (
              <TypographyMuted>
                Aucune modification {"n'a"} été effectuée sur cet événement.
              </TypographyMuted>
            )}
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
