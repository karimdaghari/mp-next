'use client'
import {
  ArrowRight,
  CopyIcon,
  EditIcon,
  History,
  HistoryIcon,
  Lock,
  MoreVerticalIcon,
  Rss,
  UsersIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import type { CategoryTree } from '~/app/dashboard/_lib/types'
import { buttonVariants } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Separator } from '~/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall,
} from '~/components/ui/typography'
import { cn } from '~/lib/utils'
import { AdminList } from '../../_components/admin-list'
import { AgendaForm } from '../../_components/agenda-form'

interface Props {
  data: CategoryTree[]
}

export function Tree({ data }: Props) {
  return (
    <div className="flex flex-col justify-start items-start space-y-4">
      {data.map((item) => (
        <TreeItem key={item.id} depth={0} data={item} />
      ))}
    </div>
  )
}

interface TreeItemProps {
  data: CategoryTree
  depth: number
}

function TreeItem({ data, depth }: TreeItemProps) {
  const [showAdmins, setShowAdmins] = useState(false)
  return (
    <div
      className="flex flex-col space-y-1 w-full"
      style={{
        paddingLeft: `${depth * 1}rem`,
        paddingRight: `${depth * 1}rem`,
      }}
    >
      <div
        className={cn(
          'w-full bg-purple-600 text-white px-4 py-2 rounded-lg border border-transparent ',
          {
            'bg-opacity-100': depth === 0,
            'bg-opacity-70': depth === 1,
            'bg-opacity-50': depth === 2,
            'bg-opacity-30': depth === 3,
            'bg-opacity-15': depth === 4,
            'bg-opacity-10': depth === 5,
            'bg-opacity-5': depth === 6,
          },
        )}
      >
        <span className="font-medium">{data.name}</span>
      </div>
      <div
        className="flex items-center gap-1 flex-wrap"
        style={{
          paddingLeft: `${(depth === 0 ? 1 : depth) * 2}rem `,
        }}
      >
        {data.agendas.map((agenda) => {
          const { eventsNumber, attendanceRate, isDraft, id, name } = agenda
          return (
            <div key={agenda.id}>
              <Card className="bg-white p-0 rounded-lg border w-full">
                <CardHeader className="p-4 space-y-0">
                  <TypographyMuted className="text-[0.7rem]">
                    Agenda
                  </TypographyMuted>
                  <TypographySmall className="text-sm">
                    {agenda.name}
                  </TypographySmall>
                </CardHeader>
                <CardContent className="flex items-center justify-between w-full px-4 pt-2 pb-4">
                  <div>
                    <TypographyLarge>
                      {eventsNumber === null ? '-' : eventsNumber}
                    </TypographyLarge>
                    <p className="text-sm">Events</p>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="inline-block h-12"
                  />
                  <div>
                    <TypographyLarge>
                      {attendanceRate === null
                        ? '-'
                        : `${attendanceRate.toFixed(0)}`}
                    </TypographyLarge>
                    <p className="text-sm">Abonnés</p>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="inline-block h-12"
                  />
                  <div>
                    <TypographyLarge>
                      {attendanceRate === null
                        ? '-'
                        : `${attendanceRate.toFixed(0)}`}
                    </TypographyLarge>
                    <p className="text-sm">Suivi</p>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="inline-block h-12"
                  />
                  <div>
                    <TypographyLarge>
                      {attendanceRate === null
                        ? '-'
                        : `${attendanceRate.toFixed(0)}`}
                    </TypographyLarge>
                    <p className="text-sm">Partages</p>
                  </div>
                </CardContent>
                <CardFooter className="p-2 flex items-center gap-1 border-t">
                  <Dialog>
                    <DialogTrigger
                      className={buttonVariants({
                        className: 'w-full',
                        size: 'sm',
                      })}
                    >
                      Éditer <EditIcon className="w-4 h-4 ml-2" />
                    </DialogTrigger>
                    <DialogContent className="max-w-[22rem] lg:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Modifier {"l'agenda"}</DialogTitle>
                        <DialogDescription>
                          Finissez de configurer votre agenda avant de le
                          publier.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[75dvh] lg:max-h-full">
                        <AgendaForm
                          input={{
                            id: agenda.id,
                            name: agenda.name,
                            eventsNumber,
                            attendanceRate,
                          }}
                        />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  {!isDraft && (
                    <Link
                      className={buttonVariants({
                        variant: 'secondary',
                        className: 'w-full',
                        size: 'sm',
                      })}
                      href={`/dashboard/agendas/${id}`}
                    >
                      Consulter
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={buttonVariants({
                        variant: 'ghost',
                        size: 'sm',
                      })}
                    >
                      <MoreVerticalIcon className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {isDraft ? (
                        <DropdownMenuItem>
                          <Rss className="w-4 h-4 mr-2" />
                          Publier
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuItem>
                        <CopyIcon className="w-4 h-4 mr-2" />
                        Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setShowAdmins(true)}>
                        <UsersIcon className="w-4 h-4 mr-2" />
                        Administrateurs
                      </DropdownMenuItem>

                      {!isDraft && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive hover:text-destructive">
                            <Lock className="w-4 h-4 mr-2" />
                            Désactiver
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Dialog open={showAdmins} onOpenChange={setShowAdmins}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Administrateurs</DialogTitle>
                        <DialogDescription>
                          Vous pouvez modifier les administrateurs de votre
                          agenda.
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[75dvh] lg:max-h-full">
                        <AdminList />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          )
        })}
      </div>
      {data.children?.length ? (
        <div className="space-y-1 mt-1">
          {data.children.map((child) => (
            <TreeItem key={child.id} data={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
