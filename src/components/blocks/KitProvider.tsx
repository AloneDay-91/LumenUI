"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { Logo } from "@/components/Logo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { cn } from "@/lib/utils";

export type BlockKit = {
  id: string;
  name: string;
};

/** Kits ship in the source. Adding one is a code change, not a control in the select. */
const KITS: BlockKit[] = [{ id: "lumen", name: "Lumen" }];
const ACTIVE_KEY = "lumen-block-kit";

type KitContextValue = {
  kits: BlockKit[];
  active: BlockKit;
  setActiveId: (id: string) => void;
};

const KitContext = createContext<KitContextValue | null>(null);

export function KitProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState(KITS[0].id);

  useEffect(() => {
    const saved = window.localStorage.getItem(ACTIVE_KEY);
    if (saved && KITS.some((kit) => kit.id === saved)) setActiveId(saved);
  }, []);

  const active = KITS.find((kit) => kit.id === activeId) ?? KITS[0];

  function select(id: string) {
    if (!KITS.some((kit) => kit.id === id)) return;
    setActiveId(id);
    window.localStorage.setItem(ACTIVE_KEY, id);
  }

  const value = useMemo(
    () => ({ kits: KITS, active, setActiveId: select }),
    [active],
  );

  return <KitContext.Provider value={value}>{children}</KitContext.Provider>;
}

export function useKit() {
  const value = useContext(KitContext);
  if (!value) throw new Error("useKit must be used inside KitProvider");
  return value;
}

export function KitSelect({ className }: { className?: string }) {
  const { kits, active, setActiveId } = useKit();

  return (
    <Select
      value={active.name}
      onValueChange={(value) => {
        if (!value || value === active.name) return;
        const kit = kits.find((item) => item.name === value);
        if (kit) setActiveId(kit.id);
      }}
    >
      <SelectTrigger size="sm" className={className} aria-label="Kit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false}>
        <SelectGroup>
          {kits.map((kit) => (
            <SelectItem key={kit.id} value={kit.name}>
              {kit.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

/** The same select, at sidebar scale: the kit mark, its name, then the chevron. */
export function KitSwitcher({ className }: { className?: string }) {
  const { kits, active, setActiveId } = useKit();

  return (
    <Select
      value={active.name}
      onValueChange={(value) => {
        if (!value || value === active.name) return;
        const kit = kits.find((item) => item.name === value);
        if (kit) setActiveId(kit.id);
      }}
    >
      <SelectTrigger
        aria-label="Kit"
        className={cn(
          "w-full gap-2.5 rounded-full py-0 ps-2 pe-3 data-[size=default]:h-12",
          className,
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Logo className="size-4" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
          <SelectValue className="flex-none text-xs font-medium" />
          <span className="text-[11px] text-muted-foreground">Kit</span>
        </span>
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false} sideOffset={6}>
        <SelectGroup>
          {kits.map((kit) => (
            <SelectItem
              key={kit.id}
              value={kit.name}
              className="min-h-9 rounded-full"
            >
              <span className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Logo className="size-3" />
                </span>
                {kit.name}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
