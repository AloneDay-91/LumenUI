"use client"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { Preview } from "@/components/docs/Preview"
import { Card } from "@/components/ui/Card"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"

const sheets = [
  { index: "01", title: "Paper", text: "The page is the surface." },
  { index: "02", title: "Ink", text: "One black, then quieter greys." },
  { index: "03", title: "Type", text: "Inter for the UI, Fraunces for the wordmark." },
  { index: "04", title: "Pills", text: "Actions are round. Cards are not." },
]

function Slide({
  index,
  title,
  text,
}: {
  index: string
  title: string
  text: string
}) {
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

export function CarouselPreview() {
  return (
    <Carousel autoplay className="mx-auto max-w-sm">
      <CarouselContent>
        {sheets.map((sheet) => (
          <CarouselItem key={sheet.index}>
            <Slide {...sheet} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between">
        <CarouselPrevious />
        <CarouselDots />
        <CarouselNext />
      </div>
    </Carousel>
  )
}

export function CarouselExamples() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 id="several">Several</h2>
          <p className="text-sm text-muted-foreground">
            A slide is full width until you change its basis. The gap is the
            page, not a colored gutter.
          </p>
        </div>
        <Preview className="px-5 py-6">
          <Carousel opts={{ align: "start" }} className="mx-auto max-w-lg">
            <CarouselContent>
              {sheets.map((sheet) => (
                <CarouselItem key={sheet.index} className="basis-4/5 sm:basis-1/2">
                  <Slide {...sheet} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-between">
              <CarouselPrevious />
              <CarouselDots />
              <CarouselNext />
            </div>
          </Carousel>
        </Preview>
        <CodeBlock
          code={`<Carousel opts={{ align: "start" }}>
  <CarouselContent>
    {sheets.map((sheet) => (
      <CarouselItem key={sheet.index} className="basis-1/2">
        …
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>`}
        />
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 id="vertical">Vertical</h2>
          <p className="text-sm text-muted-foreground">
            Set a height on the content. The chevrons follow the axis.
          </p>
        </div>
        <Preview className="px-5 py-6">
          <Carousel orientation="vertical" className="mx-auto max-w-sm">
            <CarouselContent className="h-44">
              {sheets.map((sheet) => (
                <CarouselItem key={sheet.index}>
                  <Slide {...sheet} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-between">
              <CarouselPrevious />
              <CarouselDots />
              <CarouselNext />
            </div>
          </Carousel>
        </Preview>
        <CodeBlock
          code={`<Carousel orientation="vertical">
  <CarouselContent className="h-44">
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        />
      </section>
    </div>
  )
}
