export interface IHttpBasicResponse<T>{
    data?: T
    error?: { message: any }
    message?: any //<-- The error message
    status: 'success' | 'error'
    statusText?: string
    statusCode?: number
}