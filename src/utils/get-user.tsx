import { getCookie } from '~/lib/cookie'
import { decrypt } from '~/lib/crypto'

export function getUser() {
  const encryptedUser = getCookie('user')
  if (!encryptedUser) return null
  return JSON.parse(decrypt(encryptedUser))
}
