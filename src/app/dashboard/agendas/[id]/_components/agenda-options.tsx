'use client'
import { EditIcon, MoreVertical, UsersIcon } from 'lucide-react'
import { useState } from 'react'
import { buttonVariants } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { ScrollArea } from '~/components/ui/scroll-area'
import { AdminList } from '../../_components/admin-list'
import { AgendaForm } from '../../_components/agenda-form'
import type { RouterInputs } from '~/trpc/react'

interface Props {
  input: RouterInputs['agenda']['update']
}

export function AgendaOptions({ input }: Props) {
  const [showEdit, setShowEdit] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  return (
    <>
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              variant: 'secondary',
              size: 'icon',
              className: 'ml-2 h-7 w-7',
            })}
          >
            <MoreVertical className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setShowEdit(true)}>
              <EditIcon className="w-4 h-4 mr-2" />
              Modifier {"l'agenda"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                setShowAdmin(true)
                e.stopPropagation()
              }}
            >
              <UsersIcon className="w-4 h-4 mr-2" />
              Administrateurs
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="max-w-xs sm:max-w-sm lg:max-w-xl">
          <DialogHeader>
            <DialogTitle>Modifier {"l'agenda"}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[75dvh] lg:max-h-[80dvh] xl:max-h-full">
            <AgendaForm intent="update" input={input} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Dialog open={showAdmin} onOpenChange={setShowAdmin}>
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
    </>
  )
}
