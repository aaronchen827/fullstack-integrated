'use client'
import { fetchClientApi } from '@/lib/fetcher/client'
import { useEffect, useState } from 'react'
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import PermissionTree from '@/app/(main)/menu-config/PermissionTree'
import { GET_MENU_CONFIG_SELECT_ALL } from '@/lib/constants'

export default function MenuConfigPage() {
  const [menuConfigData, setMenuConfigData] = useState([])

  const getMenuConfigData = async (): Promise<void> => {
    const resp = await fetchClientApi(GET_MENU_CONFIG_SELECT_ALL)
    console.log('getMenuConfigData=', resp)
    setMenuConfigData(resp)
  }
  useEffect(() => {
    getMenuConfigData()
  }, [])

  return (
    <Box>
      <Box sx={{ marginTop: 4, marginLeft: 3 }}>
        {/*<Typography variant="h6" gutterBottom>*/}
        {/*  菜单配置*/}
        {/*</Typography>*/}
      </Box>
      {/*<Divider />*/}
      {menuConfigData && menuConfigData.length > 0 && (
        <PermissionTree menuConfigData={menuConfigData} />
      )}
    </Box>
  )
}
