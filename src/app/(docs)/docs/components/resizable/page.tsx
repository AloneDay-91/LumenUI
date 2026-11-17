import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"

function Pane({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full items-center justify-center p-4 text-xs text-muted-foreground">
      {children}
    </div>
  )
}

export default function ResizablePage() {
  return (
    <ComponentDocs
      name="Resizable"
      description="Panels split by handles you drag or move with the arrow keys. Sizes are percentages with a minimum and maximum per panel."
      preview={
        <div className="h-48 w-full max-w-lg overflow-hidden rounded-2xl ring-1 ring-foreground/10">
          <ResizablePanelGroup>
            <ResizablePanel defaultSize={30} minSize={20}>
              <Pane>Sidebar</Pane>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              <Pane>Editor</Pane>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      }
      usage={`import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"

<ResizablePanelGroup>
  <ResizablePanel defaultSize={30} minSize={20}>Sidebar</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel>Editor</ResizablePanel>
</ResizablePanelGroup>`}
      extraHeadings={[
        { id: "vertical", text: "Vertical and nested", level: 2 },
        { id: "keyboard", text: "Keyboard", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="vertical">Vertical and nested</h2>
            <p>
              <code>direction=&quot;vertical&quot;</code> stacks the panels. A
              group inside a panel splits it again. Panels without{" "}
              <code>defaultSize</code> share what the others leave.
            </p>
            <div className="h-64 w-full max-w-lg overflow-hidden rounded-2xl ring-1 ring-foreground/10">
              <ResizablePanelGroup>
                <ResizablePanel defaultSize={35}>
                  <Pane>Files</Pane>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={65}>
                      <Pane>Editor</Pane>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel minSize={15}>
                      <Pane>Terminal</Pane>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
            <CodeBlock
              code={`<ResizablePanelGroup>
  <ResizablePanel defaultSize={35}>Files</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={65}>Editor</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={15}>Terminal</ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="keyboard">Keyboard</h2>
            <p>
              Each handle is a focusable <code>separator</code> with{" "}
              <code>aria-valuenow</code>. Arrows move it by 2%, Shift by 10%, Home
              and End push it to the limits. Save the layout with{" "}
              <code>onLayout</code>.
            </p>
          </section>
        </>
      }
    />
  )
}
