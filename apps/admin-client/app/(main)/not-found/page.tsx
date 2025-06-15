'use client'

import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Home as HomeIcon } from '@mui/icons-material'

export default function NotFound() {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(80vh)', // Subtract header height
        textAlign: 'center',
        p: 3,
        bgcolor: 'background.default',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          width: '100%',
          maxWidth: '1200px',
          minHeight: '80vh',
          p: { xs: 4, md: 8 },
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.shadows[1],
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
          }}
        >
          Under Development
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{
            maxWidth: '800px',
            mb: 4,
            fontWeight: 500,
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          This feature is currently under development. Please check back later.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => router.push('/dashboard')}
          sx={{
            px: 8,
            py: 2.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1.25rem',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: (theme) => theme.shadows[4],
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  )
}
