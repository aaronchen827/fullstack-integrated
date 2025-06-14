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
  OutlinedInput,
  Chip,
  SelectChangeEvent,
} from '@mui/material'

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

type Props = {
  open: boolean
  mode: 'add' | 'edit' | 'delete'
  role: Role | null
  menus: Menu[]
  onClose: () => void
  onSave: (roleData: Partial<Role>) => void
  onDelete: () => void
}

// Available permissions for roles
const AVAILABLE_PERMISSIONS = [
  'user:read',
  'user:write',
  'user:delete',
  'role:read',
  'role:write',
  'role:delete',
  'menu:read',
  'menu:write',
  'menu:delete',
]

export default function RoleDialog({ open, mode, role, menus, onClose, onSave, onDelete }: Props) {
  const [formData, setFormData] = React.useState<Partial<Role>>({
    name: '',
    description: '',
    menus: [],
  })

  React.useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        menus: role.menus,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        menus: [],
      })
    }
  }, [role])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMenuChange = (e: SelectChangeEvent<number[]>) => {
    const { value } = e.target
    const selectedMenuIds = value as number[]
    const selectedMenus = menus.filter((menu) => selectedMenuIds.includes(menu.id))
    setFormData((prev) => ({ ...prev, menus: selectedMenus }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
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
              Delete Role
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Are you sure you want to delete <strong>{role?.name}</strong>? This action cannot be
                undone.
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
            >
              Cancel
            </Button>
            <Button
              onClick={onDelete}
              color="error"
              variant="contained"
              sx={{
                px: 3,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {mode === 'add' ? 'Add New Role' : 'Edit Role'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <TextField
                autoFocus
                margin="normal"
                label="Role Name"
                name="name"
                value={formData.name}
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
              />
              <TextField
                margin="normal"
                label="Description"
                name="description"
                value={formData.description}
                fullWidth
                multiline
                rows={3}
                onChange={handleTextChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="menus-label">Menus</InputLabel>
                <Select
                  labelId="menus-label"
                  multiple
                  value={formData.menus?.map((menu) => menu.id) || []}
                  onChange={handleMenuChange}
                  input={<OutlinedInput label="Menus" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const menu = menus.find((m) => m.id === value)
                        return (
                          <Chip
                            key={value}
                            label={menu?.menuName}
                            size="small"
                            sx={{
                              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                              color: 'primary.main',
                              fontWeight: 500,
                            }}
                          />
                        )
                      })}
                    </Box>
                  )}
                >
                  {menus.map((menu) => (
                    <MenuItem key={menu.id} value={menu.id}>
                      {menu.menuName}
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
            >
              Save Changes
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  )
}
