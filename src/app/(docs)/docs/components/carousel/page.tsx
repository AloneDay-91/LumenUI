import { CarouselExamples, CarouselPreview } from "@/components/docs/CarouselExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function CarouselPage() {
  return (
    <ComponentDocs
      name="Carousel"
      description="Slides on Embla. Outline controls, ink dots, paper cards. Autoplay advances them and pauses while the pointer is over the carousel."
      preview={<CarouselPreview />}
      previewClassName="px-5 py-6"
      usage={`import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"

<Carousel autoplay>
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <div className="flex items-center justify-between">
    <CarouselPrevious />
    <CarouselDots />
    <CarouselNext />
  </div>
</Carousel>`}
      extraHeadings={[
        { id: "several", text: "Several", level: 2 },
        { id: "vertical", text: "Vertical", level: 2 },
      ]}
      extra={<CarouselExamples />}
    />
  )
}
