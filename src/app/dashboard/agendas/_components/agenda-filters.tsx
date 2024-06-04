import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { DisplayFilters } from "./display-filters";
import { SearchInput } from "./search-input";

interface Props {
	viewSwitcher: React.ReactNode;
}

export function AgendaFilters({ viewSwitcher }: Props) {
	return (
		<section className="flex w-full flex-col lg:flex-row lg:justify-between gap-2 lg:gap-0">
			<div className="flex items-center lg:flex-row flex-col gap-2">
				<div className="w-full lg:w-[300px]">
					<SearchInput placeholder="Rechercher dans vos agendas..." />
				</div>
				<div className="lg:w-fit w-full">
					<DisplayFilters label="Types d'agendas" />
				</div>
			</div>

			<div className="flex items-center gap-2">
				{viewSwitcher}
				<Select>
					<SelectTrigger id="sort" className="w-full lg:w-[260px]">
						<SelectValue placeholder="Trier par" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="popular-first">
							Popularité (plus populaire en 1er)
						</SelectItem>
						<SelectItem value="unpopular-first">
							Popularité (moins populaire 1er)
						</SelectItem>
						<SelectItem value="alphabetical-asc">Alphabétique (A-Z)</SelectItem>
						<SelectItem value="alphabetical-desc">
							Alphabétique (Z-A)
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</section>
	);
}
