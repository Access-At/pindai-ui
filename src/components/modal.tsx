import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

interface ModalProps {
  name: string
  variant:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
  title: string
  description: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

export default function Modal({
  name,
  variant,
  title,
  description,
  children,
  open,
  setOpen,
  ...props
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className="capitalize p-0 ml-2">
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent {...props}>
        <DialogTitle className="capitalize">{title}</DialogTitle>
        <DialogDescription className="capitalize">
          {description}
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}
