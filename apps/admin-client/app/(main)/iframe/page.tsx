'use client'
import { useSearchParams } from 'next/navigation'

export default function IframePage() {
  const searchParams = useSearchParams()
  const iframeUrl = searchParams.get('iframeUrl') || 'https://www.baidu.com'
  console.log('iframeUrl=', iframeUrl)
  return <iframe src={iframeUrl} className="w-full h-full border-none" />
}
