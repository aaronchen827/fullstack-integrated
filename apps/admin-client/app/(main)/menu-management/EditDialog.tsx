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
} from '@mui/material'

type Props = {
  showDialog: boolean
  menu?: any
  setMenu: (data: any) => void
  onClose: () => void
  onSave: () => void
  onDelete: () => void
  dialogMode: string
}

export default function EditDialog({
  showDialog,
  menu,
  setMenu,
  onClose,
  onSave,
  onDelete,
  dialogMode,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMenu((prev: any) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog
      open={showDialog}
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
      {dialogMode === 'delete' ? (
        <>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              Delete Menu
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Are you sure you want to delete <strong>{menu?.menuName}</strong>? This action
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
        <>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {dialogMode === 'add' ? 'Add New Menu' : 'Edit Menu'}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ py: 2 }}>
              <TextField
                margin="normal"
                label="Parent ID"
                name="parentId"
                value={menu?.parentId}
                fullWidth
                disabled
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'action.hover',
                  },
                }}
              />
              <TextField
                autoFocus
                margin="normal"
                label="Menu Name"
                name="menuName"
                value={menu?.menuName}
                fullWidth
                onChange={handleChange}
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
                label="Menu Path"
                name="path"
                value={menu?.path}
                fullWidth
                onChange={handleChange}
                placeholder="/example/path"
                helperText="Enter the URL path for this menu item"
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
                label="Menu URL"
                name="menuUrl"
                value={menu?.menuUrl}
                fullWidth
                onChange={handleChange}
                placeholder="https://example.com"
                helperText="Enter the full URL if different from the path"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
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
              onClick={onSave}
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
        </>
      )}
    </Dialog>
  )
}
