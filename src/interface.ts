interface authResopnse {
  access_token: string
  token_type: string
  user: string
}

export interface response {
  data: authResopnse
  message: string
  status: string
  error?: string
}
