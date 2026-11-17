import { FileIcon, FolderIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { TreeView, type TreeItem } from "@/components/ui/TreeView"

const folder = <FolderIcon />
const file = <FileIcon />

const items: TreeItem[] = [
  {
    id: "src",
    label: "src",
    icon: folder,
    children: [
      {
        id: "components",
        label: "components",
        icon: folder,
        children: [
          { id: "button", label: "Button.tsx", icon: file },
          { id: "dialog", label: "Dialog.tsx", icon: file },
          { id: "tree-view", label: "TreeView.tsx", icon: file },
        ],
      },
      {
        id: "lib",
        label: "lib",
        icon: folder,
        children: [{ id: "utils", label: "utils.ts", icon: file }],
      },
    ],
  },
  { id: "package", label: "package.json", icon: file },
  { id: "readme", label: "README.md", icon: file, disabled: true },
]

export default function TreeViewPage() {
  return (
    <ComponentDocs
      name="Tree View"
      description="Nested list that opens and closes, for files, folders, and outlines. Follows the ARIA tree pattern with arrows, Home, End, and typeahead."
      preview={
        <div className="w-full max-w-64">
          <TreeView
            aria-label="Files"
            items={items}
            defaultExpanded={["src", "components"]}
            defaultValue="tree-view"
          />
        </div>
      }
      usage={`import { TreeView, type TreeItem } from "@/components/ui/TreeView"

const items: TreeItem[] = [
  {
    id: "src",
    label: "src",
    icon: <FolderIcon />,
    children: [{ id: "button", label: "Button.tsx", icon: <FileIcon /> }],
  },
]

<TreeView aria-label="Files" items={items} defaultExpanded={["src"]} />`}
      extraHeadings={[
        { id: "keyboard", text: "Keyboard", level: 2 },
        { id: "controlled", text: "Controlled", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="keyboard">Keyboard</h2>
            <p>
              The tree is one Tab stop. Up and Down move between visible rows,
              Right opens a branch or steps into it, Left closes it or goes to the
              parent. Home and End jump to the ends, a letter jumps to the next row
              that starts with it, Enter and Space select. In a{" "}
              <code>dir=&quot;rtl&quot;</code> tree, Left and Right swap.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="controlled">Controlled</h2>
            <p>
              Both the selection and the open branches can be controlled, for
              example to open the path to a file chosen elsewhere.
            </p>
            <CodeBlock
              code={`const [selected, setSelected] = React.useState<string | null>(null)
const [expanded, setExpanded] = React.useState<string[]>(["src"])

<TreeView
  aria-label="Files"
  items={items}
  value={selected}
  onValueChange={setSelected}
  expanded={expanded}
  onExpandedChange={setExpanded}
/>`}
            />
          </section>
        </>
      }
    />
  )
}
