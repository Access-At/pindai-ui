'use client'
import { ArchiveIcon, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarContent,
} from './ui/sidebar'
import Image from 'next/image'
import { Separator } from './ui/separator'
import EachUtil from '../utils/each-util'
import { usePathname } from 'next/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { navigationData } from '~/constant/navigation-menu'
import { MenuItem, GroupContent } from './menu'

export default function AppSidebar({ role }: { role: string }) {
  const pathname = usePathname()
  const isActivePage = (path: string) => path === pathname

  return (
    <Sidebar variant="inset" className="p-0">
      <SidebarHeader className="flex flex-row items-center py-5 px-6">
        <Image src="/logo.svg" width={25} height={42} alt="Pindai Logo" />
        <span className="font-bold lowercase text-2xl">Pindai</span>
      </SidebarHeader>
      <SidebarContent className="space-y-2 p-0">
        <SidebarMenu className="space-y-2 w-full">
          <MenuItem
            href={`/dashboard/${role}`}
            name="dashboard"
            isActive={isActivePage(`/dashboard/${role}`)}
          />
        </SidebarMenu>
        {(role === 'kaprodi' || role === 'dppm') && (
          <SidebarGroup className="px-0">
            <div className="flex items-center">
              <Separator className="w-[1rem] bg-black" />
              <SidebarGroupLabel className="uppercase">
                Management Data
              </SidebarGroupLabel>
            </div>
            <SidebarGroupContent>
              <GroupContent
                data={navigationData.management}
                role={role}
                isActivePage={isActivePage}
              />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup className="px-0 space-y-2">
          <div className="flex items-center">
            <Separator className="w-[1rem] bg-black" />
            <SidebarGroupLabel className="uppercase">
              Main Menu
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent className="space-y-1">
            <GroupContent
              data={navigationData.main}
              role={role}
              isActivePage={isActivePage}
            />
            <EachUtil
              of={navigationData.sub}
              render={(item, index) =>
                item.roles.includes(role) && (
                  <Collapsible className="group/collapsible" key={index}>
                    <SidebarGroup className="p-0 px-6">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="group-data-[state=open]/collapsible:bg-primary/30 group-data-[state=open]/collapsible:text-primary hover:bg-primary/30 hover:text-primary text-sm capitalize justify-between pr-2"
                        >
                          <div className="flex gap-2">
                            <ArchiveIcon />
                            {item.name}
                          </div>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <SidebarGroupContent>
                          <GroupContent
                            data={item.mainMenu.map((name: string) => ({
                              list: item.name,
                              name,
                              roles: [role],
                            }))}
                            role={role}
                            isActivePage={isActivePage}
                          />
                        </SidebarGroupContent>
                      </CollapsibleContent>
                    </SidebarGroup>
                  </Collapsible>
                )
              }
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
