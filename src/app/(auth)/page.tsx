import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card'
import LoginForm from '~/components/page/login'
import Register from '~/components/page/register'

export default async function Login() {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 w-[23rem]">
      <CardHeader className="text-center font-bold uppercase text-lg md:text-xl xl:text-2xl">
        Login
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <LoginForm />
      </CardContent>
      <CardFooter className="text-muted-foreground capitalize text-sm space-x-2">
        tidak memiliki akun ?
        <Register />
      </CardFooter>
    </Card>
  )
}
