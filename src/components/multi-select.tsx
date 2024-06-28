'use client'

import { X } from 'lucide-react'
import * as React from 'react'

import { Command as CommandPrimitive } from 'cmdk'
import { Badge } from './ui/badge'
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command'

type Data = Record<'value' | 'label', string>

interface Props {
  icon?: React.ReactNode
  placeholder: string
  data: Data[]
  selected?: Data[]
}

export function MultiSelect({
  icon,
  data,
  placeholder,
  selected: initialSelected = [],
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Data[]>(initialSelected)
  const [inputValue, setInputValue] = React.useState('')

  const handleUnselect = React.useCallback((data: Data) => {
    setSelected((prev) => prev.filter((s) => s.value !== data.value))
  }, [])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    [],
  )

  const selectables = data.filter((datum) => !selected.includes(datum))

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group h-10 border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((datum) => {
            return (
              <Badge key={datum.value} variant="secondary">
                {datum.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(datum)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(datum)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              <CommandList>
                {selectables.map((datum) => {
                  return (
                    <CommandItem
                      key={datum.value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue('')
                        setSelected((prev) => [...prev, datum])
                      }}
                      className="cursor-pointer"
                    >
                      {datum.label}
                    </CommandItem>
                  )
                })}
              </CommandList>
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  )
}
