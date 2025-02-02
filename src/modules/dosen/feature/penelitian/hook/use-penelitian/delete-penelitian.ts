import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PenelitianDosenResponse } from "../../penelitian-dosen.interface"
import { deletePenelitian } from "../../penelitian-dosen.service"

interface Props {
  onSuccess: (res: PenelitianDosenResponse) => void
  onError: (err: AxiosError<PenelitianDosenResponse>) => void
}

export const useDeletePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PenelitianDosenResponse,
    AxiosError<PenelitianDosenResponse>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await deletePenelitian(id),
    onSuccess,
    onError,
  })
}
