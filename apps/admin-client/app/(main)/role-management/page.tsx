'use client'

import * as React from 'react'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Chip,
  alpha,
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import RoleDialog from './RoleDialog'
import { fetchClientApi } from '@/lib/fetcher/client'

type Role = {
  id: number
  name: string
  description: string
  menus: Menu[]
  createTime: string
  updateTime: string
}

type Menu = {
  id: number
  menuName: string
  parentId?: number
  icon?: string
  showStatus: number
  menuUrl?: string
  path?: string
}

export default function RoleManagementPage() {
  const [roles, setRoles] = React.useState<Role[]>([])
  const [menus, setMenus] = React.useState<Menu[]>([])
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [currentRole, setCurrentRole] = React.useState<Role | null>(null)
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'delete'>('add')

  const fetchRoles = React.useCallback(async () => {
    try {
      const response = await fetchClientApi('/admin/role/findAll')
      setRoles(response)
    } catch (error) {
      console.error('Failed to fetch roles:', error)
    }
  }, [])

  const fetchMenus = React.useCallback(async () => {
    try {
      const response = await fetchClientApi('/admin/menu/selectAll')
      setMenus(response)
    } catch (error) {
      console.error('Failed to fetch menus:', error)
    }
  }, [])

  React.useEffect(() => {
    fetchRoles()
    fetchMenus()
  }, [fetchRoles, fetchMenus])

  const handleAdd = () => {
    setCurrentRole(null)
    setDialogMode('add')
    setDialogOpen(true)
  }

  const handleEdit = (role: Role) => {
    setCurrentRole(role)
    setDialogMode('edit')
    setDialogOpen(true)
  }

  const handleDelete = (role: Role) => {
    setCurrentRole(role)
    setDialogMode('delete')
    setDialogOpen(true)
  }

  const handleSave = async (roleData: Partial<Role>) => {
    try {
      if (dialogMode === 'add') {
        await fetchClientApi('/admin/role/create', { data: roleData })
      } else if (dialogMode === 'edit' && currentRole) {
        await fetchClientApi(`/admin/role/update/${currentRole.id}`, { data: roleData })
      }
      fetchRoles()
      setDialogOpen(false)
    } catch (error) {
      console.error('Failed to save role:', error)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!currentRole) return

    try {
      await fetchClientApi(`/admin/role/delete/${currentRole.id}`)
      fetchRoles()
      setDialogOpen(false)
    } catch (error) {
      console.error('Failed to delete role:', error)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Role Management
        </Typography>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Add Role
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Menus</TableCell>
              <TableCell>Create Time</TableCell>
              <TableCell>Update Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {role.menus.map((menu) => (
                      <Chip
                        key={menu.id}
                        label={menu.menuName}
                        size="small"
                        sx={{
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{new Date(role.createTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(role.updateTime).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleEdit(role)} sx={{ mr: 1 }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(role)} color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <RoleDialog
        open={dialogOpen}
        mode={dialogMode}
        role={currentRole}
        menus={menus}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        onDelete={handleDeleteConfirm}
      />
    </Box>
  )
}
