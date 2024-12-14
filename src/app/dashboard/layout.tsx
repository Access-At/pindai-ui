import AppSidebar from "~/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="flex w-full max-h-screen overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex-1 bg-primary/5">
        <div className="flex flex-1 flex-col container mx-auto px-6">
          <nav className="bg-background my-5 rounded-lg py-4">
            <div className="px-6 flex items-center justify-between">
              <SidebarTrigger />
              <Avatar>
                <AvatarImage></AvatarImage>
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
            </div>
          </nav>
          <div className="flex flex-col overflow-hidden flex-grow">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
