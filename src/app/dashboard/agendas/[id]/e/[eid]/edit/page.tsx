import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { EventForm } from '../../../_components/event-form'
import { api } from '~/trpc/server'

export default async function Page({
  params: { id: agendaId, eid: eventId },
}: {
  params: {
    id: string
    eid: string
  }
}) {
  const event = await api.events.get({ id: +eventId })

  if (!event) {
    redirect('/404')
  }
  const { agenda, name } = event

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
              <Link href={`/dashboard/agendas/${agendaId}`}>{agenda.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>{name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EventForm
        title="Modifier un événement"
        description="Modifiez les informations de cet événement en remplissant les champs ci-dessous."
        input={event}
      />
    </>
  )
}
