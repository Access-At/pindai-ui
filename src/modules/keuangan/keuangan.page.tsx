import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb"
import InfoPenelitian from "../dppm/components/info-penelitian"
import InfoPengabdian from "../dppm/components/info-pengabdian"
import { Penelitian } from "../dppm/dashboard.interface"

export default function KeuanganPage() {
  // const { data, isLoading } = useDashboard()

  // if (isLoading) return <div>Loading...</div>

  return (
    <div className='space-y-4'>
      <section className='flex flex-col gap-3'>
        <Breadcrumb>
          <BreadcrumbPage className='text-muted-foreground'>
            Dashboard
          </BreadcrumbPage>
        </Breadcrumb>
        <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
          {/* <EachUtil
            of={data?.fakultas || []}
            render={(fakultas: Fakultas, index) => (
              <CardFakultas data={fakultas} index={index} key={index} />
            )}
          /> */}
        </div>
      </section>
      <section className='flex flex-col gap-3'>
        <Breadcrumb>
          <BreadcrumbPage className='text-muted-foreground'>
            Penelitian / Pengabdian
          </BreadcrumbPage>
        </Breadcrumb>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-start'>
          <InfoPenelitian penelitian={{} as Penelitian} />
          <InfoPengabdian />
        </div>
      </section>
    </div>
  )
}
