"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Logo } from "@/components/Logo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  blockKits,
  getBlockCategory,
  type BlockKitId,
} from "@/lib/block-categories";
import { cn } from "@/lib/utils";

export type BlockKit = (typeof blockKits)[number];

const KITS: readonly BlockKit[] = blockKits;
const ACTIVE_KEY = "lumen-block-kit";

function isKitId(id: string): id is BlockKitId {
  return KITS.some((kit) => kit.id === id);
}

/** The kit a /blocks/<category> URL belongs to, if any. */
function kitOfPath(pathname: string) {
  return getBlockCategory(pathname.split("/")[2] ?? "")?.kit;
}

const savedListeners = new Set<() => void>();

function subscribeSaved(listener: () => void) {
  savedListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    savedListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readSaved() {
  return window.localStorage.getItem(ACTIVE_KEY);
}

function saveKit(id: BlockKitId) {
  if (readSaved() === id) return;
  window.localStorage.setItem(ACTIVE_KEY, id);
  for (const listener of savedListeners) listener();
}

function KitMark({ kit, className }: { kit: BlockKit; className?: string }) {
  return kit.id === "dashboard" ? (
    <LayoutDashboard className={className} />
  ) : (
    <Logo className={className} />
  );
}

type KitContextValue = {
  kits: readonly BlockKit[];
  active: BlockKit;
  setActiveId: (id: string) => void;
};

const KitContext = createContext<KitContextValue | null>(null);

export function KitProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const saved = useSyncExternalStore(subscribeSaved, readSaved, () => null);
  // A category page shows its own kit. Elsewhere, the last kit picked comes back.
  const fromPath = kitOfPath(pathname);
  const activeId: BlockKitId =
    fromPath ?? (saved && isKitId(saved) ? saved : KITS[0].id);
  const active = KITS.find((kit) => kit.id === activeId) ?? KITS[0];

  useEffect(() => {
    if (fromPath) saveKit(fromPath);
  }, [fromPath]);

  const value = useMemo(() => {
    function select(id: string) {
      if (!isKitId(id)) return;
      saveKit(id);
      // A category of the other kit would contradict the select: go to the index.
      if (fromPath && fromPath !== id) router.push("/blocks");
    }
    return { kits: KITS, active, setActiveId: select };
  }, [active, fromPath, router]);

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
          <KitMark kit={active} className="size-4" />
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
                  <KitMark kit={kit} className="size-3" />
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
