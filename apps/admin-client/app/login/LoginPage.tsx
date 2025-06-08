'use client'

import { useForm } from 'react-hook-form'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { USER_LOGIN } from '@/lib/constants'
import { fetchClientApi } from '@/lib/fetcher/client'
import { useDispatch } from 'react-redux'
import { setSelectedKey, setUserInfo } from '@/store/slices/MenuSlice'

type LoginFormInputs = {
  username: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()

  const router = useRouter()
  const dispatch = useDispatch()

  const onSubmit = async (data: LoginFormInputs) => {
    console.log('submit data: ', data)
    const params = {
      username: data.username,
      password: data.password,
    }
    const json = await fetchClientApi(USER_LOGIN, { data: params })
    if (json?.accessToken) {
      setTimeout(() => {
        router.push('/home')
      }, 1000)
      dispatch(setUserInfo({ username: data.username }))
    } else {
      alert(json.message)
    }
  }

  return (
    <Box
      className="bg-[url('/images/login/login-bg.png')] min-h-screen min-w-screen bg-cover"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f7fa',
        px: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600} textAlign="center">
            Welcome
          </Typography>

          <TextField
            label="username"
            type="text"
            fullWidth
            variant="outlined"
            {...register('username', { required: 'username is required' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              bgcolor: '#1976d2',
              ':hover': { bgcolor: '#1565c0' },
            }}
            onClick={handleSubmit(onSubmit)}
          >
            Log In
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
