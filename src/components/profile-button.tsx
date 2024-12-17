'use client'
import { LogOutIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Button, buttonVariants } from './ui/button'
import { cn, getInitials } from '~/lib/utils'
import { useRouter } from 'next/navigation'
import { logoutUser } from '~/api/request/auth-request'
import { toast } from 'sonner'
import { removeCookie } from '~/utils/cookie'

export default function ProfileButton({
  role,
  name,
}: {
  role: string
  name: string
}) {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
      .then(async (res) => {
        toast.success(res.message, {})
        await removeCookie('access_token')
        await removeCookie('role')
        return router.push('/')
      })
      .catch((err) => {
        toast.error(err.response.data.message, {})
      })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage></AvatarImage>
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-64">
        <DropdownMenuItem className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 overflow-hidden">
            <span className="font-bold text-muted-foreground capitalize truncate">
              {name}
            </span>
            <span className="font-medium text-muted-foreground capitalize">
              {role}
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-300" />
        <Link
          href={`/dashboard/${role}/akun-saya`}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'w-full justify-start',
          )}
        >
          <DropdownMenuItem className="flex flex-row gap-4">
            <UserIcon className="text-muted-foreground" />
            <span className="font-bold text-muted-foreground capitalize">
              akun saya
            </span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="bg-gray-300" />
        <Button
          variant={'ghost'}
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <DropdownMenuItem className="flex flex-row gap-4">
            <LogOutIcon className="text-muted-foreground" />
            <span className="font-bold text-muted-foreground capitalize">
              logout
            </span>
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
