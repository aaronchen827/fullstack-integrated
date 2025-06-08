'use client'
import Logo from '@/components/layout/sidebar/Logo'
import MenuList from '@/components/layout/sidebar/MenuList'
import { GET_MENU_CONFIG_SELECT_ALL } from '@/lib/constants'
import { usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { findPathToNode } from '@/utils/menu.util'
import { setSelectedKey } from '@/store/slices/MenuSlice'
import { fetchClientApi } from '@/lib/fetcher/client'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const [menuData, setMenuData] = useState([])
  // const menuData: any[] = fetchClientApi(GET_MENU_CONFIG_SELECT_ALL)
  const pathname = usePathname()
  const dispatch = useDispatch()

  useEffect(() => {
    const getMenuList = async () => {
      const resp = await fetchClientApi(GET_MENU_CONFIG_SELECT_ALL)
      setMenuData(resp)
      console.log('menuData=', menuData)
      const paths = findPathToNode(resp, pathname)
      console.log('paths', paths)
      if (paths && paths.length > 0) {
        paths.map((path) => {
          path.isOpen = true
        })
      }
      if (paths && paths.length > 0) {
        const current = paths[paths.length - 1]
        if (!current.subList || current.subList.length === 0) {
          dispatch(setSelectedKey(current.id))
        }
      }
    }
    getMenuList()
  }, [pathname])

  if (!menuData) return null
  return (
    <div className="w-88 bg-[#354152] text-white min-h-screen">
      <Logo />
      <div className="mt-2">
        <MenuList menuList={menuData} level={0} />
      </div>
    </div>
  )
}
