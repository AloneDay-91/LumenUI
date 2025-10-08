'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Define a type for the navigation items
interface NavItem {
  title: string;
  href: string;
}

// Configuration for the navigation links
const navItems: NavItem[] = [
  {
    title: "Button",
    href: "/docs/components/button",
  },
    {
    title: "Card",
    href: "/docs/components/card",
  },
    {
    title: "Input",
    href: "/docs/components/input",
  },
  // Add other components here as you create them
];

export function DocsSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent" : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
