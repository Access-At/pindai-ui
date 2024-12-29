/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '~/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import EachUtil from '~/utils/each-util'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Check, LoaderCircleIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useState } from 'react'

interface FormsProps {
  form: any
  fields: { name: string; label: string; type?: string; select?: boolean }[]
  onSubmit: (data: any) => void
  handleSelect?: (value: any) => void
  className?: string
  isLoading?: boolean
  btnText: string
  list?: any[]
}

export default function Forms({
  form,
  fields,
  onSubmit,
  handleSelect,
  className,
  isLoading,
  btnText,
  list,
}: FormsProps) {
  const [open, setOpen] = useState(false)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
        <EachUtil
          of={fields}
          render={(item, index) =>
            item.select ? (
              <FormField
                key={index}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{item.label}</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn('w-full justify-between', {
                              'text-muted-foreground': !field.value,
                            })}
                          >
                            {field.value
                              ? item.name === field.name &&
                                list?.find((l) => l.id === field.value)?.name
                              : `Select ${item.label}...`}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput
                            placeholder={`Search ${item.label}...`}
                          />
                          <CommandList>
                            <CommandEmpty>Data tidak ditemukan.</CommandEmpty>
                            <CommandGroup>
                              <EachUtil
                                of={list as any[]}
                                render={(option, index) => (
                                  <CommandItem
                                    value={option.id}
                                    key={index}
                                    onSelect={() => {
                                      setOpen(false)
                                      if (
                                        item.name === field.name &&
                                        handleSelect
                                      ) {
                                        handleSelect(option.id)
                                      } else {
                                        form.setValue(item.name, option.id)
                                      }
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        option.id === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                    {option.name}
                                  </CommandItem>
                                )}
                              />
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            ) : item.radio ? (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-1"
                        defaultValue={field.value}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            aktif
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="0" />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            tidak aktif
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input type={item.type || 'text'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }
        />

        <Button type="submit" className="capitalize" disabled={isLoading}>
          {isLoading ? (
            <span className="flex gap-2">
              {btnText}
              <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
            </span>
          ) : (
            btnText
          )}
        </Button>
      </form>
    </Form>
  )
}
