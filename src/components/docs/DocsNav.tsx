"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const version = process.env.NEXT_PUBLIC_VERSION;

const sections = [
	{
		title: "Démarrage",
		items: [
			{ name: "Introduction", href: "/docs" },
			{ name: "Installation", href: "/docs/installation" },
		],
	},
	{
		title: "Fondations",
		items: [
			{ name: "Styles", href: "/docs/styles" },
		],
	},
	{
		title: "Composants",
		items: [
			{ name: "Alert", href: "/docs/components/alert" },
			{ name: "Badge", href: "/docs/components/badge" },
			{ name: "Button", href: "/docs/components/button" },
			{ name: "Card", href: "/docs/components/card" },
			{ name: "Input", href: "/docs/components/input" },
			{ name: "Label", href: "/docs/components/label" },
			{ name: "Select", href: "/docs/components/select" },
			{ name: "Skeleton", href: "/docs/components/skeleton" },
			{ name: "Textarea", href: "/docs/components/textarea" },
		],
	},
];

export default function DocsNav() {
	const pathname = usePathname();

	const [openSections, setOpenSections] = useState<Record<number, boolean>>({
		0: true, // Démarrage ouvert par défaut
		1: true, // Fondations ouvert par défaut
	});

	useEffect(() => {
		if (!pathname) return;
		// Ouvrir automatiquement la section qui contient la route active
		const newOpen: Record<number, boolean> = {};
		sections.forEach((section, idx) => {
			const hasActive = section.items.some((it) =>
				it.href === pathname || (it.href !== "/docs" && pathname.startsWith(it.href))
			);
			newOpen[idx] = hasActive || openSections[idx];
		});
		setOpenSections((prev) => ({ ...prev, ...newOpen }));
	}, [pathname]);

	const toggle = (index: number) => {
		setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	return (
		<nav className="space-y-1">
			{/* Version badge */}
			<div className="mb-6 pb-4 border-b border-border">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium text-foreground">
						Documentation
					</span>
					<span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
						{version}
					</span>
				</div>
			</div>

			{sections.map((section, index) => (
				<div key={index} className="space-y-1">
					<button
						onClick={() => toggle(index)}
						className="w-full flex items-center justify-between p-2 text-sm font-medium text-foreground hover:bg-muted/50 rounded-md transition-colors"
						aria-expanded={openSections[index]}
					>
						<span>{section.title}</span>
						<svg
							className={`h-4 w-4 transition-transform duration-200 ${
								openSections[index] ? "rotate-90" : ""
							}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>

					{openSections[index] && (
						<div className="ml-2 space-y-1 border-l border-border pl-4">
							{section.items.map((item, itemIndex) => {
								const isActive = !!pathname && (pathname === item.href || (item.href !== "/docs" && pathname.startsWith(item.href)));
								return (
									<Link
										key={itemIndex}
										href={item.href}
										aria-current={isActive ? "page" : undefined}
										className={`block p-2 text-sm rounded-md transition-colors ${
										isActive
											? "bg-muted text-primary border font-semibold"
											: "text-muted-foreground hover:text-foreground hover:bg-muted/30"
										}`}
									>
									{item.name}
									</Link>
								);
							})}
						</div>
					)}
				</div>
			))}

			{/* Quick actions */}
			<div className="mt-8 pt-4 border-t border-border space-y-2">
				<Link
					href="#"
					className="flex items-center p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-md transition-colors"
				>
					<svg
						className="h-4 w-4 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Support | Aide
				</Link>
				<Link
					href="#"
					className="flex items-center p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-md transition-colors"
				>
					<svg
						className="h-4 w-4 mr-2"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0018 10c0-4.42-3.58-8-8-8z"
							clipRule="evenodd"
						/>
					</svg>
					Voir sur GitHub
				</Link>
			</div>
		</nav>
	);
}
