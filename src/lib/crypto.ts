/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '' // Harus 32 karakter
const IV_LENGTH = 12 // Panjang IV untuk AES-GCM
const TAG_LENGTH = 16 // Panjang tag autentikasi

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error('Encryption key must be 32 characters long.')
}

// Fungsi Enkripsi
export function encrypt(data: any) {
  const iv = crypto.randomBytes(IV_LENGTH) // Buat IV random
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
  const encryptedData = Buffer.concat([
    cipher.update(data, 'utf8'),
    cipher.final(),
  ])
  const authTag = cipher.getAuthTag() // Ambil tag autentikasi

  // Gabungkan IV, tag, dan data terenkripsi
  return Buffer.concat([iv, authTag, encryptedData]).toString('base64')
}

// Fungsi Dekripsi
export function decrypt(encryptedData: any) {
  const bufferData = Buffer.from(encryptedData, 'base64')
  const iv = bufferData.slice(0, IV_LENGTH) // Ambil IV
  const tag = bufferData.slice(IV_LENGTH, IV_LENGTH + TAG_LENGTH) // Ambil tag
  const encrypted = bufferData.slice(IV_LENGTH + TAG_LENGTH) // Data terenkripsi

  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
  decipher.setAuthTag(tag) // Set tag autentikasi
  const decryptedData = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ])

  return decryptedData.toString('utf8')
}
