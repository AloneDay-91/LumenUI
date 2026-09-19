import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Button } from "@/components/ui/Button"

export default function ButtonPage() {
  return (
    <ComponentDocs
      name="Button"
      description="Pill button, built on @base-ui/react/button. Variants via CVA. Composition via the render prop."
      preview={<Button>Continue</Button>}
      usage={`import { Button } from "@/components/ui/Button"

export default function Example() {
  return <Button>Continue</Button>
}`}
      extraHeadings={[
        { id: "variants", text: "Variants", level: 2 },
        { id: "sizes", text: "Sizes", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="variants">Variants</h2>
            <Preview className="flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </Preview>
          </section>
          <section className="space-y-4">
            <h2 id="sizes">Sizes</h2>
            <Preview className="flex-wrap gap-3">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </Preview>
          </section>
        </>
      }
    />
  )
}
