import { Card, CardContent } from "@/components/ui/card"

export default function PengabdianList() {
  return (
    <Card>
      <CardContent className='py-6'>
        Pengabdian List Di setujui
        {/* <DataTable
            search
            filtering
            role={user?.role}
            columns={columns}
            data={data?.penelitian || []}
            meta={data?.meta}
            value={value}
            refetch={refetch}
            isLoading={isFetching}
            setValue={setValue}
            currentPage={currentPage}
            onPaginationChange={(page: number) => setCurrentPage(page)}
          /> */}
      </CardContent>
    </Card>
  )
}
