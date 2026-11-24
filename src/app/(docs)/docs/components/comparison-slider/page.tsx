import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ComparisonSliderDemo } from "@/components/docs/MediaExamples"
import { Kbd } from "@/components/ui/Kbd"

export default function ComparisonSliderPage() {
  return (
    <ComponentDocs
      name="Comparison Slider"
      description="Two layers stacked with a handle that wipes between them: before and after, light and dark, old and new."
      preview={<ComparisonSliderDemo />}
      usage={`import { ComparisonSlider } from "@/components/ui/ComparisonSlider"

<ComparisonSlider
  className="aspect-video"
  beforeLabel="Before"
  afterLabel="After"
  before={<img src="/shots/before.jpg" alt="The old dashboard" />}
  after={<img src="/shots/after.jpg" alt="The new dashboard" />}
/>`}
      extraHeadings={[
        { id: "layers", text: "Layers", level: 2 },
        { id: "controlled", text: "Controlled", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="layers">Layers</h2>
            <p>
              <code>before</code> and <code>after</code> take any node: images, videos, or live components. Images and videos inside are made to cover the frame. Give the frame its shape with <code>className</code>, such as <code>aspect-video</code>; without one it takes the height of <code>after</code>.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="controlled">Controlled</h2>
            <p>
              <code>value</code> and <code>onValueChange</code> hold the position, from 0 to 100, for example to animate it or to keep two sliders in step.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The handle is a slider named “Comparison position” that reads as a percentage. <Kbd>←</Kbd> and <Kbd>→</Kbd> move it, <Kbd>Home</Kbd> and <Kbd>End</Kbd> go to the edges. The labels are decoration; describe each layer in its own <code>alt</code>.
            </p>
          </section>
        </>
      }
    />
  )
}
