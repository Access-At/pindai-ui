import { Separator } from '~/components/ui/separator'
import { ArrowRightIcon } from 'lucide-react'
import { Card } from './ui/card'

export function InformationRow({
  label,
  value,
}: {
  label: string
  value?: string
}) {
  return (
    <>
      <Separator className="bg-neutral-400 my-4" />
      <div className="flex items-center justify-between">
        <span className="font-semibold capitalize">{label}</span>
        {typeof value === 'string' ? (
          <span>{value}</span>
        ) : (
          <ArrowRightIcon className="h-4 w-4" />
        )}
      </div>
    </>
  )
}

export function InformationCard({
  title,
  data,
}: {
  title: string
  data: {
    label: string
    value?: string
  }[]
}) {
  return (
    <Card className="flex flex-col grow p-6 text-muted-foreground">
      <h5 className="font-semibold capitalize">{title}</h5>
      <p>Berisikan informasi tentang data diri anda.</p>
      {data.map((info, index) => (
        <InformationRow key={index} label={info.label} value={info.value} />
      ))}
    </Card>
  )
}
