'use client'

import { Box, Grid, Typography, Card, CardContent, Stack, useTheme, alpha } from '@mui/material'
import { People, Settings, Menu as MenuIcon, CheckCircle } from '@mui/icons-material'

// Mock data - replace with real data from your API
const stats = {
  totalUsers: 156,
  totalMenus: 24,
  systemStatus: 'Healthy',
  lastUpdate: '2024-03-20 14:30:00',
}

const StatCard = ({ title, value, icon, color }: any) => {
  const theme = useTheme()

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: alpha(color, 0.1),
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h5" component="div" fontWeight="bold">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const theme = useTheme()

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to Operations Configurator
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your system operations efficiently
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<People />}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Menus"
              value={stats.totalMenus}
              icon={<MenuIcon />}
              color={theme.palette.info.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="System Status"
              value={stats.systemStatus}
              icon={<CheckCircle />}
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Last Update"
              value={stats.lastUpdate}
              icon={<Settings />}
              color={theme.palette.warning.main}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}
