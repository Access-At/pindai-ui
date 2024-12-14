import { ArrowRightIcon } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'

export function DashboardCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card className="flex flex-col grow p-6 text-muted-foreground">
      <span className="font-semibold capitalize">{title}</span>
      <span>{description}</span>
    </Card>
  )
}

export function ActionCard({
  title,
  btnLabel,
}: {
  title: string
  btnLabel: string
}) {
  return (
    <Card className="flex flex-col grow p-6 gap-4 text-muted-foreground capitalize">
      <Badge
        className={`size-fit bg-${title === 'Penelitian' ? 'green' : 'cyan'}-500/30 text-${title === 'Penelitian' ? 'green' : 'cyan'}-500 hover:bg-${title === 'Penelitian' ? 'green' : 'cyan'}-500 hover:text-primary-foreground`}
      >
        {title}
      </Badge>
      <Button
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <ArrowRightIcon className="h-4 w-4" />
        <span className="capitalize">{btnLabel}</span>
      </Button>
    </Card>
  )
}
