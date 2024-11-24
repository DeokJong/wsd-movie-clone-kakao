import React, { useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { loginStyles } from '../Common.styles'

import { useAuth, AuthError } from '@/Hooks'
import { ErrorModal } from '@/Components' // Adjust the import path as necessary

type FormData = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export const SignUpPaper: React.FC<{ onCancelClick: () => void }> = ({ onCancelClick }) => {
  const { register: authRegister } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  // State for the error modal
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data: FormData) => {
    const { fullName, email: username, password, confirmPassword } = data
    try {
      authRegister({ email: username, password, confirmPassword, fullName })
      onCancelClick()
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        // Display the error message in the modal
        setErrorMessage(error.message)
        setErrorModalOpen(true)
      } else {
        console.error(error)
        setErrorMessage('An unexpected error occurred.')
        setErrorModalOpen(true)
      }
    }
  }

  return (
    <Paper elevation={4} sx={loginStyles.paper}>
      <Typography variant="h4" component="h1" sx={loginStyles.title}>
        Sign Up
      </Typography>
      <Box component="form" sx={loginStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          sx={loginStyles.textField}
          {...register('fullName', { required: 'Full Name is required' })}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={loginStyles.textField}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={loginStyles.textField}
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={loginStyles.textField}
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: (value) => value === watch('password') || 'Passwords do not match',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button variant="contained" color="primary" sx={loginStyles.primaryButton} type="submit">
          Sign Up
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={loginStyles.secondaryButton}
          onClick={onCancelClick}
        >
          Cancel
        </Button>
      </Box>
      {/* Error Modal */}
      <ErrorModal
        open={errorModalOpen}
        errorMessage={errorMessage}
        onClose={() => setErrorModalOpen(false)}
      />
    </Paper>
  )
}