import { TypographyH2, TypographySmall } from '~/components/ui/typography'

interface Props {
  title: string
  description?: string
}

export function DashboardHeader({ title, description }: Props) {
  return (
    <div className="mb-4">
      <TypographyH2>{title}</TypographyH2>
      {description && <TypographySmall>{description}</TypographySmall>}
    </div>
  )
}
