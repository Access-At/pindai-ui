'use server'

import { cookies } from 'next/headers'
import { decrypt } from '~/lib/crypto'

export async function setCookie(key: string, value: string) {
  const cookie = await cookies()
  cookie.set(key, value)
}

export async function getCookie(key: string) {
  const cookie = await cookies()
  return cookie.get(key)?.value
}

// type UserType = {
//   name: string
//   role: string
// }

export async function getCookieDecrypted(key: string) {
  const cookie = await cookies()
  const value = cookie.get(key)?.value
  return value ? JSON.parse(decrypt(value).data as string) : ''
}

export async function removeCookie(key: string) {
  const cookie = await cookies()
  cookie.delete(key)
}
