"use client"

// Card Rail · adapted from snapcn (https://snapcn.dev/docs/scenes/card-rail).
// The tilted plane and the measured flick (three of them, summed) are snapcn's;
// every card is a Lumen Card holding a real block from the Lumen kits.

import type { ReactNode } from "react"
import { useCurrentFrame } from "remotion"

import { ActivityFeed } from "@/components/blocks/dashboard/ActivityFeed"
import { BillingSettings } from "@/components/blocks/dashboard/BillingSettings"
import { EmptyState } from "@/components/blocks/dashboard/EmptyState"
import { NotificationSettings } from "@/components/blocks/dashboard/NotificationSettings"
import { ProfileSettings } from "@/components/blocks/dashboard/ProfileSettings"
import { StatStrip } from "@/components/blocks/dashboard/StatStrip"
import { AskPanel } from "@/components/blocks/lumen/AskPanel"
import { FormStates } from "@/components/blocks/lumen/FormStates"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"

import { Caption, Stage } from "./stage"

export const REF_W = 714
export const REF_H = 396
export const DURATION = 120

const CARD_W = 300
const CARD_TOP = 98
/** Short enough that the title and description under each block stay inside the frame. */
const CARD_H = 244
const GAP = 32
const DEPTH = 740
/** A gentle lean: enough depth to read as a surface, not so much the blocks tip away. */
const TILT = 8
const HORIZON = 300
/** One flick carries the rail 333 / 325 of a pitch: momentum, not a snap (snapcn's measurement). */
const OVERSHOOT = 333 / 325
const FLICK: readonly (readonly [number, number])[] = [
  [0, 0], [0.0333, 0.009], [0.0667, 0.0338], [0.1, 0.07508], [0.1333, 0.13213], [0.1667, 0.21021],
  [0.2, 0.2973], [0.225, 0.38138], [0.2583, 0.45345], [0.2917, 0.51351], [0.325, 0.56757],
  [0.3583, 0.60961], [0.3917, 0.65165], [0.4333, 0.68468], [0.4583, 0.71171], [0.4917, 0.73874],
  [0.525, 0.76276], [0.5583, 0.78378], [0.5917, 0.8018], [0.625, 0.81982], [0.6583, 0.83483],
  [0.6917, 0.84985], [0.73, 0.86186], [0.7633, 0.87387], [0.7967, 0.88288], [0.8383, 0.89189],
  [0.8717, 0.9009], [0.905, 0.90991], [0.9383, 0.91592], [0.9717, 0.92492], [0.9967, 0.93093],
  [1.03, 0.93694], [2.2, 1],
]

function read(table: readonly (readonly [number, number])[], x: number): number {
  const first = table[0]
  const last = table[table.length - 1]
  if (!first || !last) return 0
  if (x <= first[0]) return first[1]
  if (x >= last[0]) return last[1]
  for (let i = 1; i < table.length; i++) {
    const hi = table[i]
    const lo = table[i - 1]
    if (hi && lo && x <= hi[0]) return lo[1] + ((hi[1] - lo[1]) * (x - lo[0])) / (hi[0] - lo[0])
  }
  return last[1]
}

export interface RailCard {
  title: string
  description: string
  /** A real block from the Lumen kits. */
  block: ReactNode
}

/** Real Lumen blocks, the same components the Blocks pages install. */
export const LUMEN_BLOCKS: readonly RailCard[] = [
  { title: "Ask panel", description: "A question, an answer and the composer.", block: <AskPanel /> },
  { title: "Activity feed", description: "Who did what, and when.", block: <ActivityFeed /> },
  // Not the Command menu: cmdk scrolls its selected item into view on mount, which
  // drags whatever page hosts the film down to it.
  { title: "Profile", description: "Name, email, avatar and bio.", block: <ProfileSettings /> },
  { title: "Notifications", description: "Grouped preferences with switches.", block: <NotificationSettings /> },
  { title: "Empty state", description: "A first step instead of a blank page.", block: <EmptyState /> },
  { title: "Stat strip", description: "Key numbers with their deltas.", block: <StatStrip /> },
  { title: "Form states", description: "Every state a field can be in.", block: <FormStates /> },
  { title: "Billing", description: "Plan, payment method and invoices.", block: <BillingSettings /> },
]

/** Blocks are laid out at this width, then scaled into the card. */
const BLOCK_W = 480

export interface CardRailProps {
  title?: string
  description?: string
  cards?: readonly RailCard[]
  flicks?: number
  every?: number
}

/** A rail of block cards flicked sideways across a plane. */
export function CardRail({
  title = "Real blocks, ready to paste.",
  description = "Sections from the Lumen kits, built from the same components.",
  cards = LUMEN_BLOCKS,
  flicks = 3,
  every = 30,
}: CardRailProps) {
  const frame = useCurrentFrame()

  const pitch = CARD_W + GAP
  // Flicks add up: each is the same curve started `every` frames after the last,
  // and one carries the rail a shade past a pitch, as snapcn measured it.
  let travelled = 0
  for (let k = 0; k < flicks; k++) travelled += pitch * OVERSHOOT * read(FLICK, (frame - k * every) / 30)
  const span = Math.ceil(REF_W / pitch) + 3
  const offset = (REF_W - CARD_W) / 2
  // The rail has a beginning: nothing before the first card, so the opening frame's left half is empty.
  const first = Math.max(0, Math.floor((travelled - offset) / pitch))
  const inner = CARD_W - 18

  return (
    <Stage
      width={REF_W}
      height={REF_H}
    >
      <Caption title={title} description={description} style={{ top: 22 }} />
      <div className="absolute inset-0" style={{ perspective: DEPTH, perspectiveOrigin: `50% ${HORIZON}px` }}>
        <div
          className="absolute inset-0"
          style={{ transform: `rotateX(${TILT}deg)`, transformOrigin: `50% ${HORIZON}px` }}
        >
          {Array.from({ length: span }, (_, n) => {
            const i = first + n
            const card = cards[i % cards.length]
            if (!card) return null
            return (
              <Card
                key={i}
                className="absolute gap-0 py-0 shadow-lg"
                style={{ left: i * pitch - travelled + offset, top: CARD_TOP, width: CARD_W, height: CARD_H }}
              >
                <div className="relative m-2 flex-1 overflow-clip rounded-2xl border border-border bg-background">
                  <div
                    className="absolute top-0 left-0"
                    style={{ width: BLOCK_W, scale: inner / BLOCK_W, transformOrigin: "0 0" }}
                  >
                    {card.block}
                  </div>
                </div>
                <CardHeader className="gap-0.5 px-4 pt-1 pb-3">
                  <CardTitle className="text-base font-normal">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </Stage>
  )
}

export default CardRail
