import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip'

export default function ActionButton({
  icon,
  label,
  tooltip,
  className,
  isIcon = false,
}: {
  icon: React.ReactNode
  label?: string
  tooltip: string
  className: string
  isIcon?: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size={isIcon ? 'icon' : undefined}
          className={className}
        >
          {icon}
          {label}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-black text-white text-sm tracking-wider">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}
