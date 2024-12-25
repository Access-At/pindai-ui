import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import AppSidebar from '~/components/app-sidebar'
import ProfileButton from '~/components/profile-button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { getCookieDecrypted } from '~/utils/cookie'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCookieDecrypted('user')
  const cookie = await cookies()
  const isLogin = cookie.has('access_token')
  if (!isLogin) {
    return redirect('/', 'push' as RedirectType)
  }

  return (
    <SidebarProvider>
      <AppSidebar role={user?.role} />
      <SidebarInset className="bg-primary/5 overflow-auto">
        <div className="flex flex-col px-6 flex-grow">
          <nav className="bg-background my-5 rounded-lg py-4 sticky top-0 z-10 shadow-md">
            <div className="px-6 flex items-center justify-between">
              <TooltipProvider disableHoverableContent>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarTrigger />
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="bg-black text-primary-foreground text-sm uppercase"
                  >
                    Toggle Sidebar
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ProfileButton role={user?.role} name={user?.name} />
            </div>
          </nav>
          <div className="flex flex-col flex-shrink mb-11">{children}</div>
          <footer className="absolute space-x-2 text-muted-foreground bottom-0">
            <span>&copy; 2024, made by</span>
            <span className="font-bold uppercase">Access Dev Team</span>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
