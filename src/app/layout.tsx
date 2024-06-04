import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./devices.css";
import "./globals.css";
import { cn } from "~/lib/utils";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Meeting Potes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className={cn("min-h-dvh h-dvh bg-muted", manrope.className)}>
				{children}
			</body>
		</html>
	);
}
