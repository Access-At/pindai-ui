export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1">{children}</div>
    </div>
  )
}
