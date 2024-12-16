import { Separator } from '~/components/ui/separator'
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react'
import { Card } from './ui/card'
import EachUtil from '~/utils/each-util'
import Link from 'next/link'
import { cn } from '~/lib/utils'
import { Button, buttonVariants } from './ui/button'
import { Badge } from './ui/badge'

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
  role,
  data,
}: {
  title: string
  role: string
  data?: {
    label: string
    value?: string
  }[]
}) {
  return role === 'dppm' ? (
    <Card className="flex flex-col grow p-6 gap-4 text-muted-foreground">
      <h5 className="font-semibold capitalize">{title}</h5>
      <EachUtil
        of={[1, 2, 3, 4, 5, 6, 7, 8]}
        render={(item, index) => (
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Badge className="bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground p-0 py-1.5 px-2.5">
                {index + 1}
              </Badge>
              <div className="flex flex-col text-muted-foreground capitalize">
                <p className="text-xs">Ketua {title.split(' ')[0]}</p>
                <p className="font-bold">asdasdasd</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ExternalLinkIcon />
            </Button>
          </div>
        )}
      />

      <Link
        href={`/dashboard/${role}/${title.split(' ')[0]}`}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
        )}
      >
        Lihat Semua
      </Link>
    </Card>
  ) : role === 'dosen' || role === 'kaprodi' ? (
    <Card className="flex flex-col grow p-6 text-muted-foreground">
      <h5 className="font-semibold capitalize">{title}</h5>
      <p>Berisikan informasi tentang data diri anda.</p>
      <EachUtil
        of={data!}
        render={(info, index) => (
          <InformationRow key={index} label={info.label} value={info.value} />
        )}
      />
    </Card>
  ) : null
}
