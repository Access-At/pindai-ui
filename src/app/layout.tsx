import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(poppins.className)}>
        <Toaster
          position='top-center'
          toastOptions={{
            classNames: {
              success:
                "text-green-600 border-green-600 capitalize bg-background",
              error: "text-red-600 border-red-600 capitalize bg-background",
              loading:
                "text-foreground border-foreground capitalize bg-background",
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
