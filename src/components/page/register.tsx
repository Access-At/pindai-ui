'use client'
import { registerSchema, RegisterType } from '~/zodSchema/authSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Forms from '../forms'
import InputField from '../input-field'
import Modal from '../modal'
import { useState } from 'react'
import { registerDosen } from '~/api/request/auth-request'
import { toast } from 'sonner'

export default function Register() {
  const [open, setOpen] = useState(false)
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: RegisterType) => {
    await registerDosen(data)
      .then((res) => {
        toast.success(res.message)
        setOpen(false)
      })
      .catch((err) => {
        if (err.response?.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            form.setError(key as keyof RegisterType, {
              message: value as string,
              type: 'manual',
            })
          }
        }
        toast.error(err.response.data.message)
      })
  }

  return (
    <Modal
      name="daftar"
      variant="link"
      title="daftar dosen"
      description="daftar dosen baru di sini"
      open={open}
      setOpen={setOpen}
    >
      <Forms
        form={form}
        onSubmit={onSubmit}
        btnText="daftar"
        className="space-y-4 uppercase"
      >
        <InputField label="Nama" name="name" control={form.control} />
        <InputField
          label="Email"
          name="email"
          type="email"
          control={form.control}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          control={form.control}
        />
      </Forms>
    </Modal>
  )
}
