import { OnboardingChecklistDemo } from "@/components/docs/AppExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function OnboardingChecklistPage() {
  return (
    <ComponentDocs
      name="Onboarding Checklist"
      description="The first steps in a product with a progress bar: one step open at a time with its action, done steps struck through, and a fold and dismiss."
      preview={<OnboardingChecklistDemo />}
      usage={`import { OnboardingChecklist } from "@/components/ui/OnboardingChecklist"

<OnboardingChecklist
  title="Set up your workspace"
  steps={[
    { id: "project", title: "Create a project", action: <Button size="sm">New project</Button> },
    { id: "invite", title: "Invite your team" },
  ]}
  completed={done}
  onCompletedChange={setDone}
/>`}
      extraHeadings={[
        { id: "progress", text: "Progress", level: 2 },
        { id: "dismiss", text: "Fold and dismiss", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="progress">Progress</h2>
            <p>
              <code>completed</code> holds the ids of done steps; save it per user. Finishing a step opens the next one. With <code>allowManualCheck={false}</code> only your app marks steps, for example when a project is really created.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="dismiss">Fold and dismiss</h2>
            <p>
              The header folds the list away. <code>onDismiss</code> adds a close button; hide the checklist and remember it in that callback. When every step is done, a line says so.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              Each circle is a toggle named “Mark … as done”, each title a button that opens its step, and the progress bar reads “2 of 5 steps done”.
            </p>
          </section>
        </>
      }
    />
  )
}
