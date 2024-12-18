/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Card, CardContent, CardHeader } from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { EditIcon, TrashIcon } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { addFakultas, updateFakultas } from '~/api/request/dppm-request'

import { Button } from '~/components/ui/button'
import EachUtil from '~/utils/each-util'
import { Input } from '~/components/ui/input'
import { fakultasSchema } from '~/zodSchema/dppm/fakultas'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

function FakultasForm({
  initialData,
  onClose,
}: {
  initialData?: any
  onClose: () => void
}) {
  const form = useForm<z.infer<typeof fakultasSchema>>({
    resolver: zodResolver(fakultasSchema),
    defaultValues: {
      name: initialData?.name || '',
    },
  })

  const onSubmit = async (data: z.infer<typeof fakultasSchema>) => {
    try {
      if (initialData) {
        const res = await updateFakultas(initialData.id, data)
        toast.success(res.message)
      } else {
        const res = await addFakultas(data)
        toast.success(res.message)
        form.reset()
      }
      onClose() // Close the dialog after successful submission
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">nama fakultas</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="capitalize">
          simpan
        </Button>
      </form>
    </Form>
  )
}

function FakultasRow({ item, index }: { item: any; index: number }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false) // Close the dialog
  }

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="capitalize">{item.name}</TableCell>
      <TableCell className="flex gap-2">
        <TooltipProvider delayDuration={3} disableHoverableContent>
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground"
                  >
                    <EditIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-center capitalize">
                    edit fakultas
                  </DialogTitle>
                  <FakultasForm initialData={item} onClose={handleClose} />
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent className="uppercase bg-black text-sm font-medium">
              edit
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground"
              >
                <TrashIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="uppercase bg-black text-sm font-medium">
              hapus
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  )
}

export default function Fakultas({ data }: { data: any }) {
  //   const [open, setOpen] = useAtom(dialogFakultas)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false) // Close the dialog
  }

  return (
    <Card>
      <CardHeader className="text-center font-bold text-lg md:text-xl xl:text-2xl py-8 px-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="size-fit capitalize">tambah fakultas</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-center capitalize">
              tambah fakultas
            </DialogTitle>
            <FakultasForm initialData={null} onClose={handleClose} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-center capitalize">
              <TableHead>no</TableHead>
              <TableHead>nama fakultas</TableHead>
              <TableHead>action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <EachUtil
              of={data.fakultas}
              render={(item, index) => (
                <FakultasRow item={item} key={index} index={index} />
              )}
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
