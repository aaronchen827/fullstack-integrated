'use client'
import Sidebar from '@/components/layout/sidebar/Sidebar'
import AppMain from '@/components/layout/AppMain'
import Navbar from '@/components/layout/Navbar'
import TagsView from '@/components/layout/tagsView/TagsView'
import { fetchClientApi } from '@/lib/fetcher/client'
import { GET_USER_INFO, USER_LOGIN } from '@/lib/constants'
import { setUserInfo } from '@/store/slices/MenuSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch()
  const getUserInfo = async () => {
    const json = await fetchClientApi(GET_USER_INFO)
    if (json?.username) {
      dispatch(setUserInfo({ username: json.username }))
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <AppMain>
        <Navbar />
        <TagsView>{children}</TagsView>
      </AppMain>
    </div>
  )
}
