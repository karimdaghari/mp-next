import {
	CalendarDaysIcon,
	ChevronRight,
	GlobeIcon,
	Heart,
	Info,
	MapPinned,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	TypographyLarge,
	TypographyMuted,
	TypographySmall,
} from "~/components/ui/typography";

export function EventPreview() {
	return (
		<div className="flex justify-center items-center">
			<div className="device device-iphone-14">
				<div className="device-frame relative">
					<div className="bg-background h-full rounded-t-[60px] rounded-b-[60px] pt-12">
						<div className="h-52 relative rounded-t-[6px]">
							<div className="h-full bg-gray-400" />
							<div className="absolute bottom-2 right-2 flex items-center bg-white rounded-xl px-2 py-1">
								<Heart className="h-5 w-5 mr-1" />
								<span className="font-medium">6</span>
							</div>
						</div>
						<div className="p-4 space-y-4">
							<div className="flex text-purple-500">
								<GlobeIcon className="h-4 w-4 mr-1" />
								<TypographySmall className="font-semibold">
									Événement public
								</TypographySmall>
							</div>

							<div className="border p-4 rounded-lg flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="w-9 h-9 rounded-full bg-gray-400" />
									<p className="font-medium">Jours fériés 2023-2024</p>
								</div>
								<Button
									size="sm"
									className="rounded-xl bg-blue-500 hover:bg-blue-600"
								>
									Suivre
								</Button>
							</div>

							<Badge variant="secondary" className="w-fit font-normal">
								Infos utiles
							</Badge>

							<div className="space-y-3">
								<TypographyLarge>Lundi de Pentecôte</TypographyLarge>
								<div className="flex items-center">
									<CalendarDaysIcon className="h-5 w-5 mr-1" />
									<TypographySmall>lun. 20 mai</TypographySmall>
								</div>
								<div className="flex items-center">
									<MapPinned className="h-5 w-5 mr-1" />
									<TypographySmall>Pas de lieu défini</TypographySmall>
								</div>
								<div className="flex items-center">
									<Info className="h-5 w-5 mr-1" />
									<TypographySmall>En savoir plus</TypographySmall>
									<ChevronRight className="h-4 w-4 ml-2" />
								</div>
							</div>

							<div>
								<TypographyLarge>Participants</TypographyLarge>
								<TypographyMuted>6 likes • 2 commentaires</TypographyMuted>
							</div>

							<div className="space-y-1">
								<TypographyLarge>À props</TypographyLarge>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</p>
							</div>

							<Button className="w-full">Participer</Button>
						</div>
					</div>
				</div>
				<div className="device-stripe" />
				<div className="device-header" />
				<div className="device-sensors" />
				<div className="device-btns" />
				<div className="device-power" />
			</div>
		</div>
	);
}
