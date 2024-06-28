'use client'
import {
  ArrowRight,
  CopyIcon,
  EditIcon,
  Lock,
  MoreVerticalIcon,
  Rss,
  UsersIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { buttonVariants } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall,
} from '~/components/ui/typography'
import { cn } from '~/lib/utils'
import type { AgendaItem as Props } from '../../_lib/types'
import { AdminList } from './admin-list'
import { AgendaForm } from './agenda-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'

export function AgendaCard({
  id,
  name,
  description,
  logo,
  cover,
  eventsNumber,
  attendanceRate,
  isDraft = false,
  categories,
}: Props) {
  const [openAdminList, setOpenAdminList] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  return (
    <Card className="duration-500 hover:shadow-xl transition-all ease-in-out border border-primary">
      <div className="flex items-center space-x-3">
        <CardHeader className="relative space-y-0 p-0 pl-4">
          {cover ? (
            <img
              alt={name}
              src={cover}
              className={cn(
                'object-cover h-32 w-32 rounded-lg aspect-1/1 border',
                isDraft && 'grayscale',
              )}
            />
          ) : (
            <div className="h-32 w-24 bg-muted rounded-lg aspect-1/1 border" />
          )}
          <div className="absolute flex items-center w-full justify-end -bottom-3">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={logo ?? undefined} />
              <AvatarFallback>
                <TypographyLarge>{name[0]}</TypographyLarge>
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 p-4 w-full">
          <div>
            {isDraft ? (
              <Badge className="w-fit mb-1.5">Brouillon</Badge>
            ) : (
              <div className="h-5 mb-2.5" />
            )}
            <div className="space-y-0 flex flex-col">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className="cursor-auto text-left">
                    <div>
                      <TypographyMuted>Agenda</TypographyMuted>
                      <CardTitle className="text-lg line-clamp-1">
                        {name}
                      </CardTitle>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-40">
                    <TypographySmall>Nom</TypographySmall>
                    <TypographyMuted>{name}</TypographyMuted>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger className="cursor-auto text-left">
                    <CardDescription className="line-clamp-2 h-10">
                      {description ??
                        "Aucune description n'a été renseignée pour cet agenda. Veuillez en ajouter une."}
                    </CardDescription>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    <TypographySmall>Description</TypographySmall>
                    <TypographyMuted>
                      {description ??
                        "Aucune description n'a été renseignée pour cet agenda. Veuillez en ajouter une."}
                    </TypographyMuted>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex items-center justify-between xl:flex-nowrap flex-wrap px-2">
            <div>
              <TypographyLarge>
                {eventsNumber === null ? '-' : eventsNumber}
              </TypographyLarge>
              <TypographySmall>Events</TypographySmall>
            </div>
            <Separator orientation="vertical" className="inline-block h-12" />
            <div>
              <TypographyLarge>
                {attendanceRate === null ? '-' : `${attendanceRate.toFixed(0)}`}
              </TypographyLarge>
              <TypographySmall>Abonnés</TypographySmall>
            </div>
            <Separator orientation="vertical" className="inline-block h-12" />
            <div>
              <TypographyLarge>
                {attendanceRate === null ? '-' : `${attendanceRate.toFixed(0)}`}
              </TypographyLarge>
              <TypographySmall>Suivi</TypographySmall>
            </div>
            <Separator orientation="vertical" className="inline-block h-12" />
            <div>
              <TypographyLarge>
                {attendanceRate === null ? '-' : `${attendanceRate.toFixed(0)}`}
              </TypographyLarge>
              <TypographySmall>Partages</TypographySmall>
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4 flex items-center gap-1 border-t">
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
                Finissez de configurer votre agenda avant de le publier.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[75dvh] lg:max-h-full">
              <AgendaForm
                intent="update"
                input={{
                  id,
                  name,
                  description,
                  logo,
                  cover,
                  isDraft,
                  categoriesIds: categories.map((c) => c.id),
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
        <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Désactiver {"l'agenda"} ?</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir désactiver {"l'agenda"} ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction>Confirmer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
            <DropdownMenuItem
              onSelect={(e) => {
                setOpenAdminList(true)
                e.stopPropagation()
              }}
            >
              <UsersIcon className="w-4 h-4 mr-2" />
              Administrateurs
            </DropdownMenuItem>
            {!isDraft && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive hover:text-destructive"
                  onSelect={() => setOpenDeleteDialog(true)}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Désactiver
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={openAdminList} onOpenChange={setOpenAdminList}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Administrateurs</DialogTitle>
              <DialogDescription>
                La liste des administrateurs de votre agenda
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[75dvh] lg:max-h-full">
              <AdminList />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
