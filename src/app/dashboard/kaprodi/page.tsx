import { EllipsisVerticalIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Fakultas, fakultas } from '~/dummy'
import EachUtil from '~/utils/each-util'
import { Badge } from '~/components/ui/badge'

export default function Kaprodi() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl text-muted-foreground">Fakultas (10)</h2>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        <EachUtil
          of={fakultas}
          render={(item: Fakultas, index) => (
            <Card key={index} className="grow">
              <CardHeader className="flex flex-row items-center justify-between text-sm">
                <Badge className="bg-primary/30 text-primary rounded-lg text-center px-3 py-1.5 hover:text-primary-foreground">
                  {index + 1}
                </Badge>
                <EllipsisVerticalIcon className="text-muted-foreground h-5 w-5" />
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4 text-muted-foreground">
                <h1 className="text-lg leading-none capitalize">{item.name}</h1>
                <p className="flex items-start gap-2 capitalize">
                  <span className="text-2xl">{item.jumlahDosen}</span> dosen
                </p>
              </CardContent>
            </Card>
          )}
        />
      </div>
    </div>
  )
}
