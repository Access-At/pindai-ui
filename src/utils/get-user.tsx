import { getCookie } from '~/lib/cookie'
import { decrypt } from '~/lib/crypto'

export function getUser() {
  const encryptedUser = getCookie('user')
  return JSON.parse(decrypt(encryptedUser))
}
