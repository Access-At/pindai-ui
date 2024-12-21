import Link from 'next/link'
import { buttonVariants } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { cn } from '~/lib/utils'

export default function ActionButton({
  icon,
  label,
  tooltip,
  className,
  href,
  isIcon = false,
}: {
  href?: string
  icon: React.ReactNode
  label?: string
  tooltip: string
  className: string
  isIcon?: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href || '#'}
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: isIcon ? 'icon' : undefined,
            }),
            className,
          )}
        >
          {icon}
          {label}
        </Link>
      </TooltipTrigger>
      <TooltipContent className="bg-black text-white text-sm tracking-wider">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}
