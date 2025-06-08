import { redirect } from 'next/navigation'
import './globals.css'

export default function RootPage() {
  redirect('/home')
}
