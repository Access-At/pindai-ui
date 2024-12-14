"use client";
import { HomeIcon, LayersIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarContent,
} from "./ui/sidebar";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { cn } from "~/lib/utils";
import EachUtil from "../utils/each-util";
import { usePathname } from "next/navigation";

const mainMenu = [
  {
    name: "penelitian",
  },
  {
    name: "pengabdian",
  },
  {
    name: "publikasi",
  },
];

export default function AppSidebar({ role }: { role?: string }) {
  const pathname = usePathname();
  const isActivePage = (path: string) => path === pathname;
  return (
    <Sidebar variant="inset" className="p-0">
      <SidebarHeader className="flex flex-row items-center py-5 px-6">
        <Image src="/logo.svg" width={25} height={42} alt="Pindai Logo" />
        <span className="font-bold lowercase text-2xl">Pindai</span>
      </SidebarHeader>
      <SidebarContent className="my-2 space-y-2 p-0">
        <SidebarMenu className="space-y-2 w-full">
          <Link href="/dashboard/dosen" className="px-6 relative">
            <SidebarMenuItem
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "gap-2 w-full justify-start hover:bg-primary/30 hover:text-primary",
                isActivePage("/dashboard/dosen") ? "bg-primary/30 text-primary hover:text-primary-foreground hover:bg-primary" : ""
              )}
            >
              <HomeIcon />
              <span>Dashboard</span>
            </SidebarMenuItem>
            <div
              className={cn(
                isActivePage("/dashboard/dosen") ? "absolute right-0 top-0 h-full w-[2px] bg-primary bg-[length:1px_100%] rounded-full" : ""
              )}
            />
          </Link>
        </SidebarMenu>
        <SidebarGroup className="px-0 space-y-2">
          <div className="flex items-center">
            <Separator className="w-[1rem] bg-black" />
            <SidebarGroupLabel className="uppercase">Main Menu</SidebarGroupLabel>
          </div>
          <SidebarMenu className="space-y-2 w-full">
            <EachUtil
              of={mainMenu}
              render={({ name }, index) => (
                <Link href={`/dashboard/dosen/${name}`} className={cn("relative px-6")} key={index}>
                  <SidebarMenuItem
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "gap-2 w-full justify-start hover:bg-primary/30 hover:text-primary",
                      isActivePage(`/dashboard/dosen/${name}`) ? "bg-primary/30 text-primary hover:text-primary-foreground hover:bg-primary" : ""
                    )}
                  >
                    <LayersIcon />
                    <span className="capitalize">{name}</span>
                  </SidebarMenuItem>

                  <div
                    className={cn(
                      isActivePage(`/dashboard/dosen/${name}`)
                        ? "absolute right-0 top-0 h-full w-[2px] bg-primary bg-[length:1px_100%] rounded-full"
                        : ""
                    )}
                  />
                </Link>
              )}
            />
          </SidebarMenu>
        </SidebarGroup>
        {role === "kaprodi" || role === "dppm" ? (
          <SidebarGroup className="px-0">
            <div className="flex items-center">
              <Separator className="w-[1rem] bg-black" />
              <SidebarGroupLabel className="uppercase">Main Menu</SidebarGroupLabel>
            </div>
            <SidebarGroupContent>
              <SidebarMenu className="px-6">
                <Button asChild className="cursor-pointer justify-start" variant="ghost">
                  <SidebarMenuItem>Penelitian</SidebarMenuItem>
                </Button>
                <Button asChild className="cursor-pointer justify-start" variant="ghost">
                  <SidebarMenuItem>Pengabdian</SidebarMenuItem>
                </Button>
                <Button asChild className="cursor-pointer justify-start" variant="ghost">
                  <SidebarMenuItem>Publikasi</SidebarMenuItem>
                </Button>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
    </Sidebar>
  );
}
