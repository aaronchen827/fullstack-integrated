'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid'
import { Button } from '@mui/material'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo, UserInfo } from '@/store/slices/MenuSlice'
import { fetchClientApi } from '@/lib/fetcher/client'
import { GET_USER_INFO, USER_LOGIN_OUT } from '@/lib/constants'

export default function Navbar() {
  const userInfo: UserInfo = useSelector((state: RootState): any => state.menu?.userInfo)
  const router = useRouter()
  const dispatch = useDispatch()
  const handleLogout = async () => {
    const json = await fetchClientApi(USER_LOGIN_OUT)
    console.log('logout resp=', json)
    dispatch(setUserInfo(null))
    router.replace('/login')
  }
  return (
    <div>
      <div className="w-full h-13 flex justify-between items-center border-b-[#d8dce5] shadow">
        <ChevronLeftIcon className="w-8 h-8 ml-2" />
        <div className="flex items-center mr-4">
          <div className="mr-2">{userInfo?.username}</div>
          <Button onClick={handleLogout}>Sign Out</Button>
        </div>
      </div>
    </div>
  )
}
