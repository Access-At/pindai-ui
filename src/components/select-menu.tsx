/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import EachUtil from '~/utils/each-util'

export default function SelectMenu({
  label,
  item,
}: {
  label: string
  item: any[]
}) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <EachUtil
          of={item}
          render={(item) => (
            <SelectItem value={item} className="capitalize">
              {item}
            </SelectItem>
          )}
        />
      </SelectContent>
    </Select>
  )
}
