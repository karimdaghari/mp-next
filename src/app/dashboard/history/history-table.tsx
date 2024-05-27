import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '~/components/ui/table';
import { getHistory } from '../_lib/data';
import { lightFormat } from 'date-fns';

export function HistoryTable() {
  const history = getHistory();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Type</TableHead>
          <TableHead>Admin</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((h) => (
          <TableRow key={h.id}>
            <TableCell className='font-medium'>{h.type}</TableCell>
            <TableCell>{h.admin.name}</TableCell>
            <TableCell>{h.action}</TableCell>
            <TableCell>{lightFormat(h.date, 'dd/MM/yyyy HH:mm')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
