import type { FieldValues } from "react-hook-form";
import { TextInput, type TextInputProps } from "./text";

interface TimePickerInputProps<T extends FieldValues>
	extends TextInputProps<T> {}

export function TimePickerInput<T extends FieldValues>(
	props: TimePickerInputProps<T>,
) {
	return <TextInput {...props} type="time" />;
}
