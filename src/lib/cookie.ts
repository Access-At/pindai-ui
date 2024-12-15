'use client'
import {
  setCookie as set,
  getCookie as get,
  deleteCookie as del,
  hasCookie as has,
} from 'cookies-next'

export function hasCookie(name: string) {
  return has(name, {
    httpOnly: process.env.NEXT_PUBLIC_PROTOCOL === 'https' ? true : false,
    secure: process.env.NEXT_PUBLIC_PROTOCOL === 'https' ? true : false,
    sameSite: 'strict',
  })
}

export function getCookie(name: string) {
  return get(name, {
    httpOnly: process.env.NEXT_PUBLIC_PROTOCOL === 'https' ? true : false,
    secure: process.env.NEXT_PUBLIC_PROTOCOL === 'https' ? true : false,
    sameSite: 'strict',
  })
}

export function setCookie(name: string, value: string) {
  set(name, value, {
    httpOnly: process.env.NEXT_PUBLIC_PROTOCOL === 'https' ? true : false,
    secure: process.env.NEXT_PUBLIC_PROTOCOL === 'https' ? true : false,
    sameSite: 'strict',
  })
}

export function removeCookie(name: string) {
  del(name, {
    httpOnly: process.env.NEXT_PUBLIC_PROTOCOL === 'https' ? true : false,
    secure: process.env.NEXT_PUBLIC_PROTOCOL === 'https' ? true : false,
    sameSite: 'strict',
  })
}
