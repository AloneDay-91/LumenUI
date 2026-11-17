import { AspectRatio } from "lumen-ui"

const LOGO_PATH =
  "M1 2L0 2L0 3L0 4L0 5L0 6L0 7L1 7L1 8L2 8L2 9L3 9L4 9L5 9L6 9L7 9L7 8L8 8L8 7L9 7L9 6L8 6L8 5L7 5L7 4L6 4L6 3L5 3L5 2L4 2L4 1L3 1L3 0L2 0L2 1L1 1L1 2ZM4 1L5 1L5 0L4 0L4 1ZM6 0L6 1L7 1L7 0L6 0ZM8 2L8 1L7 1L7 2L8 2ZM5 1L5 2L6 2L6 1L5 1ZM7 3L7 2L6 2L6 3L7 3ZM9 3L9 2L8 2L8 3L9 3ZM7 4L8 4L8 3L7 3L7 4ZM8 5L9 5L9 4L8 4L8 5Z"

function Frame({ ratio, label }: { ratio: number; label: string }) {
  return (
    <AspectRatio ratio={ratio} className="rounded-2xl bg-foreground text-background">
      <div className="relative size-full">
        <svg
          viewBox="0 0 9 9"
          fill="none"
          shapeRendering="crispEdges"
          aria-hidden="true"
          className="absolute -right-5 -bottom-7 size-[80%] text-background/15"
        >
          <path fill="currentColor" fillRule="evenodd" d={LOGO_PATH} />
        </svg>
        <p className="absolute bottom-3 left-3 font-mono text-[11px] tracking-wide">
          {label}
        </p>
      </div>
    </AspectRatio>
  )
}

export const Widescreen = () => (
  <div className="w-full max-w-sm">
    <Frame ratio={16 / 9} label="16 / 9" />
  </div>
)

export const Ratios = () => (
  <div className="flex items-end gap-8">
    <div className="w-28">
      <Frame ratio={1} label="1 / 1" />
    </div>
    <div className="w-36">
      <Frame ratio={4 / 3} label="4 / 3" />
    </div>
    <div className="w-48">
      <Frame ratio={16 / 9} label="16 / 9" />
    </div>
  </div>
)

export const WithImage = () => (
  <div className="w-full max-w-sm">
    <AspectRatio ratio={4 / 3} className="rounded-2xl bg-muted">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        alt="Mountain range at sunrise"
      />
    </AspectRatio>
  </div>
)
