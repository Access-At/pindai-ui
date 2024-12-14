import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export default function Login() {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 flex-grow">
      <CardHeader className="text-center font-bold uppercase text-lg md:text-xl xl:text-2xl">Login</CardHeader>
      <CardContent>
        <form>
          <Button asChild>
            <Link href="/dashboard/dosen">Dashboard</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
