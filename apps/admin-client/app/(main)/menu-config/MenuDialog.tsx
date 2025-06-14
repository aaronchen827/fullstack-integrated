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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (mode === 'delete') {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Menu</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the menu "{menu?.menuName}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave({})} color="error">
            Delete
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
            />
            <TextField
              name="parentId"
              label="Parent ID"
              type="number"
              value={formData.parentId || ''}
              onChange={handleTextChange}
              fullWidth
            />
            <TextField
              name="icon"
              label="Icon"
              value={formData.icon || ''}
              onChange={handleTextChange}
              fullWidth
            />
            <FormControl fullWidth>
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
            />
            <TextField
              name="path"
              label="Path"
              value={formData.path || ''}
              onChange={handleTextChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {mode === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
