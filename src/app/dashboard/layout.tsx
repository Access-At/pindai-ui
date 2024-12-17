import AppSidebar from '~/components/app-sidebar'
import ProfileButton from '~/components/profile-button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/ui/sidebar'
import { getCookieDecrypted } from '~/utils/cookie'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCookieDecrypted('user')

  return (
    <SidebarProvider>
      <AppSidebar role={user?.role} />
      <SidebarInset className="bg-primary/5">
        <div className="flex flex-col container mx-auto px-6 relative">
          <nav className="bg-background my-5 rounded-lg py-4 sticky top-0 z-10 shadow-md">
            <div className="px-6 flex items-center justify-between">
              <SidebarTrigger />
              <ProfileButton role={user?.role} name={user?.name} />
            </div>
          </nav>
          <div className="flex flex-col">{children}</div>
          <footer className="mt-5 py-4 space-x-2 text-muted-foreground">
            <span>&copy; 2024, made by</span>
            <span className="font-bold uppercase">Access Dev Team</span>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
