import FormKaprodi from '~/components/formKaprodi'
import { Card, CardContent, CardHeader } from '~/components/ui/card'

export default function TambahKaprodi() {
  return (
    <Card className="flex flex-col items-center justify-center gap-2">
      <CardHeader className="text-center font-bold uppercase text-lg md:text-xl xl:text-2xl">
        Tambah Kaprodi
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <FormKaprodi />
      </CardContent>
    </Card>
  )
}
