'use client'
// import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Form } from '../ui/form'
// import Forms, { FormFields } from '../forms'
// import EachUtil from '~/utils/each-util'

export default function Register() {
  // const form = useForm<DosenType>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     fakultas_id: '',
  //   },
  // })

  // const onSubmit = async (data: DosenType) => {
  //   console.log(data)
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="capitalize p-0 ml-2">
          daftar di sini
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Daftar Dosen</DialogTitle>
        <DialogDescription>Daftar dosen baru di sini</DialogDescription>
        {/* <Forms form={form} onSubmit={onSubmit} btnText="daftar">
          <EachUtil
            of={dosen}
            render={(item, index) =>
              item.select ? (
                <FormFields
                  key={index}
                  type="select"
                  item={item}
                  list={fakultas}
                  form={form}
                />
              ) : (
                <FormFields key={index} type="input" item={item} form={form} />
              )
            }
          />
        </Forms> */}
      </DialogContent>
    </Dialog>
  )
}
