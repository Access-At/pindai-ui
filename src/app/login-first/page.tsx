import Link from 'next/link'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function LoginFirst() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Silakan Login</h1>
        <p className="text-xl mb-6">Anda perlu login untuk melanjutkan.</p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
          )}
        >
          Login
        </Link>
      </div>
    </div>
  )
}
