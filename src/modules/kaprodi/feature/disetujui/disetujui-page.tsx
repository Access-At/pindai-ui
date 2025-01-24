import Breadcrumb from "@/components/atom/bradcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PenelitianList from "./components/penelitian-list"
import PengabdianList from "./components/pengabdian-list"
import PublikasiList from "./components/publikasi-list"

export default function DisetujuiPage() {
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb href={"/dashboard/kaprodi"}>Disetujui</Breadcrumb>
      <Tabs defaultValue='penelitian'>
        <TabsList>
          <TabsTrigger value='penelitian' className='capitalize'>
            Penelitian
          </TabsTrigger>
          <TabsTrigger value='pengabdian' className='capitalize'>
            Pengabdian
          </TabsTrigger>
          <TabsTrigger value='publikasi' className='capitalize'>
            Publikasi
          </TabsTrigger>
        </TabsList>
        <TabsContent value='penelitian'>
          <PenelitianList />
        </TabsContent>
        <TabsContent value='pengabdian'>
          <PengabdianList />
        </TabsContent>
        <TabsContent value='publikasi'>
          <PublikasiList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
