import { cookies } from 'next/headers'
import { baseFetch } from './core'

export async function fetchApi<T>(endpoint: string, options = {}): Promise<T> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value ?? ''
  return baseFetch<T>(endpoint, { ...options, token }, 'client')
}
