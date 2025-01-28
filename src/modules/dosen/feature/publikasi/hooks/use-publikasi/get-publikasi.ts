import { useQuery } from "@tanstack/react-query"
import { getPublikasi } from "../../publikasi-service"

export const useGetPublikasi = (
  page: number,
  search?: string,
  status_kaprodi?: string,
  status_dppm?: string,
  status_keuangan?: string,
) => {
  return useQuery({
    queryKey: [
      "publikasi",
      page,
      search,
      status_kaprodi,
      status_dppm,
      status_keuangan,
    ],
    queryFn: async () =>
      await getPublikasi(
        page,
        search,
        status_kaprodi,
        status_dppm,
        status_keuangan,
      ),
    staleTime: 2000,
    refetchOnWindowFocus: false,
  })
}