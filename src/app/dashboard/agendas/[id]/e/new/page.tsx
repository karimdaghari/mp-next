import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { EventForm } from '../../_components/event-form'
import { api } from '~/trpc/server'

export default async function Page({
  searchParams: { from: id },
}: {
  searchParams: {
    from: string
  }
}) {
  const { name } = await api.agenda.get({ id })

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
              <Link href={`/dashboard/agendas/${id}`}>{name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Créer un nouvel événement</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <EventForm
        title="Créer un événement"
        description="Créez un nouvel événement en remplissant les champs ci-dessous."
      />
    </>
  )
}
