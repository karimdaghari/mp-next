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
import { Textarea, type TextareaProps } from "../ui/textarea";

export interface TextareaInputProps<T extends FieldValues>
	extends UseControllerProps<T>,
		Except<TextareaProps, "value" | "defaultValue" | "name"> {
	label?: string;
	description?: string;
}

export function TextareaInput<T extends FieldValues>({
	label,
	description,
	name,
	control,
	defaultValue,
	rules,
	shouldUnregister,
	...props
}: TextareaInputProps<T>) {
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
						<Textarea {...props} {...field} />
					</FormControl>
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
