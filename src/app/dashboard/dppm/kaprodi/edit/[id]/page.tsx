'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { fetchKaprodiDppmById } from '~/api/request/dppm-request'
import FormKaprodi from '~/components/formKaprodi'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import { KaprodiType } from '~/zodSchema/dppm/kaprodi'

export default function EditKaprodi() {
  const params = useParams()
  const [data, setData] = useState<KaprodiType>()

  const fetchKaprodi = async (id: string) => {
    try {
      await fetchKaprodiDppmById(id).then((res) => {
        setData(res.data)
      })
    } catch (error) {
      console.error('Error fetching kaprodi:', error)
      toast.error('Failed to fetch kaprodi. Please try again.')
    }
  }

  useEffect(() => {
    fetchKaprodi(params.id as string)
  }, [params.id])

  return (
    <Card className="flex flex-col items-center justify-center gap-2">
      <CardHeader className="text-center font-bold uppercase text-lg md:text-xl xl:text-2xl">
        Edit Kaprodi
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <FormKaprodi initialData={data} id={params.id as string} isEdit />
      </CardContent>
    </Card>
  )
}
