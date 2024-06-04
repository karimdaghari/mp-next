import { ImageIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { TypographyMuted, TypographySmall } from "./typography";

interface Props {
	label: string;
	className?: string;
	isAvatar?: boolean;
}

export function FileUploader({ label, className, isAvatar = false }: Props) {
	return (
		<div
			className={cn(
				"w-full h-52 border border-dashed rounded-lg p-4 flex flex-col justify-center items-center",
				className,
			)}
		>
			<div
				className={cn(
					"flex items-center",
					isAvatar && "flex-col justify-center",
				)}
			>
				<ImageIcon className={cn(isAvatar ? "h-10 w-10" : "h-12 w-12 mr-2")} />
				<div className={cn(isAvatar && "text-center")}>
					<TypographySmall>{label}</TypographySmall>
					{!isAvatar ? (
						<TypographyMuted>
							Glissez et déposez une image ou cliquez pour en sélectionner une.
						</TypographyMuted>
					) : null}
				</div>
			</div>
		</div>
	);
}
