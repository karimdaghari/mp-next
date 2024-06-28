import { lightFormat } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { getAllAdmins } from '../../_lib/data'

export function AdminList() {
  const data = getAllAdmins()
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
