import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { DosenResponse, ProfileDosen } from "../../dosen.interface"
import { updateProfile } from "../../dosen.service"
import { ProfileType } from "../../profile.schema"

interface Props {
  onSuccess: (response: DosenResponse<ProfileDosen>) => void
  onError: (error: AxiosError<Response>) => void
}

export const useUpdateProfile = ({ onSuccess, onError }: Props) => {
  return useMutation<
    DosenResponse<ProfileDosen>,
    AxiosError<Response>,
    ProfileType
  >({
    mutationFn: (data: ProfileType) => updateProfile(data),
    onSuccess,
    onError,
  })
}
