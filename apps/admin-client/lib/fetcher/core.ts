// lib/fetcher.ts
import { cookies } from 'next/headers'

type FetcherOptions = {
  method?: 'GET' | 'POST'
  data?: any
  headers?: Record<string, string>
  cache?: RequestCache
  token?: string
}

export async function baseFetch<T = any>(
  endpoint: string,
  options: FetcherOptions = {},
  sourceType = 'client'
): Promise<T> {
  const { method = 'POST', data, headers = {}, cache = 'no-store', token = '' } = options
  const url =
    sourceType === 'client'
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`
      : `${process.env.API_BASE_URL}${endpoint}`
  console.log('url=', url)
  console.log('headers=', headers)
  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // ...headers,
    },
    body: method === 'POST' ? JSON.stringify(data) : undefined,
    cache,
  })
  if (!res.ok) {
    const errorText = await res.text()
    console.error(`[fetchApi] ${method} ${endpoint} failed:`, errorText)
    throw new Error('request failed')
  }
  const json = await res.json()
  if (json.code !== 200) {
    return json
  }
  return json.data
}
