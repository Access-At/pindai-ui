import crypto from 'crypto'

const secretKey = process.env.NEXT_PUBLIC_SECURE_API_KEY || ''

export const createTimestamp = () => Math.floor(Date.now() / 1000)

export const createSignature = (payload: string) => {
  return crypto.createHmac('sha256', secretKey).update(payload).digest('hex')
}

export const createPayload = (
  timestamp: number,
  salt: string,
  body: object,
) => {
  return `${timestamp}${salt}${JSON.stringify(body)}`
}

export const createSalt = () => {
  return crypto.randomBytes(16).toString('hex') // Salt dinamis
}
