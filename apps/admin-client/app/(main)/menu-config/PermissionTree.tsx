'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { TreeItem, TreeView } from '@mui/x-tree-view'
import { Box, Button, Typography } from '@mui/material'
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
          <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
            <Box display="flex">
              <Typography variant="body2">{node.menuName}</Typography>
              {node.path && (!node.subList || node.subList.length === 0) && (
                <Typography variant="body2" className="pl-3 font-bold text-blue-400">
                  <a href={`http://localhost:3000${node.path}`} target="_blank">
                    http://localhost:3000{node.path}
                  </a>
                </Typography>
              )}
            </Box>
            {node.id !== 0 && (
              <Box
                className="flex items-center"
                display="flex"
                sx={{ display: 'flex', marginRight: 3 }}
              >
                <Add
                  fontSize="small"
                  color="primary"
                  onClick={(e) => {
                    toAdd(node)
                    e.stopPropagation()
                  }}
                />
                <Edit
                  fontSize="small"
                  color="primary"
                  onClick={(e) => {
                    toUpdate(node)
                    e.stopPropagation()
                  }}
                />
                <Delete
                  fontSize="small"
                  color="error"
                  onClick={(e) => {
                    toDelete(node)
                    e.stopPropagation()
                  }}
                />
              </Box>
            )}
          </Box>
        }
      >
        {node.subList && renderTree(node.subList)}
      </TreeItem>
    ))

  const toAdd = (menu: any) => {
    console.log('menu=', JSON.stringify(menu))
    setDialogMode('add')
    const newMenu = {
      parentId: menu ? menu.id : 0,
    }
    setCurrentMenu(newMenu)
    setShowDialog(true)
  }

  const toUpdate = (menu: any) => {
    console.log('menu=', JSON.stringify(menu))
    setShowDialog(true)
    setCurrentMenu(menu)
    setDialogMode('edit')
  }

  const toDelete = (menu: any) => {
    console.log('menu=', JSON.stringify(menu))
    setShowDialog(true)
    setCurrentMenu(menu)
    setDialogMode('delete')
  }

  const handleSave = async () => {
    console.log('handleSave=', JSON.stringify(currentMenu))
    const saveData = {
      ...currentMenu,
      showStatus: 0,
    }
    console.log('saveData=', JSON.stringify(saveData))
    await fetchClientApi(GET_MENU_CONFIG_ADD, { data: saveData })
    onClose()
    window.location.reload()
  }
  const handleDelete = async () => {
    console.log('handleDelete=', JSON.stringify(currentMenu))
    const saveData = {
      id: currentMenu.id,
    }
    console.log('saveData=', JSON.stringify(saveData))
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
    <Box sx={{ padding: 5, border: '1px solid #ededed', minHeight: '80vh' }}>
      <Button variant="contained" sx={{ margin: 3 }} onClick={() => toAdd(null)}>
        ADD MENU ITEM
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
          sx={{ marginLeft: 2, minHeight: 200 }}
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
