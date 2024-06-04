import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "~/components/logo/logo";
import { buttonVariants } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function LoginForm() {
	return (
		<div className="h-full flex flex-col justify-center w-full items-center">
			<div className="w-full max-w-md flex flex-col gap-4 justify-center items-center p-4 lg:p-0">
				<Logo className="h-10 w-fit" />
				<Card className="w-full">
					<CardHeader>
						<CardTitle className="text-2xl">
							Connectez vous à votre compte
						</CardTitle>
						<CardDescription>
							Connectez vous avec votre adresse email
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-2">
						<Label htmlFor="email">Adresse email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</CardContent>
					<CardFooter className="grid gap-2">
						<Link
							href="/dashboard"
							className={buttonVariants({
								className: "w-full",
							})}
						>
							Demander un lien de connexion
							<ArrowRight className="h-4 w-4 ml-2" />
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
