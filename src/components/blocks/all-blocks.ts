import { dashboardBlocks } from "@/components/blocks/dashboard-blocks"
import { lumenBlocks, type LumenBlock } from "@/components/blocks/lumen-blocks"

/** Every block of every kit. A block's `kit` is its category; the category knows its kit. */
export const allBlocks: LumenBlock[] = [...lumenBlocks, ...dashboardBlocks]
