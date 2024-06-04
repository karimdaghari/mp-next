"use client";
import {
	CalendarRangeIcon,
	GalleryVerticalEnd,
	HomeIcon,
	LifeBuoy,
	LogOutIcon,
	Settings2,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { QuickAccessWrapper } from "~/app/dashboard/_components/quick-access-wrapper";
import { Logo } from "~/components/logo/logo";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { buttonVariants } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { TypographyMuted, TypographySmall } from "~/components/ui/typography";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export function Navbar() {
	return (
		<nav className="p-2 px-4 bg-white border-b flex items-center justify-between shadow-sm">
			<div className="flex items-center">
				<Link href="/dashboard">
					<Logo
						className={buttonVariants({
							variant: "ghost",
							className: "h-10 w-fit",
						})}
					/>
				</Link>
				<NavigationMenu className="xl:block hidden">
					<NavigationMenuList>
						<Link href="/dashboard" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Dashboard
							</NavigationMenuLink>
						</Link>
						<Link href="/dashboard/agendas" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Mes agendas
							</NavigationMenuLink>
						</Link>
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			<div className="lg:w-[300px]">
				<QuickAccessWrapper />
			</div>

			<div className="pt-0.5">
				<DropdownMenu>
					<DropdownMenuTrigger
						className={buttonVariants({
							variant: "ghost",
							className: "flex items-center justify-start",
						})}
					>
						<div className="leading-snug text-right">
							<TypographySmall>Dauphine</TypographySmall>
							<TypographyMuted className="text-xs hidden lg:block">
								Jean Michel Da Silva Da Costa
							</TypographyMuted>
						</div>
						<Avatar className="ml-2 h-8 w-8">
							<AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXia5ZUF0lUUa3JrMJzVQ2r-ojR8D6E9tZnd6D-6teRQ&s" />
							<AvatarFallback>
								<TypographySmall>D</TypographySmall>
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Jean Michel Da Silva Da Costa</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild className="xl:hidden">
							<Link href="/dashboard">
								<HomeIcon className="h-4 w-4 mr-2" />
								Dashboard
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild className="xl:hidden">
							<Link href="/dashboard/agendas">
								<CalendarRangeIcon className="h-4 w-4 mr-2" />
								Mes agendas
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator className="xl:hidden" />
						<DropdownMenuItem asChild>
							<Link href="/dashboard/history">
								<GalleryVerticalEnd className="h-4 w-4 mr-2" />
								Historique
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings2 className="h-4 w-4 mr-2" />
							Paramètres
						</DropdownMenuItem>
						<DropdownMenuItem>
							<LifeBuoy className="h-4 w-4 mr-2" />
							Support
						</DropdownMenuItem>
						<DropdownMenuItem>
							<LogOutIcon className="h-4 w-4 mr-2" />
							Se déconnecter
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
}
