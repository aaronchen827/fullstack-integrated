import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material'
import { Menu } from '@/types/menu'

interface Props {
  open: boolean
  onClose: () => void
  onSave: (menuData: Partial<Menu>) => void
  menu: Menu | null
  mode: 'add' | 'edit' | 'delete'
}

export function MenuDialog({ open, onClose, onSave, menu, mode }: Props) {
  const [formData, setFormData] = useState<Partial<Menu>>({
    menuName: '',
    parentId: undefined,
    icon: '',
    showStatus: 1,
    menuUrl: '',
    path: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (menu) {
      setFormData({
        menuName: menu.menuName,
        parentId: menu.parentId,
        icon: menu.icon,
        showStatus: menu.showStatus,
        menuUrl: menu.menuUrl,
        path: menu.path,
      })
    } else {
      setFormData({
        menuName: '',
        parentId: undefined,
        icon: '',
        showStatus: 1,
        menuUrl: '',
        path: '',
      })
    }
  }, [menu])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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

  if (mode === 'delete') {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Menu</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the menu "{menu?.menuName}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
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
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'add' ? 'Add Menu' : 'Edit Menu'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="menuName"
              label="Menu Name"
              value={formData.menuName}
              onChange={handleTextChange}
              required
              fullWidth
              disabled={loading}
            />
            <TextField
              name="parentId"
              label="Parent ID"
              type="number"
              value={formData.parentId || ''}
              onChange={handleTextChange}
              fullWidth
              disabled={loading}
            />
            <TextField
              name="icon"
              label="Icon"
              value={formData.icon || ''}
              onChange={handleTextChange}
              fullWidth
              disabled={loading}
            />
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Show Status</InputLabel>
              <Select
                name="showStatus"
                value={formData.showStatus}
                onChange={handleSelectChange}
                label="Show Status"
              >
                <MenuItem value={1}>Show</MenuItem>
                <MenuItem value={0}>Hide</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="menuUrl"
              label="Menu URL"
              value={formData.menuUrl || ''}
              onChange={handleTextChange}
              fullWidth
              disabled={loading}
            />
            <TextField
              name="path"
              label="Path"
              value={formData.path || ''}
              onChange={handleTextChange}
              fullWidth
              disabled={loading}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : mode === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
