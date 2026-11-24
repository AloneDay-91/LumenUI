import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { DiffViewerDemo } from "@/components/docs/WorkflowExamples"

export default function DiffViewerPage() {
  return (
    <ComponentDocs
      name="Diff Viewer"
      description="Two versions of a text compared line by line, unified or side by side, with the changed part of each line marked."
      preview={<DiffViewerDemo />}
      usage={`import { DiffViewer } from "@/components/ui/DiffViewer"

<DiffViewer title="Button.tsx" oldValue={before} newValue={after} />`}
      extraHeadings={[
        { id: "layout", text: "Layout", level: 2 },
        { id: "limits", text: "Limits", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="layout">Layout</h2>
            <p>
              <code>view="unified"</code> stacks removed and added lines; <code>view="split"</code> puts them side by side. Runs of unchanged lines longer than <code>context</code> on each side of a change fold behind a button. Pass <code>context={Infinity}</code> to show the whole file.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="limits">Limits</h2>
            <p>
              The diff is computed in the browser, line by line, after trimming the shared start and end. It is meant for files of a few thousand lines. For bigger ones, or a patch from Git, compute the lines on the server and pass the two texts.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              Colour and the +/− signs are not announced, so each changed line starts with a hidden “Added:” or “Removed:”. Translate them with <code>labels</code>. The body is a focusable region that scrolls with the keyboard.
            </p>
          </section>
        </>
      }
    />
  )
}
