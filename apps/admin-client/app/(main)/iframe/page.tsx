'use client'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'

function IframePage() {
  const searchParams = useSearchParams()
  const iframeUrl = searchParams.get('iframeUrl') || 'https://www.google.com.hk/'
  console.log('iframeUrl=', iframeUrl)
  return <iframe src={iframeUrl} className="w-full h-full border-none" />
}

export default dynamic(() => Promise.resolve(IframePage), {
  ssr: false,
})
