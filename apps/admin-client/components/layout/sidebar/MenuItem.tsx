'use client'

import MenuList from '@/components/layout/sidebar/MenuList'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setSelectedKey } from '@/store/slices/MenuSlice'
import { useRouter } from 'next/navigation'
import { Box, Typography, Collapse, alpha } from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Link as LinkIcon,
} from '@mui/icons-material'

export default function MenuItem({ menuItem, level }: { menuItem: any; level: number }) {
  const isOpened = menuItem?.isOpen ? true : false
  const [isOpen, setIsOpen] = useState(isOpened)
  const router = useRouter()
  const menuList = menuItem.subList
  const hasChildren = menuList && menuList.length > 0
  const dispatch = useDispatch()
  const selectedKey: string = useSelector((state: RootState): any => state.menu.selectedKey)
  const isSelected = selectedKey === menuItem.id

  const handleClick = () => {
    setIsOpen(!isOpen)
    if (!hasChildren) {
      if (isSelected) return
      dispatch(setSelectedKey(menuItem.id))
      if (menuItem.path) {
        router.push(menuItem.path)
      } else if (menuItem.menuUrl && menuItem.menuUrl.includes('http')) {
        router.push('iframe?iframeUrl=' + menuItem.menuUrl)
      }
    }
  }

  const getIcon = () => {
    if (level === 1) {
      if (menuItem.menuName.toLowerCase().includes('dashboard')) return <DashboardIcon />
      if (menuItem.menuName.toLowerCase().includes('setting')) return <SettingsIcon />
      if (menuItem.menuName.toLowerCase().includes('menu')) return <MenuIcon />
      return <LinkIcon />
    }
    return null
  }

  return (
    <Box>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: 48,
          pl: level * 2,
          pr: 2,
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s',
          bgcolor: isSelected ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
          color: isSelected ? 'primary.main' : 'text.secondary',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
            color: 'primary.main',
          },
          '&::before': isSelected
            ? {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 3,
                bgcolor: 'primary.main',
                borderRadius: '0 2px 2px 0',
              }
            : {},
        }}
      >
        {level === 1 && (
          <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>{getIcon()}</Box>
        )}

        <Typography
          variant="body2"
          sx={{
            flex: 1,
            fontWeight: isSelected ? 600 : 400,
            fontSize: '0.875rem',
          }}
        >
          {menuItem.menuName}
        </Typography>

        {hasChildren && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              transition: 'transform 0.2s',
              transform: isOpen ? 'rotate(180deg)' : 'none',
            }}
          >
            <ExpandMoreIcon fontSize="small" />
          </Box>
        )}
      </Box>

      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <MenuList menuList={menuList} level={level} />
        </Collapse>
      )}
    </Box>
  )
}
