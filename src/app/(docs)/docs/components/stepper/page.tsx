import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@/components/ui/Stepper"

function InstallSteps({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <Stepper orientation={orientation}>
      <StepperItem status="complete">
        <StepperIndicator>1</StepperIndicator>
        <StepperContent>
          <StepperTitle>Tokens</StepperTitle>
          <StepperDescription>Copy globals.css</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem status="current">
        <StepperIndicator>2</StepperIndicator>
        <StepperContent>
          <StepperTitle>Button</StepperTitle>
          <StepperDescription>First component</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem status="upcoming">
        <StepperIndicator>3</StepperIndicator>
        <StepperContent>
          <StepperTitle>Ship</StepperTitle>
          <StepperDescription>The rest on demand</StepperDescription>
        </StepperContent>
      </StepperItem>
    </Stepper>
  )
}

export default function StepperPage() {
  return (
    <ComponentDocs
      name="Stepper"
      description="A sequence of steps. The rail is drawn between them — complete, current, upcoming."
      preview={
        <div className="w-full max-w-lg">
          <InstallSteps />
        </div>
      }
      usage={`import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@/components/ui/Stepper"

<Stepper>
  <StepperItem status="complete">
    <StepperIndicator>1</StepperIndicator>
    <StepperContent>
      <StepperTitle>Tokens</StepperTitle>
    </StepperContent>
  </StepperItem>
  <StepperItem status="current">
    <StepperIndicator>2</StepperIndicator>
    <StepperContent>
      <StepperTitle>Button</StepperTitle>
    </StepperContent>
  </StepperItem>
</Stepper>`}
      extraHeadings={[{ id: "vertical", text: "Vertical", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="vertical">Vertical</h2>
          <p>
            <code>orientation=&quot;vertical&quot;</code> stacks the steps. The
            current item carries <code>aria-current=&quot;step&quot;</code>.
          </p>
          <Preview>
            <div className="w-full max-w-md">
              <InstallSteps orientation="vertical" />
            </div>
          </Preview>
          <CodeBlock
            code={`<Stepper orientation="vertical">
  <StepperItem status="current">
    <StepperIndicator>2</StepperIndicator>
    <StepperContent>
      <StepperTitle>Button</StepperTitle>
    </StepperContent>
  </StepperItem>
</Stepper>`}
          />
        </section>
      }
    />
  )
}
