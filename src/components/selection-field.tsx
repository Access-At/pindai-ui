'use client'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import EachUtil from '~/utils/each-util'
import React from 'react'
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'

interface SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label: string
  options: { name: string; id: string }[]
}

export default function SelectionField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, name, options, ...props }: SelectFieldProps<TFieldValues, TName>) {
  const [open, setOpen] = React.useState(false)
  return (
    <FormField
      {...props}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
                    ? options?.find((opt) => opt.id === field.value)?.name
                    : `Select ${label}...`}

                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder={`Cari ${label}...`} />
                <CommandList>
                  <CommandEmpty className="p-2 text-muted-foreground text-sm">
                    Data {label} tidak ditemukan.
                  </CommandEmpty>
                  <CommandGroup>
                    <EachUtil
                      of={options}
                      render={(option, index) => (
                        <CommandItem
                          value={option.id}
                          key={index}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn('opacity-0', {
                              'opacity-100': option.id === field.value,
                            })}
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
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
