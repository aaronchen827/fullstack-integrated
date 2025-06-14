'use client'
import { fetchClientApi } from '@/lib/fetcher/client'
import { useEffect, useState } from 'react'
import { Box, Container, Typography, Paper } from '@mui/material'
import PermissionTree from '@/app/(main)/menu-management/PermissionTree'
import { GET_MENU_CONFIG_SELECT_ALL } from '@/lib/constants'

export default function MenuConfigPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 3,
          }}
        >
          Menu Configuration
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your application's menu structure and navigation
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          {menuConfigData && menuConfigData.length > 0 && (
            <PermissionTree menuConfigData={menuConfigData} />
          )}
        </Paper>
      </Box>
    </Container>
  )
}
