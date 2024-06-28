import type { ReactNode } from 'react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import type { Except } from 'type-fest'
import { Checkbox, type CheckboxProps } from '../ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form'
import { cn } from '~/lib/utils'

export interface CheckboxInputProps<T extends FieldValues>
  extends Except<CheckboxProps, 'value' | 'defaultValue' | 'name'>,
    UseControllerProps<T> {
  label?: string
  description?: ReactNode
}

export function CheckboxInput<T extends FieldValues>({
  label,
  description,
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  className,
  ...props
}: CheckboxInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={props.disabled}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-start space-x-1.5 space-y-0',
            className,
          )}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="leading-none">
            <FormLabel className="font-normal">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  )
}
