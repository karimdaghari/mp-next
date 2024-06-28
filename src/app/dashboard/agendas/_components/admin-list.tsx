import { lightFormat } from 'date-fns'
import { Suspense } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { api } from '~/trpc/react'

export function AdminList() {
  return (
    <Suspense fallback={<Skeleton className="h-52 w-full" />}>
      <List />
    </Suspense>
  )
}

function List() {
  const [data] = api.agenda.getAllAdmins.useSuspenseQuery()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Dernière connexion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d) => (
          <TableRow key={d.id}>
            <TableCell>{d.name}</TableCell>
            <TableCell>{d.email}</TableCell>
            <TableCell>{lightFormat(new Date(), 'dd/MM/yyyy HH:mm')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
