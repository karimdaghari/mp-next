import type { ReactNode } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export interface SelectInputProps<T extends FieldValues>
	extends UseControllerProps<T> {
	label?: string;
	description?: string;
	data: {
		label: ReactNode;
		value: string | number | boolean;
	}[];
	readOnly?: boolean;
	placeholder?: string;
	onChange?: (value?: string | number | boolean | null) => unknown;
	classNames?: {
		trigger?: string;
		list?: string;
		item?: string;
		wrapper?: string;
	};
}

export function SelectInput<T extends FieldValues>({
	label,
	description,
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	placeholder,
	onChange,
	classNames,
	...props
}: SelectInputProps<T>) {
	const data = props.data.map((item) => {
		if (typeof item === "string") {
			return item;
		}
		return {
			label: item.label,
			value: String(item.value),
			originalValue: item.value,
		};
	});

	return (
		<FormField
			control={control}
			name={name}
			defaultValue={defaultValue}
			disabled={props.disabled || props.readOnly}
			rules={rules}
			shouldUnregister={shouldUnregister}
			render={({ field }) => (
				<FormItem className={classNames?.wrapper}>
					{label && (
						<FormLabel required={Boolean(rules?.required)}>{label}</FormLabel>
					)}
					<Select
						onValueChange={(inputValue) => {
							const value =
								data.find((item) => item.value === inputValue)?.originalValue ??
								null;
							field.onChange(value);
							onChange?.(value);
						}}
						value={field.value === null ? undefined : String(field.value)}
						disabled={field.disabled}
					>
						<FormControl>
							<SelectTrigger className={classNames?.trigger}>
								<SelectValue
									placeholder={placeholder ?? "Sélectionner une option"}
								/>
							</SelectTrigger>
						</FormControl>
						<SelectContent className={classNames?.list}>
							{data.map((item) => {
								if (typeof item === "string") {
									return (
										<SelectItem
											className={classNames?.item}
											value={item}
											key={item}
										>
											{item}
										</SelectItem>
									);
								}
								return (
									<SelectItem
										className={classNames?.item}
										value={String(item.value)}
										key={String(item.value)}
									>
										{item.label}
									</SelectItem>
								);
							})}
							<SelectItem value="undefined" disabled>
								{placeholder ?? "Sélectionnez une option"}
							</SelectItem>
						</SelectContent>
					</Select>
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
