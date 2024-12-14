/* eslint-disable @typescript-eslint/no-explicit-any */
import { Children, JSX } from "react";

type Props = {
  of: any[];
  render: (item: any, index: number) => JSX.Element;
};

export default function EachUtil({ of, render }: Props) {
  return Children.toArray(of.map((item, index) => render(item, index)));
}
