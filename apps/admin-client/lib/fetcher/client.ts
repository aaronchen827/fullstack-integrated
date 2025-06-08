import { baseFetch } from './core'

export async function fetchClientApi<T>(endpoint: string, options = {}): Promise<any> {
  const token = typeof window !== 'undefined' ? (localStorage.getItem('token') ?? '') : ''
  console.log('fetchClientApi token=', token)
  console.log('fetchClientApi endpoint=', endpoint)
  return baseFetch<T>(endpoint, { ...options, token }, 'client')
}
