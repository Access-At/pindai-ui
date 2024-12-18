/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditIcon, TrashIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { addFakultas, updateFakultas } from '~/api/request/dppm-request'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
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
import EachUtil from '~/utils/each-util'
import { fakultasSchema } from '~/zodSchema/dppm/fakultas'
import { useAtom, useSetAtom } from 'jotai'
import { dialogFakultas } from '~/management/state'

function FakultasForm({ initialData }: { initialData?: any }) {
  const setDialogFakultas = useSetAtom(dialogFakultas)
  const form = useForm<z.infer<typeof fakultasSchema>>({
    resolver: zodResolver(fakultasSchema),
    defaultValues: {
      name: initialData.name || '',
    },
  })

  const onSubmit = async (data: z.infer<typeof fakultasSchema>) => {
    if (initialData) {
      await updateFakultas(initialData.id, data)
        .then((res) => {
          toast.success(res.message, {})
          setDialogFakultas(false)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
    } else {
      await addFakultas(data)
        .then((res) => {
          toast.success(res.message, {})
          form.reset()
          setDialogFakultas(false)
        })
        .catch((err) => {
          toast.error(err.response.data.message)
        })
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
                <Input type="name" autoComplete="name" {...field} />
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

function FakultasRow({
  item,
  index,
  open,
  setOpen,
}: {
  item: any
  index: number
  open: boolean
  setOpen: any
}) {
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
                  <FakultasForm initialData={item} />
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
  const [open, setOpen] = useAtom(dialogFakultas)
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
            <FakultasForm initialData="" />
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
                <FakultasRow
                  item={item}
                  key={index}
                  index={index}
                  open={open}
                  setOpen={setOpen}
                />
              )}
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
