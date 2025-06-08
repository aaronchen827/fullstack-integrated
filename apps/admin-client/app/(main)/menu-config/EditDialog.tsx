'use client'

import * as React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

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
  console.log('menu==', JSON.stringify(menu))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMenu((prev: any) => ({ ...prev, [name]: value }))
  }
  return (
    <Dialog open={showDialog} onClose={onClose} maxWidth="xs" fullWidth>
      {dialogMode === 'delete' ? (
        <>
          <DialogTitle>Delete Menu</DialogTitle>
          <DialogContent>
            Are you sure you want to delete [{menu?.menuName}]？ This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>{dialogMode === 'add' ? 'add menu' : 'edit menu'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              label="parentId"
              name="parentId"
              value={menu?.parentId}
              fullWidth
              disabled
            />
            <TextField
              autoFocus
              margin="normal"
              label="Menu Name"
              name="menuName"
              value={menu?.menuName}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="Menu Path"
              name="path"
              value={menu?.path}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="Menu Url"
              name="menuUrl"
              value={menu?.menuUrl}
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
