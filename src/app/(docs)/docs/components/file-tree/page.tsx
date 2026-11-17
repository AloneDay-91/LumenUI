import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { FileTreeDemo } from "@/components/docs/AiExamples"

export default function FileTreePage() {
  return (
    <ComponentDocs
      name="File Tree"
      description="The files the agent changed, as a folder tree on Tree View, with A, M and D marks in the hues. Every folder starts open."
      preview={<FileTreeDemo />}
      usage={`import { FileTree } from "@/components/ui/FileTree"

<FileTree
  files={[
    {
      name: "src",
      children: [
        { name: "Trace.tsx", change: "added" },
        { name: "Reasoning.tsx", change: "modified" },
      ],
    },
  ]}
  onSelect={(path) => openDiff(path)}
/>`}
      extraHeadings={[
        { id: "keyboard", text: "Keyboard", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="keyboard">Keyboard</h2>
            <p>
              It is a Tree View, so it is one Tab stop with arrows, Home, End and typeahead. The change letters are read as words: added, modified, deleted.
            </p>
          </section>
        </>
      }
    />
  )
}
