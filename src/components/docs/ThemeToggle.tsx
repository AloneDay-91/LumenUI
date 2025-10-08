"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";


export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = window.document.documentElement;

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.toggle("dark", systemTheme === "dark");
    } else {
      root.classList.toggle("dark", newTheme === "dark");
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="flex items-center rounded-full border border-border bg-background p-1 gap-1">
      <Button
          variant='ghost' size="icon"
        onClick={() => handleThemeChange("light")}
        className={`transition-colors h-auto w-auto p-1 rounded-full ${
          theme === "light"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        title="Mode clair"
      >
        <Sun className="h-4 w-4" />
      </Button>

      <Button
          variant='ghost' size="icon"
        onClick={() => handleThemeChange("system")}
        className={`transition-colors h-auto w-auto p-1 rounded-full ${
          theme === "system"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        title="Système"
      >
        <Monitor className="h-4 w-4" />
      </Button>

      <Button
          variant='ghost' size="icon"
        onClick={() => handleThemeChange("dark")}
        className={`transition-colors h-auto w-auto p-1 rounded-full ${
          theme === "dark"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        title="Mode sombre"
      >
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  );
}

