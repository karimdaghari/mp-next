import { TypographyH2, TypographySmall } from "~/components/ui/typography";

interface Props {
	title: string;
	description?: string;
	rightSection?: React.ReactNode;
}

export function DashboardHeader({ title, description, rightSection }: Props) {
	return (
		<div className="mb-4 flex lg:items-center lg:justify-between lg:flex-row flex-col space-y-2 lg:space-y-0 w-full">
			<div>
				<TypographyH2>{title}</TypographyH2>
				{description && <TypographySmall>{description}</TypographySmall>}
			</div>
			<div>{rightSection}</div>
		</div>
	);
}
