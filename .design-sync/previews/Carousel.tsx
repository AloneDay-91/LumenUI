import {
  Card,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "lumen-ui"

const sheets = [
  { index: "01", title: "Paper", text: "The page is the surface." },
  { index: "02", title: "Ink", text: "One black, then quieter greys." },
  { index: "03", title: "Type", text: "Inter for the UI, Fraunces as an optional heading font." },
  { index: "04", title: "Pills", text: "Actions are round. Cards are not." },
]

function Slide({ index, title, text }: { index: string; title: string; text: string }) {
  return (
    <Card className="h-full min-h-40 justify-between gap-0 px-5">
      <span className="font-mono text-xs text-muted-foreground">{index}</span>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{text}</p>
      </div>
    </Card>
  )
}

function Controls() {
  return (
    <div className="flex items-center justify-between">
      <CarouselPrevious />
      <CarouselDots />
      <CarouselNext />
    </div>
  )
}

export const Single = () => (
  <div className="w-full px-5 py-6">
    <Carousel className="mx-auto max-w-sm">
      <CarouselContent>
        {sheets.map((s) => (
          <CarouselItem key={s.index}>
            <Slide {...s} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <Controls />
    </Carousel>
  </div>
)

export const Several = () => (
  <div className="w-full px-5 py-6">
    <Carousel opts={{ align: "start" }} className="mx-auto max-w-lg">
      <CarouselContent>
        {sheets.map((s) => (
          <CarouselItem key={s.index} className="basis-4/5 sm:basis-1/2">
            <Slide {...s} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <Controls />
    </Carousel>
  </div>
)

export const Vertical = () => (
  <div className="w-full px-5 py-6">
    <Carousel orientation="vertical" className="mx-auto max-w-sm">
      <CarouselContent className="h-44">
        {sheets.map((s) => (
          <CarouselItem key={s.index}>
            <Slide {...s} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <Controls />
    </Carousel>
  </div>
)
