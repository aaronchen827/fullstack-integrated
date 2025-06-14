'use client'

import { useRouter } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AccountCircle,
  Settings,
  Logout,
} from '@mui/icons-material'
import { RootState } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo, UserInfo } from '@/store/slices/MenuSlice'
import { fetchClientApi } from '@/lib/fetcher/client'
import { GET_USER_INFO, USER_LOGIN_OUT } from '@/lib/constants'
import { useState } from 'react'

export default function Navbar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null)
  const userInfo: UserInfo = useSelector((state: RootState): any => state.menu?.userInfo)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMobileMenuAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      const json = await fetchClientApi(USER_LOGIN_OUT)
      dispatch(setUserInfo(null))
      router.replace('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
    handleMenuClose()
  }

  const handleProfileClick = () => {
    // TODO: Implement profile page navigation
    handleMenuClose()
  }

  const handleSettingsClick = () => {
    // TODO: Implement settings page navigation
    handleMenuClose()
  }

  const menuId = 'primary-search-account-menu'
  const mobileMenuId = 'primary-search-account-menu-mobile'

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1.5,
          minWidth: 180,
          borderRadius: 1,
          '& .MuiMenuItem-root': {
            px: 2,
            py: 1.5,
          },
        },
      }}
    >
      <MenuItem onClick={handleProfileClick}>
        <AccountCircle sx={{ mr: 1.5, fontSize: 20 }} />
        Profile
      </MenuItem>
      <MenuItem onClick={handleSettingsClick}>
        <Settings sx={{ mr: 1.5, fontSize: 20 }} />
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
        <Logout sx={{ mr: 1.5, fontSize: 20 }} />
        Sign Out
      </MenuItem>
    </Menu>
  )

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(mobileMenuAnchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1.5,
          minWidth: 180,
          borderRadius: 1,
        },
      }}
    >
      <MenuItem onClick={handleProfileClick}>
        <AccountCircle sx={{ mr: 1.5, fontSize: 20 }} />
        Profile
      </MenuItem>
      <MenuItem onClick={handleSettingsClick}>
        <Settings sx={{ mr: 1.5, fontSize: 20 }} />
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
        <Logout sx={{ mr: 1.5, fontSize: 20 }} />
        Sign Out
      </MenuItem>
    </Menu>
  )

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton color="inherit" aria-label="navigate back" sx={{ mr: 1 }}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="navigate forward">
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!isMobile && (
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              {userInfo?.username}
            </Typography>
          )}

          <Tooltip title="Account settings">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  fontSize: '0.875rem',
                }}
              >
                {userInfo?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      {renderMenu}
      {renderMobileMenu}
    </AppBar>
  )
}
