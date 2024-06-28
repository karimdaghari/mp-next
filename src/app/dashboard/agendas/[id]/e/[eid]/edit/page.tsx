import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getEvent } from '~/app/dashboard/_lib/data'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { EventForm } from '../../../_components/event-form'

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
              <Link href={`/dashboard/agendas/${id}`}>{agenda.name}</Link>
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
