import type { HistoryItem } from '../../_lib/types';
import { lightFormat } from 'date-fns';
import { TypographyMuted } from '~/components/ui/typography';
import { Separator } from '~/components/ui/separator';

export interface Props {
  data: HistoryItem[];
}

export function HistoryList({ data }: Props) {
  return (
    <div className='grid gap-8'>
      {data.map((datum) => (
        <div
          className='grid gap-4'
          key={datum.id}>
          <HistoryItem data={datum} />
          <Separator />
        </div>
      ))}
    </div>
  );
}

interface HistoryItemProps {
  data: HistoryItem;
}

function HistoryItem({ data: { action, admin, date } }: HistoryItemProps) {
  return (
    <div className='flex flex-col items-start justify-start space-y-4'>
      <Item title='Date'>{lightFormat(date, 'dd.MM.yyyy')}</Item>
      <Item title='Admin'>{admin.name} </Item>
      <Item title='Action'>{action}</Item>
    </div>
  );
}

function Item({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col'>
      <TypographyMuted className='text-xs uppercase'>{title}</TypographyMuted>
      <div>{children}</div>
    </div>
  );
}
