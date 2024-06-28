'use client'
import { Check, ChevronsUpDown, PlusIcon, X, XIcon } from 'lucide-react'
import R from 'remeda'
import { type ReactNode, useState } from 'react'
import { Button, buttonVariants } from './button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '~/lib/utils'
import { Badge } from './badge'

interface Option {
  icon?: ReactNode
  label: string
  value: string | number | boolean
  checked?: boolean
  /**
   * Group key
   */
  group?: Group['key']
  render?: ReactNode
  onClick?: () => unknown
}

interface Group {
  key: string | number
  label: string
}

export interface ComboboxProps {
  data: Option[]
  groups?: Group[]
  multiple?: boolean
  value?: string | number | string[] | number[] | null | boolean
  onChange?: (
    value: string | string[] | number[] | number | null | undefined | boolean,
  ) => unknown | Promise<unknown>
  placeholder?: React.ReactNode
  placeholderSearch?: string
  noResultLabel?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  creatable?: boolean
  onCreate?: (value: string) => unknown
  createLabel?: string | ((value: string) => string)
  loading?: boolean
  classNames?: {
    /**
     * Classname for the input
     */
    input?: string
    /**
     * Classname for the list
     */
    list?: string
    /**
     * Classname for the item
     */
    item?: string
    /**
     * Classname for the badge (when multiple)
     */
    badge?: string
    /**
     * Classname for the group
     */
    group?: string
    /**
     * Classname for the popover content
     */
    popover?: string
    /**
     * Classname for the trigger
     */
    trigger?: string
  }
}

export function Combobox({
  classNames,
  value: defaultValue,
  loading,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const selected =
    defaultValue === null || defaultValue === undefined
      ? []
      : Array.isArray(defaultValue)
        ? defaultValue.map(String)
        : [String(defaultValue)]

  const options = R.groupBy(
    props.data.map(({ group = '', ...option }) => ({
      ...option,
      group: String(group),
      value: String(option.value),
    })),
    R.prop('group'),
  )

  const getOptionDisplay = (option: Option, selected?: boolean) => {
    return (
      <div className="line-clamp-1 flex w-full items-center">
        {option.icon && <span className="mr-2">{option.icon}</span>}
        {selected ? option.label : option.render ?? option.label}
      </div>
    )
  }

  const filteredItems = Object.entries(options).filter(([group, options]) => {
    const normalizeStr = (value: string) =>
      value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')

    const groupHeading = props.groups?.find(
      (g) => String(g.key) === group,
    )?.label
    const normalizedGroupHeading = normalizeStr(groupHeading ?? '')
    const optionsLabels = options.map((option) => option.label)
    const normalizedOptions = optionsLabels.map((label) => normalizeStr(label))
    const normalizedSearch = normalizeStr(search)
    return (
      normalizedGroupHeading?.toLowerCase().includes(normalizedSearch) ||
      normalizedOptions.some((label) =>
        label.toLowerCase().includes(normalizedSearch),
      )
    )
  })
  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger
        className={buttonVariants({
          variant: 'outline',
          className: cn(
            'w-full justify-between font-normal',
            classNames?.trigger,
          ),
        })}
        disabled={props.disabled || props.readOnly}
      >
        <>
          {selected.length ? (
            getSelected() ?? (
              <span className="line-clamp-1 text-muted-foreground">
                {props.placeholder}
              </span>
            )
          ) : (
            <span className="line-clamp-1 text-muted-foreground">
              {props.placeholder}
            </span>
          )}
          <div
            className={cn('flex items-center', {
              'ml-auto': !selected.length && !props.placeholder,
            })}
          >
            {props.multiple && selected.length >= 1 && (
              <Button
                size="icon"
                variant="ghost"
                className="opacity-50 hover:opacity-100"
                type="button"
                onClick={async (e) => {
                  e.stopPropagation()
                  await props.onChange?.(null)
                }}
              >
                <XIcon className="size-4" />
              </Button>
            )}
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </div>
        </>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn('w-full p-0', classNames?.popover)}
      >
        <Command className="w-full" shouldFilter={false} loop>
          <CommandInput
            placeholder={props.placeholderSearch ?? 'Rechercher...'}
            className={cn('border-0 focus-visible:ring-0', classNames?.input)}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className={cn('w-full', classNames?.list)}>
            {loading ? (
              <CommandEmpty>Chargement...</CommandEmpty>
            ) : filteredItems.length === 0 ? (
              <CommandEmpty>
                {props.noResultLabel ?? 'Aucun résultat'}
              </CommandEmpty>
            ) : (
              filteredItems.map(([group, options]) => {
                const heading = props.groups?.find(
                  (g) => String(g.key) === group,
                )?.label
                return (
                  <CommandGroup
                    key={group}
                    heading={heading}
                    className={classNames?.group}
                  >
                    {options?.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        className={classNames?.item}
                        onSelect={async (currentValue) => {
                          option.onClick?.()
                          let updated
                          if (props.multiple) {
                            if (selected.includes(currentValue)) {
                              updated = selected.filter(
                                (value) => value !== currentValue,
                              )
                            } else {
                              updated = [...selected, currentValue]
                            }
                          } else {
                            if (selected.includes(currentValue)) {
                              updated = null
                            } else {
                              updated = currentValue
                            }
                          }
                          const value =
                            updated !== null
                              ? getOriginalValue(updated)
                              : updated
                          await props.onChange?.(value)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 size-4',
                            selected.includes(option.value) || option.checked
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {getOptionDisplay(option)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )
              })
            )}
            {props.creatable && props.onCreate && (
              <>
                <CommandSeparator />
                <CommandGroup heading="">
                  <CommandItem
                    value={search}
                    onSelect={() => {
                      props.onCreate?.(search)
                      setSearch('')
                    }}
                    className="hover:cursor-pointer hover:bg-accent"
                  >
                    <PlusIcon className="mr-2 size-4" />
                    {props.createLabel
                      ? typeof props.createLabel === 'function'
                        ? props.createLabel(search)
                        : props.createLabel
                      : search.length
                        ? `Créer "${search}"`
                        : 'Créer une nouvelle option'}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )

  function getSelectedOption(value: string | string[]) {
    let selectedOptions
    if (Array.isArray(value)) {
      selectedOptions = props.data.filter((option) =>
        value.includes(String(option.value)),
      )
    } else {
      selectedOptions = props.data.find(
        (option) => String(option.value) === value,
      )
    }
    if (props.multiple) return selectedOptions ?? null
    if (Array.isArray(selectedOptions)) return selectedOptions[0] ?? null
    return selectedOptions ?? null
  }

  function getOriginalValue(value: string | string[]) {
    const options = getSelectedOption(value)
    if (Array.isArray(options))
      return options.map((option) => option.value) as string[] | number[]
    return options?.value ?? null
  }

  function getSelected() {
    const values = getSelectedOption(selected)
    if (!values) return null
    if (props.multiple && Array.isArray(values)) {
      return (
        <div className="flex flex-wrap gap-1">
          {values?.map((option) => {
            return (
              <Badge
                variant="outline"
                key={String(option.value)}
                className={cn('mr-1', classNames?.badge)}
              >
                {getOptionDisplay(option)}
                <X
                  className="ml-2 h-3 w-3"
                  role="button"
                  onClick={async (e) => {
                    e.stopPropagation()
                    const updated = getOriginalValue(
                      selected.filter(
                        (currentlySelected) =>
                          Number(currentlySelected) !== option.value,
                      ),
                    )
                    await props.onChange?.(updated)
                  }}
                  aria-label="Supprimer"
                />
              </Badge>
            )
          })}
        </div>
      )
    }
    return getOptionDisplay(values as Option, true)
  }
}
