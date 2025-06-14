import { useState, useEffect } from 'react'
import { Box, Button, Card, CardContent, Typography, IconButton, Dialog } from '@mui/material'
import { TreeView, TreeItem } from '@mui/x-tree-view'
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { MenuDialog } from './MenuDialog'
import { Menu } from '@/types/menu'

export default function MenuConfigPage() {
  const [menus, setMenus] = useState<Menu[]>([])
  const [open, setOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
  const [mode, setMode] = useState<'add' | 'edit' | 'delete'>('add')

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    try {
      const response = await fetch('/api/menu/findAll')
      const data = await response.json()
      setMenus(data)
    } catch (error) {
      console.error('Error fetching menus:', error)
    }
  }

  const handleAdd = () => {
    setMode('add')
    setSelectedMenu(null)
    setOpen(true)
  }

  const handleEdit = (menu: Menu) => {
    setMode('edit')
    setSelectedMenu(menu)
    setOpen(true)
  }

  const handleDelete = (menu: Menu) => {
    setMode('delete')
    setSelectedMenu(menu)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedMenu(null)
  }

  const handleSave = async (menuData: Partial<Menu>) => {
    try {
      if (mode === 'add') {
        await fetch('/api/menu/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(menuData),
        })
      } else if (mode === 'edit' && selectedMenu) {
        await fetch(`/api/menu/update?id=${selectedMenu.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(menuData),
        })
      } else if (mode === 'delete' && selectedMenu) {
        await fetch(`/api/menu/delete?id=${selectedMenu.id}`, {
          method: 'POST',
        })
      }
      fetchMenus()
      handleClose()
    } catch (error) {
      console.error('Error saving menu:', error)
    }
  }

  const renderTree = (nodes: Menu[]) => {
    return nodes.map((node) => (
      <TreeItem
        key={node.id}
        nodeId={node.id.toString()}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5 }}>
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {node.menuName}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                handleEdit(node)
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(node)
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        {Array.isArray(node.children) && node.children.length > 0
          ? renderTree(node.children)
          : null}
      </TreeItem>
    ))
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">Menu Configuration</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
              Add Menu
            </Button>
          </Box>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(menus)}
          </TreeView>
        </CardContent>
      </Card>

      <MenuDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        menu={selectedMenu}
        mode={mode}
      />
    </Box>
  )
}
