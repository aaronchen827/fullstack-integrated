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
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import UserDialog from './UserDialog'
import { CREATE_USER, DELETE_USER, GET_ALL_USER, UPDATE_USER } from '@/lib/constants'
import { fetchClientApi } from '@/lib/fetcher/client'

type User = {
  id: number
  username: string
  roleId?: number
  role?: {
    id: number
    name: string
  }
  createTime: string
  updateTime: string
}

type Role = {
  id: number
  name: string
}

export default function UserManagementPage() {
  const [users, setUsers] = React.useState<User[]>([])
  const [roles, setRoles] = React.useState<Role[]>([])
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [dialogMode, setDialogMode] = React.useState<'add' | 'edit' | 'delete'>('add')

  const fetchUsers = React.useCallback(async () => {
    try {
      const response = await fetchClientApi(GET_ALL_USER)
      setUsers(response)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }, [])

  const fetchRoles = React.useCallback(async () => {
    try {
      const response = await fetchClientApi('/admin/role/findAll')
      setRoles(response)
    } catch (error) {
      console.error('Failed to fetch roles:', error)
    }
  }, [])

  React.useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const handleAdd = () => {
    setCurrentUser(null)
    setDialogMode('add')
    setDialogOpen(true)
  }

  const handleEdit = (user: User) => {
    setCurrentUser(user)
    setDialogMode('edit')
    setDialogOpen(true)
  }

  const handleDelete = (user: User) => {
    setCurrentUser(user)
    setDialogMode('delete')
    setDialogOpen(true)
  }

  const handleSave = async (userData: Partial<User>) => {
    try {
      if (dialogMode === 'add') {
        await fetchClientApi(CREATE_USER, { data: userData })
      } else if (dialogMode === 'edit' && currentUser) {
        await fetchClientApi(`${UPDATE_USER}/${currentUser.id}`, { data: userData })
      }
      fetchUsers()
      setDialogOpen(false)
    } catch (error) {
      console.error('Failed to save user:', error)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!currentUser) return

    try {
      await fetchClientApi(`${DELETE_USER}/${currentUser.id}`)
      fetchUsers()
      setDialogOpen(false)
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          User Management
        </Typography>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Create Time</TableCell>
              <TableCell>Update Time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.role ? (
                    <Chip
                      label={user.role.name}
                      size="small"
                      sx={{
                        bgcolor: (theme) => theme.palette.primary.main,
                        color: 'white',
                      }}
                    />
                  ) : (
                    <Chip
                      label="No Role"
                      size="small"
                      sx={{
                        bgcolor: (theme) => theme.palette.grey[300],
                        color: 'text.secondary',
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>{new Date(user.createTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(user.updateTime).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleEdit(user)} sx={{ mr: 1 }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(user)} color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UserDialog
        open={dialogOpen}
        mode={dialogMode}
        user={currentUser}
        roles={roles}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        onDelete={handleDeleteConfirm}
      />
    </Box>
  )
}
