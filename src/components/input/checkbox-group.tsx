"use client";
import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import type { Except } from "type-fest";
import { Checkbox, type CheckboxProps } from "../ui/checkbox";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

export interface CheckboxGroupInputProps<T extends FieldValues>
	extends Except<CheckboxProps, "value" | "defaultValue" | "name">,
		UseControllerProps<T> {
	label?: string;
	description?: ReactNode;
	items: {
		value: number | string | boolean;
		label: string;
		readOnly?: boolean;
		disabled?: boolean;
	}[];
}

export function CheckboxGroupInput<T extends FieldValues>({
	label,
	description,
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	items,
	...props
}: CheckboxGroupInputProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			defaultValue={defaultValue}
			disabled={props.disabled}
			rules={rules}
			shouldUnregister={shouldUnregister}
			render={() => (
				<FormItem>
					<div className="mb-4">
						<FormLabel>{label}</FormLabel>
						<FormDescription>{description}</FormDescription>
					</div>
					{items.map((item) => (
						<FormField
							key={item.label}
							control={control}
							name={name}
							render={({ field }) => {
								return (
									<FormItem
										key={String(item.value)}
										className="flex flex-row items-start space-x-3 space-y-0"
									>
										<FormControl>
											<Checkbox
												disabled={item.readOnly || item.disabled}
												checked={field.value?.includes(item.value)}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([
																...(field?.value ?? []),
																item.value,
															])
														: field.onChange(
																field.value?.filter(
																	(value: string | number | boolean) =>
																		String(value) !== String(item.value),
																),
															);
												}}
											/>
										</FormControl>
										<FormLabel className="font-normal">{item.label}</FormLabel>
									</FormItem>
								);
							}}
						/>
					))}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
