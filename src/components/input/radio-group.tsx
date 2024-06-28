"use client";
import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import type { Except } from "type-fest";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	RadioGroup,
	RadioGroupItem,
	type RadioGroupProps,
} from "../ui/radio-group";

export interface RadioGroupInputProps<T extends FieldValues>
	extends Except<RadioGroupProps, "value" | "defaultValue" | "name">,
		UseControllerProps<T> {
	label?: string;
	description?: ReactNode;
	items: {
		label: string;
		value: boolean | string | number;
	}[];
}

export function RadioGroupInput<T extends FieldValues>({
	label,
	description,
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	items,
	...props
}: RadioGroupInputProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			defaultValue={defaultValue}
			disabled={props.disabled}
			rules={rules}
			shouldUnregister={shouldUnregister}
			render={({ field }) => (
				<FormItem className="space-y-3">
					<div>
						<FormLabel>{label}</FormLabel>
						<FormDescription>{description}</FormDescription>
					</div>
					<FormControl>
						<RadioGroup
							onValueChange={(value) => {
								if (!value) return field.onChange(null);
								const item = items.find((item) => String(item.value) === value);
								console.log({ value, item });
								field.onChange(item?.value);
							}}
							defaultValue={String(field.value)}
							className="flex flex-col space-y-1"
						>
							{items.map(({ label, value }) => (
								<FormItem
									key={label}
									className="flex items-center space-x-2 space-y-0"
								>
									<FormControl>
										<RadioGroupItem value={String(value)} />
									</FormControl>
									<FormLabel className="font-normal">{label}</FormLabel>
								</FormItem>
							))}
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
