import { ArrowRightIcon } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from '~/components/ui/badge'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import Link from 'next/link'

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

export function ActionCard({ title, role }: { title: string; role: string }) {
  return (
    <Card className="flex flex-col grow p-6 gap-4 text-muted-foreground capitalize">
      <Badge
        className={cn({
          'bg-green-500/30 text-green-500 hover:bg-green-500 hover:text-primary-foreground size-fit uppercase':
            title === 'penelitian',
          'bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground size-fit uppercase':
            title === 'pengabdian',
        })}
      >
        {title}
      </Badge>
      {role === 'dppm' ? (
        <span className="flex gap-2">
          <span className="text-muted-foreground">data:</span>
          <Badge
            className={cn(
              'bg-green-500/30 text-green-500 hover:bg-green-500 hover:text-primary-foreground size-fit uppercase',
            )}
          >
            disetujui 10
          </Badge>
          <span>/</span>
          <Badge
            className={cn(
              'bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground size-fit uppercase',
            )}
          >
            ditolak 10
          </Badge>
        </span>
      ) : role === 'dosen' || role === 'kaprodi' ? (
        <Link
          href={`/dashboard/${role}/${title.toLowerCase()}`}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
          )}
        >
          <ArrowRightIcon className="h-4 w-4" />
          <span className="capitalize">
            {role ? `ajukan ${title}` : `lihat ajuan ${title}`}
          </span>
        </Link>
      ) : null}
    </Card>
  )
}
