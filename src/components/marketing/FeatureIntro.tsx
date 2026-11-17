import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export const FEATURE_TITLE =
  "font-heading text-2xl leading-tight font-normal tracking-[-0.02em] text-balance md:text-[1.875rem] md:leading-[1.25]";

export function FeatureIntro({
  label,
  title,
  children,
  className,
}: {
  label?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <Badge variant="outline">{label}</Badge> : null}
      <h2 className={cn(label && "mt-4", "max-w-xl", FEATURE_TITLE)}>{title}</h2>
      {children ? (
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          {children}
        </p>
      ) : null}
    </div>
  );
}
