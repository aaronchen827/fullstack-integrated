'use client'

import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  alpha,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material'
import { User } from '@/types/user'

type Role = {
  id: number
  name: string
}

type FormData = {
  username: string
  password?: string
  roleId?: number
}

type Props = {
  open: boolean
  mode: 'add' | 'edit' | 'delete'
  user: User | null
  roles: Role[]
  onClose: () => void
  onSave: (userData: Partial<User>) => void
  onDelete: () => void
}

export default function UserDialog({ open, mode, user, roles, onClose, onSave, onDelete }: Props) {
  const [formData, setFormData] = React.useState<FormData>({
    username: '',
    password: '',
    roleId: undefined,
  })
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        roleId: user.roleId,
      })
    } else {
      setFormData({
        username: '',
        password: '',
        roleId: undefined,
      })
    }
  }, [user])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (e: SelectChangeEvent<number>) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, roleId: value as number }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
        },
      }}
    >
      {mode === 'delete' ? (
        <>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              Delete User
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Are you sure you want to delete <strong>{user?.username}</strong>? This action
                cannot be undone.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              onClick={onClose}
              sx={{
                px: 3,
                textTransform: 'none',
                fontWeight: 500,
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                setLoading(true)
                try {
                  await onSave({})
                } finally {
                  setLoading(false)
                }
              }}
              color="error"
              variant="contained"
              sx={{
                px: 3,
                textTransform: 'none',
                fontWeight: 500,
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Delete'}
            </Button>
          </DialogActions>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {mode === 'add' ? 'Add New User' : 'Edit User'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <TextField
                autoFocus
                margin="normal"
                label="Username"
                name="username"
                value={formData.username}
                fullWidth
                onChange={handleTextChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
                disabled={loading}
              />
              {mode === 'add' && (
                <TextField
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  fullWidth
                  onChange={handleTextChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                  disabled={loading}
                />
              )}
              <FormControl fullWidth margin="normal" disabled={loading}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="roleId"
                  value={formData.roleId || ''}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <MenuItem value="">
                    <em>No Role</em>
                  </MenuItem>
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              onClick={onClose}
              sx={{
                px: 3,
                textTransform: 'none',
                fontWeight: 500,
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 3,
                textTransform: 'none',
                fontWeight: 500,
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : mode === 'add' ? 'Add' : 'Save'}
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  )
}
