'use client'
import { useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function IframePage() {
  const searchParams = useSearchParams()
  const iframeUrl = searchParams.get('iframeUrl') || 'https://www.google.com.hk/'
  console.log('iframeUrl=', iframeUrl)
  return <iframe src={iframeUrl} className="w-full h-full border-none" />
}
