import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SearchIcon } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { Kbd } from "@/components/ui/kbd"

export function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="w-72 justify-between text-muted-foreground"
            suppressHydrationWarning
          >
            <div className="flex items-center gap-2">
              <SearchIcon />
              <span>Search...</span>
            </div>
            <Kbd data-icon="inline-end" className="translate-x-0.5">
              /
            </Kbd>
          </Button>
        }
      />
      <DialogContent showCloseButton={false}>
        <SearchBar placeholder="Search mods, games or users" />
        <ToggleGroup
          size="sm"
          defaultValue={["all"]}
          variant="outline"
          spacing={2}
        >
          <ToggleGroupItem value="all" aria-label="Show all">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="games" aria-label="Show Games">
            Games
          </ToggleGroupItem>
          <ToggleGroupItem value="mods" aria-label="Show Mods">
            Mods
          </ToggleGroupItem>
          <ToggleGroupItem value="users" aria-label="Show Users">
            Users
          </ToggleGroupItem>
        </ToggleGroup>
        <hr />
        <p>Games (654)</p>
        <p>Mods (14534)</p>
      </DialogContent>
    </Dialog>
  )
}
