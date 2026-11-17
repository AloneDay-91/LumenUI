import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ModelSelectorDemo } from "@/components/docs/AiExamples"

export default function ModelSelectorPage() {
  return (
    <ComponentDocs
      name="Model Selector"
      description="Two small menus for the composer toolbar: one picks the model the agent runs, the other picks how hard it thinks."
      preview={<ModelSelectorDemo />}
      usage={`import { ModelSelector } from "@/components/ui/ModelSelector"

<ModelSelector
  models={[
    { value: "lumen-large", label: "Lumen Large", description: "Thinks before it replies." },
    { value: "lumen-small", label: "Lumen Small" },
  ]}
  model={model}
  onModelChange={setModel}
  effort={effort}
  onEffortChange={setEffort}
  showEffort={model === "lumen-large"}
/>`}
      extraHeadings={[
        { id: "effort", text: "Effort", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="effort">Effort</h2>
            <p>
              The effort menu shows only with <code>effort</code> and <code>onEffortChange</code>, and hides with <code>showEffort</code> for models that do not reason. Pass <code>efforts</code> for other levels.
            </p>
          </section>
        </>
      }
    />
  )
}
