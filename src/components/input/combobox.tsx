"use client";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import type { Except } from "type-fest";
import { Combobox, type ComboboxProps } from "../ui/combobox";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

export interface ComboboxInputProps<T extends FieldValues>
	extends UseControllerProps<T>,
		Except<ComboboxProps, "value"> {
	label?: string;
	description?: string;
}

export function ComboboxInput<T extends FieldValues>({
	label,
	description,
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	data,
	...props
}: ComboboxInputProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			defaultValue={defaultValue}
			disabled={props.disabled}
			rules={rules}
			shouldUnregister={shouldUnregister}
			render={({ field }) => (
				<FormItem>
					<FormLabel required={Boolean(rules?.required)}>{label}</FormLabel>
					<FormControl>
						<Combobox
							data={data}
							{...field}
							{...props}
							onChange={(value) => {
								field.onChange(value);
								props.onChange?.(value);
							}}
						/>
					</FormControl>
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
