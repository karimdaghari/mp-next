'use client'
import { format } from 'date-fns' // Import format from date-fns
import { CalendarClockIcon, CalendarDaysIcon, XIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import { cn } from '~/lib/utils'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export interface DateInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  onChange?: (value: string | null) => void
  minDate?: Date
  maxDate?: Date
  label: string
  description?: ReactNode
  placeholder?: string
  readOnly?: boolean
  withTime?: boolean
}

export function DateInput<T extends FieldValues>({
  label,
  description,
  placeholder,
  name,
  control,
  minDate,
  maxDate,
  defaultValue,
  rules,
  shouldUnregister,
  readOnly,
  withTime,
  ...props
}: DateInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={props.disabled || readOnly}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => (
        <FormItem>
          <FormLabel required={Boolean(rules?.required)}>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                  disabled={field.disabled}
                >
                  {field.value ? (
                    format(
                      new Date(field.value),
                      `dd/MM/yyyy${withTime ? ' à HH:mm' : ''}`,
                    )
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <div className="ml-auto flex items-center space-x-1">
                    <XIcon
                      className={cn(
                        'size-4 text-left opacity-50 hover:opacity-100 focus:opacity-100',
                        {
                          'pointer-events-none': !field.value,
                          hidden: field.disabled || readOnly || !field.value,
                        },
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        field.onChange(null)
                      }}
                    />
                    {withTime ? (
                      <CalendarClockIcon className="size-4 text-left opacity-50" />
                    ) : (
                      <CalendarDaysIcon className="size-4 text-left opacity-50" />
                    )}
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                defaultMonth={field.value ? new Date(field.value) : undefined}
                onSelect={(selected) => {
                  const value = selected
                    ? format(selected, `yyyy-MM-dd${withTime ? ' HH:mm' : ''}`)
                    : null
                  field.onChange(value)
                }}
                disabled={field.disabled || readOnly}
                initialFocus
                fromDate={minDate}
                toDate={maxDate}
                required={Boolean(rules?.required)}
              />
              <div
                className={cn('border-t p-3', {
                  hidden: !withTime,
                })}
              >
                <Input
                  type="time"
                  disabled={field.disabled || readOnly || !field.value}
                  value={
                    field.value ? format(new Date(field.value), 'HH:mm') : ''
                  }
                  onChange={({ currentTarget: { value } }) => {
                    if (value) {
                      const [hoursInString, minutesInString] = value.split(':')
                      if (!hoursInString || !minutesInString) return
                      const hours = Number.parseInt(hoursInString, 10)
                      const minutes = Number.parseInt(minutesInString, 10)
                      const date = new Date(field.value)
                      date.setHours(hours)
                      date.setMinutes(minutes)
                      field.onChange(date)
                    }
                  }}
                  readOnly={readOnly}
                />
              </div>
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
