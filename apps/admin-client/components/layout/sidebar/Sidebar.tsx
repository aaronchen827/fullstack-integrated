'use client'
import Logo from '@/components/layout/sidebar/Logo'
import MenuList from '@/components/layout/sidebar/MenuList'
import { GET_MENU_CONFIG_SELECT_ALL, GET_MENU_CONFIG_SELECT_USER_MENU } from '@/lib/constants'
import { usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { findPathToNode } from '@/utils/menu.util'
import { setSelectedKey } from '@/store/slices/MenuSlice'
import { fetchClientApi } from '@/lib/fetcher/client'
import { useEffect, useState } from 'react'
import { Box, alpha } from '@mui/material'

export default function Sidebar() {
  const [menuData, setMenuData] = useState([])
  // const menuData: any[] = fetchClientApi(GET_MENU_CONFIG_SELECT_ALL)
  const pathname = usePathname()
  const dispatch = useDispatch()

  useEffect(() => {
    const getMenuList = async () => {
      const resp = await fetchClientApi('/admin/menu/selectUserMenu')
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
    <Box
      sx={{
        width: 280,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: (theme) => `0 0 20px ${alpha(theme.palette.common.black, 0.05)}`,
        },
      }}
    >
      <Logo />
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: (theme) => alpha(theme.palette.primary.main, 0.2),
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: (theme) => alpha(theme.palette.primary.main, 0.3),
          },
        }}
      >
        <MenuList menuList={menuData} level={0} />
      </Box>
    </Box>
  )
}
