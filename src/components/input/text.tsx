import type { ReactNode } from 'react'
import type { FieldValues, UseControllerProps } from 'react-hook-form'
import type { Except } from 'type-fest'
import { cn } from '~/lib/utils'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input, type InputProps } from '../ui/input'

export interface TextInputProps<T extends FieldValues>
  extends Except<InputProps, 'value' | 'defaultValue' | 'name'>,
    UseControllerProps<T> {
  label?: string
  description?: ReactNode
  leftSection?: ReactNode
}

export function TextInput<T extends FieldValues>({
  label,
  description,
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  leftSection,
  className,
  ...props
}: TextInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={props.disabled}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel required={Boolean(rules?.required) || props.required}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              {leftSection && (
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  {leftSection}
                </span>
              )}
              <Input
                className={cn(leftSection ? 'pl-10' : '')}
                {...field}
                {...props}
              />
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
