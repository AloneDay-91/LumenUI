import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export const PANEL_RADIUS = "rounded-[min(var(--radius-4xl),24px)]";

export const FEATURE_TITLE =
  "text-2xl leading-tight font-medium tracking-tight text-balance md:text-3xl";

export function FeatureIntro({
  label,
  title,
  children,
  className,
}: {
  label: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Badge variant="outline">{label}</Badge>
      <h2 className={cn("mt-4 max-w-md", FEATURE_TITLE)}>{title}</h2>
      {children ? (
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {children}
        </p>
      ) : null}
    </div>
  );
}
