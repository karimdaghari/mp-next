import type { LucideIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

interface Props {
  icon: LucideIcon
  title: string
  value: number
}

export function StatCard({ icon: Icon, title, value }: Props) {
  return (
    <Card className="min-h-full w-full">
      <CardContent className="flex items-center space-x-3 p-4">
        <Icon className="h-10 w-10" />
        <CardHeader className="space-y-0 p-0">
          <CardTitle>{value}</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  )
}
