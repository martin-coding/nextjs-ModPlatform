"use client"

import { useQueryState } from "nuqs"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

type Option = {
  label: string
  value: string
}

export function SortSelect({
  options,
  defaultValue,
}: {
  options: Option[]
  defaultValue: string
}) {
  const [sort, setSort] = useQueryState("sort", {
    defaultValue,
    shallow: false,
  })

  return (
    <NativeSelect
      className="shrink-0"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
    >
      {options.map((opt) => (
        <NativeSelectOption key={opt.value} value={opt.value}>
          {opt.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}
