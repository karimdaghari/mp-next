import {
	ArrowRight,
	CalendarFold,
	CalendarPlus,
	CalendarPlus2,
	CalendarRange,
	GalleryVerticalEnd,
	Heart,
	Send,
	Share2,
	Users,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "~/components/dashboard-header";
import { buttonVariants } from "~/components/ui/button";
import { TypographyH4 } from "~/components/ui/typography";
import { StatCardDashboard } from "./_components/stat-card-dashboard";
import { HistoryTable } from "./history/history-table";

export default function Page() {
	return (
		<>
			<DashboardHeader
				title="Dashboard"
				description="Accédez aux KPIs et aux statistiques de votre compte"
			/>
			<div className="grid gap-4">
				<div className="grid grid-cols-2 gap-2">
					<StatCardDashboard title="IFC" value={3425} icon={CalendarFold} />
					<StatCardDashboard
						title="Nb d'agendas vides"
						value={3}
						icon={CalendarFold}
						footer={
							<Link
								href="/dashboard/agendas"
								className={buttonVariants({
									className: "w-full",
								})}
							>
								Tout voir
								<ArrowRight className="ml-2 w-4 h-4" />
							</Link>
						}
					/>
				</div>
				<div className="grid lg:grid-cols-3 grid-cols-2 gap-2">
					<StatCardDashboard
						title="Events (vif)"
						value={540}
						icon={CalendarPlus2}
					/>
					<StatCardDashboard title="Agendas" value={75} icon={CalendarRange} />
					<div className="col-span-full lg:col-span-1">
						<StatCardDashboard
							title="Utilisateurs uniques"
							value={954}
							icon={Users}
						/>
					</div>
				</div>
				<div className="grid lg:grid-cols-2 gap-4">
					<div className="grid gap-2">
						<TypographyH4>Cumulé agenda</TypographyH4>
						<div className="grid lg:grid-cols-2 gap-2">
							<StatCardDashboard
								title="Nb cumulé de suivis d'agendas"
								value={77}
								icon={CalendarPlus}
							/>
							<StatCardDashboard
								title="Nb cumulé de partages d'agendas"
								value={221}
								icon={Share2}
							/>
							<div className="col-span-full">
								<StatCardDashboard
									title="Nb cumulé d'abonnements aux agendas"
									value={221}
									icon={CalendarPlus}
								/>
							</div>
						</div>
					</div>
					<div className="grid gap-2">
						<TypographyH4>Cumulé events</TypographyH4>
						<div className="grid lg:grid-cols-2 gap-2">
							<StatCardDashboard
								title="Nb cumulé de likes d'events vifs"
								value={1050}
								icon={Heart}
							/>
							<StatCardDashboard
								title="Nb cumulé de partages d'events"
								value={95}
								icon={Share2}
							/>
							<div className="col-span-full">
								<StatCardDashboard
									title="Nb cumulé d'envois d'un event dans un calendar"
									value={432}
									icon={Send}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="hidden sm:block">
					<StatCardDashboard
						title="Historique"
						value={<HistoryTable />}
						icon={GalleryVerticalEnd}
						footer={
							<Link
								href="/dashboard/history"
								className={buttonVariants({
									className: "w-full",
								})}
							>
								Voir tout
								<ArrowRight className="ml-2 w-4 h-4" />
							</Link>
						}
					/>
				</div>
			</div>
		</>
	);
}
