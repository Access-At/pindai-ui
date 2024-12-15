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
import { getUser } from '~/utils/get-user'
import { Button, buttonVariants } from './ui/button'
import { cn } from '~/lib/utils'
import { removeCookie } from '~/lib/cookie'
import { useRouter } from 'next/navigation'
import { logoutUser } from '~/api/request/auth-request'
import { toast } from 'sonner'

export default function ProfileButton() {
  const router = useRouter()
  const user = getUser()

  const handleLogout = () => {
    logoutUser()
      .then((res) => {
        toast.success(res.data.message, {})
        removeCookie('access_token')
        removeCookie('user')
        router.push('/')
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
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-52">
        <DropdownMenuItem className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-muted-foreground capitalize">
              nama user
            </span>
            <span className="font-medium text-muted-foreground capitalize">
              role
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-300" />
        <Link
          href={`/dashboard/${user.role}/akun-saya`}
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
