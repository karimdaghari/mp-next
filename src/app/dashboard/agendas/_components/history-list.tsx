import { lightFormat } from 'date-fns'
import { Separator } from '~/components/ui/separator'
import { TypographyMuted } from '~/components/ui/typography'
import type { IHistoryItem } from '../../_lib/types'

export interface Props {
  data: IHistoryItem[]
}

export function HistoryList({ data }: Props) {
  return (
    <div className="grid gap-8">
      {data.map((datum) => (
        <div className="grid gap-4" key={datum.id}>
          <HistoryItem data={datum} />
          <Separator />
        </div>
      ))}
    </div>
  )
}

interface HistoryItemProps {
  data: IHistoryItem
}

function HistoryItem({ data: { action, admin, date } }: HistoryItemProps) {
  return (
    <div className="flex flex-col items-start justify-start space-y-4">
      <Item title="Date">{lightFormat(date, 'dd.MM.yyyy')}</Item>
      <Item title="Admin">{admin.name} </Item>
      <Item title="Action">{action}</Item>
    </div>
  )
}

function Item({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <TypographyMuted className="text-xs uppercase">{title}</TypographyMuted>
      <div>{children}</div>
    </div>
  )
}
