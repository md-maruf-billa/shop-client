export type TResponse = {
  data?: {
    success: boolean
    message: string
    data?: any
  }
  error?: {
    data?: {
      success: boolean
      message: string
      error?: any
    }
  }
}

export type TAPIParams = {
  name: string
  value: string
}
