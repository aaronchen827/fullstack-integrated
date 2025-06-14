'use client'

import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { USER_LOGIN } from '@/lib/constants'
import { fetchClientApi } from '@/lib/fetcher/client'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/slices/MenuSlice'
import { useState } from 'react'
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material'

type LoginFormInputs = {
  username: string
  password: string
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const router = useRouter()
  const dispatch = useDispatch()

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true)
      setError('')
      const params = {
        username: data.username,
        password: data.password,
      }
      const json = await fetchClientApi(USER_LOGIN, { data: params })
      if (json?.accessToken) {
        dispatch(setUserInfo({ username: data.username }))
        router.push('/dashboard')
      } else {
        setError(json.message || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          width: '100%',
          maxWidth: { xs: '100%', sm: 450, md: 600 },
          minWidth: { xs: 'auto', sm: 400 },
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          mx: { xs: 2, sm: 3, md: 4 },
          my: { xs: 2, sm: 3 },
        }}
      >
        <Stack spacing={{ xs: 2.5, sm: 3, md: 3.5 }}>
          <Box textAlign="center" mb={{ xs: 1, sm: 2 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={700}
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Please sign in to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ borderRadius: 1 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            size="medium"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                height: { xs: '48px', sm: '56px' },
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            size="medium"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                height: { xs: '48px', sm: '56px' },
              },
              '& .MuiInputLabel-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            sx={{
              py: { xs: 1.25, sm: 1.5 },
              borderRadius: 1.5,
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              textTransform: 'none',
              height: { xs: '48px', sm: '56px' },
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd6, #6a3f9d)',
                boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
              },
              '&:disabled': {
                background: 'linear-gradient(45deg, #a5b4f3, #b39fd4)',
              },
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
            Operations Configurator © {new Date().getFullYear()}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}
