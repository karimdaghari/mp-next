import type { LucideIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { TypographyH4 } from "~/components/ui/typography";

interface Props {
	icon: LucideIcon;
	title: string;
	description?: string;
	footer?: React.ReactNode;
	value: React.ReactNode;
}

export function StatCardDashboard({
	icon: Icon,
	title,
	value,
	description,
	footer,
}: Props) {
	return (
		<Card className="min-h-full w-full">
			<CardHeader className="pb-0">
				<div className="flex items-center justify-between text-muted-foreground">
					<CardTitle className="text-base">{title}</CardTitle>
					<Icon className="h-4 w-4" />
				</div>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				{typeof value === "string" || typeof value === "number" ? (
					<TypographyH4>{value}</TypographyH4>
				) : (
					value
				)}
			</CardContent>
			{footer && <CardFooter className="p-4 pt-0">{footer}</CardFooter>}
		</Card>
	);
}
