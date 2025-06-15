import { Box, Typography } from '@mui/material'
import { Settings } from '@mui/icons-material'

export default function Logo() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 64,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Settings
          sx={{
            color: 'primary.main',
            fontSize: 28,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 0.5,
          }}
        >
          Admin Panel
        </Typography>
      </Box>
    </Box>
  )
}
