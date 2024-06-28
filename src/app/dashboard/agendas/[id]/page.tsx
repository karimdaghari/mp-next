import {
  CalendarPlus,
  Heart,
  PlusIcon,
  Send,
  Share2,
  Ticket,
} from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { buttonVariants } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import { TypographyMuted } from '~/components/ui/typography'
import { StatCard } from '../../_components/stat-card'
import { getAgenda } from '../../_lib/data'
import { AgendaOptions } from './_components/agenda-options'
import { EventCard } from './_components/event-card'
import { EventsFilters } from './_components/events-filters'

export default function Page({
  params: { id },
}: {
  params: {
    id: string
  }
}) {
  const data = getAgenda(id)

  if (!data) {
    redirect('/404')
  }

  const { events, name, description, logo, categories } = data

  return (
    <div className="space-y-4">
      <Breadcrumb>
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
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="border border-primary">
        <CardHeader className="space-y-4 flex-col flex">
          <div className="flex">
            <Avatar className="mr-2 h-20 w-20">
              {logo ? <AvatarImage src={logo} alt={name} /> : null}
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-4">
                <div>
                  <TypographyMuted>
                    <Breadcrumb>
                      <BreadcrumbList>
                        {categories.map((c) => (
                          <BreadcrumbItem key={c.id}>
                            <BreadcrumbLink>{c.name}</BreadcrumbLink>
                          </BreadcrumbItem>
                        ))}
                      </BreadcrumbList>
                    </Breadcrumb>
                  </TypographyMuted>
                  <CardTitle>{name}</CardTitle>
                </div>
                <AgendaOptions name={name} />
              </div>
              <CardDescription className="line-clamp-2">
                {description}
              </CardDescription>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
            <StatCard title="Événements" value={events.length} icon={Ticket} />
            <StatCard title="Suivis" value={77} icon={CalendarPlus} />
            <StatCard title="Abonnements" value={221} icon={CalendarPlus} />
            <StatCard title="Partages" value={221} icon={Share2} />
            <StatCard title="Likes" value={1050} icon={Heart} />
            <StatCard title="Envois d'events" value={432} icon={Send} />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <EventsFilters />
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-2">
            <Link
              href={`/dashboard/agendas/${id}/e/new?from=${encodeURIComponent(
                id,
              )}
                `}
              className={buttonVariants({
                className:
                  'h-full w-full flex flex-col justify-center items-center bg-transparent border-dotted',
                variant: 'outline',
              })}
            >
              <PlusIcon className="h-8 w-8 mb-1" />
              Créer un nouvel événement
            </Link>
            {events.map((item) => (
              <EventCard key={Math.random()} {...item} />
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden lg:block">
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden lg:block">
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  )
}
