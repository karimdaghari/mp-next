import type { ReactNode } from 'react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import type { Except } from 'type-fest'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Switch, type SwitchProps } from '../ui/switch'
import { cn } from '~/lib/utils'

export interface SwitchInputProps<T extends FieldValues>
  extends Except<SwitchProps, 'value' | 'defaultValue' | 'name' | 'checked'>,
    UseControllerProps<T> {
  label?: string
  description?: ReactNode
  readOnly?: boolean
}
export function SwitchInput<T extends FieldValues>({
  label,
  description,
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  className,
  ...props
}: SwitchInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={props.disabled || props.readOnly}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn(
            'rounded-md border p-4',
            fieldState.error && 'border-red-500',
            className,
          )}
        >
          <div className="flex items-center space-x-4">
            <FormControl>
              <Switch
                {...field}
                onCheckedChange={(checked) => {
                  field.onChange(checked)
                  props.onCheckedChange?.(checked)
                }}
                checked={field.value}
              />
            </FormControl>
            <div>
              <FormLabel>{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
              <FormMessage />
            </div>
          </div>
        </FormItem>
      )}
    />
  )
}
