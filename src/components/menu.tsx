import { HomeIcon, LayersIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '~/lib/utils'
import EachUtil from '~/utils/each-util'
import { buttonVariants } from './ui/button'
import { SidebarMenuItem, SidebarMenu } from './ui/sidebar'
import { SelectedMenu } from '~/constant/navigation-menu'

export const MenuItem = ({
  href,
  name,
  list,
  isActive,
}: {
  href: string
  list?: string
  name: string
  isActive: boolean
}) => (
  <Link
    href={href}
    className={cn('relative', {
      'pl-6': list,
      'px-6': !list,
    })}
  >
    <SidebarMenuItem
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'gap-2 w-full justify-start hover:bg-primary/30 hover:text-primary',
        {
          'bg-primary/30 text-primary hover:text-primary-foreground hover:bg-primary':
            isActive,
        },
      )}
    >
      {name === 'dashboard' ? <HomeIcon /> : <LayersIcon />}
      <span className="capitalize">{name}</span>
    </SidebarMenuItem>
    {isActive && (
      <div className="absolute right-0 top-0 h-full w-[2px] bg-primary bg-[length:1px_100%] rounded-full" />
    )}
  </Link>
)

export const GroupContent = ({
  data,
  role,
  isActivePage,
}: {
  data: SelectedMenu[]
  role: string
  isActivePage: (path: string) => boolean
}) => (
  <SidebarMenu className="w-full">
    <EachUtil
      of={data}
      render={(item, index) =>
        item.roles.includes(role) && (
          <MenuItem
            key={index}
            href={
              item.list
                ? `/dashboard/${role}/${item.list.split(' ')[0]}/${item.name}`
                : `/dashboard/${role}/${item.name}`
            }
            list={item.list}
            name={item.name}
            isActive={isActivePage(
              item.list
                ? `/dashboard/${role}/${item.list.split(' ')[0]}/${item.name}`
                : `/dashboard/${role}/${item.name}`,
            )}
          />
        )
      }
    />
  </SidebarMenu>
)
