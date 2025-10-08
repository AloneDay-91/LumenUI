import {StackIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export function Footer() {
    return (
        <footer className="border-t border-border/50 backdrop-blur-md bg-background/30 px-4 py-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <StackIcon className="h-4 w-4" />
                        <span>Lumen UI © 2025</span>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Link href="/docs" className="hover:text-foreground transition-colors">
                            Documentation
                        </Link>
                        <Link href="/docs/components/button" className="hover:text-foreground transition-colors">
                            Composants
                        </Link>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}