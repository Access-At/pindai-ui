import { Children, JSX } from 'react'

interface Props<T> {
  of: T[]
  render: (item: T, index: number) => JSX.Element
}

export default function EachUtil<T>({ of, render }: Props<T>) {
  return Children.toArray(of.map((item, index) => render(item, index)))
}
