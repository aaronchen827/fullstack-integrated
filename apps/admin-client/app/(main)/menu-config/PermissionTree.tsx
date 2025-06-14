'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { TreeItem, TreeView } from '@mui/x-tree-view'
import { Box, Button, Typography, IconButton, Tooltip, alpha } from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { ChevronRight, ExpandMore } from '@mui/icons-material'
import EditDialog from '@/app/(main)/menu-config/EditDialog'
import { fetchClientApi } from '@/lib/fetcher/client'
import { GET_MENU_CONFIG_ADD, GET_MENU_CONFIG_DELETE } from '@/lib/constants'

type MenuItem = {
  id: number
  menuName: string
  menuUrl?: string
  parentId?: number
  path?: string
  showStatus?: number
  subList?: MenuItem[]
}

type Props = {
  menuConfigData: MenuItem[]
}

export default function PermissionTree({ menuConfigData }: Props) {
  const frontendUrl = process.env.FRONTENT_URL || 'http://localhost:3000'
  const [data, setData] = useState<MenuItem[]>([])
  useEffect(() => {
    const temp: MenuItem[] = [
      {
        id: 0,
        menuName: 'ALL MENU',
        menuUrl: '',
        subList: menuConfigData,
      },
    ]
    setData(temp)
  }, [menuConfigData])

  const [showDialog, setShowDialog] = useState(false)
  const [currentMenu, setCurrentMenu] = useState<any>({})
  const [dialogMode, setDialogMode] = useState('')

  const getAllNodeIds = (nodes: MenuItem[]) => {
    const result: string[] = []
    const traverse = (items: MenuItem[]) => {
      items.forEach((item) => {
        result.push(item.id.toString())
        if (item.subList && item.subList.length > 0) {
          traverse(item.subList)
        }
      })
    }
    traverse(nodes)
    return result
  }

  const renderTree = (nodes: MenuItem[]) =>
    nodes.map((node) => (
      <TreeItem
        key={node.id}
        nodeId={node.id + ''}
        label={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            sx={{
              py: 1,
              px: 1,
              borderRadius: 1,
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: node.id === 0 ? 600 : 400,
                  color: node.id === 0 ? 'primary.main' : 'text.primary',
                }}
              >
                {node.menuName}
              </Typography>
              {node.path && (!node.subList || node.subList.length === 0) && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <a
                    href={`${frontendUrl}${node.path}`}
                    target="_blank"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {frontendUrl}
                    {node.path}
                  </a>
                </Typography>
              )}
            </Box>
            {node.id !== 0 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  '.MuiTreeItem-root:hover &': {
                    opacity: 1,
                  },
                }}
              >
                <Tooltip title="Add Submenu">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      toAdd(node)
                      e.stopPropagation()
                    }}
                    sx={{
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.lighter' },
                    }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Menu">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      toUpdate(node)
                      e.stopPropagation()
                    }}
                    sx={{
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.lighter' },
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Menu">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      toDelete(node)
                      e.stopPropagation()
                    }}
                    sx={{
                      color: 'error.main',
                      '&:hover': { bgcolor: 'error.lighter' },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        }
      >
        {node.subList && renderTree(node.subList)}
      </TreeItem>
    ))

  const toAdd = (menu: any) => {
    setDialogMode('add')
    const newMenu = {
      parentId: menu ? menu.id : 0,
    }
    setCurrentMenu(newMenu)
    setShowDialog(true)
  }

  const toUpdate = (menu: any) => {
    setShowDialog(true)
    setCurrentMenu(menu)
    setDialogMode('edit')
  }

  const toDelete = (menu: any) => {
    setShowDialog(true)
    setCurrentMenu(menu)
    setDialogMode('delete')
  }

  const handleSave = async () => {
    const saveData = {
      ...currentMenu,
      showStatus: 0,
    }
    await fetchClientApi(GET_MENU_CONFIG_ADD, { data: saveData })
    onClose()
    window.location.reload()
  }

  const handleDelete = async () => {
    const saveData = {
      id: currentMenu.id,
    }
    await fetchClientApi(GET_MENU_CONFIG_DELETE, { data: saveData })
    onClose()
    window.location.reload()
  }

  const onClose = () => {
    setShowDialog(false)
    setDialogMode('')
    setCurrentMenu({})
  }

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => toAdd(null)}
        sx={{
          mb: 3,
          px: 3,
          py: 1,
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        Add Menu Item
      </Button>

      {showDialog && (
        <EditDialog
          showDialog={showDialog}
          menu={currentMenu}
          setMenu={setCurrentMenu}
          onClose={onClose}
          onSave={handleSave}
          onDelete={handleDelete}
          dialogMode={dialogMode}
        />
      )}

      {data && data.length > 0 && (
        <TreeView
          sx={{
            minHeight: 200,
            '& .MuiTreeItem-root': {
              '& .MuiTreeItem-content': {
                py: 0.5,
              },
            },
          }}
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          defaultExpanded={getAllNodeIds(data)}
        >
          {renderTree(data)}
        </TreeView>
      )}
    </Box>
  )
}
