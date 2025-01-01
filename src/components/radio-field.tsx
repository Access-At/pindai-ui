import EachUtil from '~/utils/each-util'
import { FormField, FormItem, FormLabel, FormControl } from './ui/form'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'

interface RadioFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label: string
  options: { label: string; value: boolean }[]
}

export default function RadioField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, options, ...props }: RadioFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              className="flex flex-col space-y-1"
              defaultValue={field.value}
            >
              <EachUtil
                of={options}
                render={(option, index) => (
                  <FormItem
                    key={index}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal capitalize">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
