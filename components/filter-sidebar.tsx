"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Category, Tag } from "@/generated/prisma/client"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

const contents = [
  {
    id: "1",
    name: "Show adult content",
  },
]

export default function FilterSidebar({
  categories,
  tags,
}: {
  categories: Category[]
  tags: Tag[]
}) {
  const anchor = useComboboxAnchor()

  const [selectedTags, setSelectedTags] = React.useState<string[]>([])

  const tagSlugs = tags.map((tag) => tag.slug)
  const tagNames = new Map(tags.map((tag) => [tag.slug, tag.name]))

  return (
    <aside
      className="w-full space-y-6 rounded bg-card p-4 shadow lg:w-64"
      aria-label="Filters"
    >
      <h3 className="mb-4 text-lg font-medium">Filters</h3>

      <div>
        <p className="mb-2 text-sm font-medium">Category</p>

        <div className="max-h-64 space-y-2 overflow-y-auto pr-2">
          {categories.map((category) => {
            return (
              <FieldGroup key={category.id}>
                <Field orientation="horizontal">
                  <Checkbox
                    id={`category-${category.id}`}
                    name={`category-${category.slug}`}
                  />
                  <FieldLabel htmlFor={`category-${category.id}`}>
                    {category.name}
                  </FieldLabel>
                </Field>
              </FieldGroup>
            )
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Tags</p>

        <Combobox
          multiple
          autoHighlight
          items={tagSlugs}
          value={selectedTags}
          onValueChange={setSelectedTags}
        >
          <ComboboxChips ref={anchor} className="w-full lg:w-56">
            <ComboboxValue>
              {(values) => (
                <React.Fragment>
                  {values.map((slug: string) => (
                    <ComboboxChip key={slug}>
                      {tagNames.get(slug) ?? slug}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>

          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No tags found.</ComboboxEmpty>
            <ComboboxList>
              {(slug) => (
                <ComboboxItem key={slug} value={slug}>
                  {tagNames.get(slug) ?? slug}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Content options</p>

        <div className="max-h-64 space-y-2 overflow-y-auto pr-2">
          {contents.map((content) => {
            return (
              <FieldGroup key={content.id}>
                <Field orientation="horizontal">
                  <Checkbox
                    id={`category-${content.id}`}
                    name="terms-checkbox-basic"
                  />
                  <FieldLabel htmlFor={`category-${content.id}`}>
                    {content.name}
                  </FieldLabel>
                </Field>
              </FieldGroup>
            )
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium">Date</p>

        <RadioGroup className="space-y-1">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="all" id="date-all" />
            <Label htmlFor="date-all" className="cursor-pointer font-normal">
              All time
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="week" id="date-week" />
            <Label htmlFor="date-week" className="cursor-pointer font-normal">
              Past week
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="month" id="date-month" />
            <Label htmlFor="date-month" className="cursor-pointer font-normal">
              Past month
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="custom" id="date-custom" disabled />
            <Label htmlFor="date-custom" className="cursor-pointer font-normal">
              Custom range
            </Label>
          </div>
        </RadioGroup>

        {false && (
          <div className="mt-3">
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                  </Button>
                }
              />

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" numberOfMonths={1} />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </aside>
  )
}
