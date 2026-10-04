import { ChevronRightIcon, FileTextIcon } from "lucide-react"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/Item"

const files = [
  {
    href: "/llms.txt",
    title: "/llms.txt",
    description: "One line per page, with a link to its Markdown.",
  },
  {
    href: "/llms-full.txt",
    title: "/llms-full.txt",
    description: "Every page, usage, API, and source, in one file.",
  },
]

export default function LlmsPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "llms", text: "LLMs", level: 1 },
          { id: "files", text: "Files", level: 2 },
          { id: "markdown", text: "Markdown", level: 2 },
          { id: "prompt", text: "Prompt", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          title="LLMs"
          description="Plain text for agents. An index of every page, or the full docs, usage, API, and source in one file."
        />

        <Alert>
          <AlertTitle>Point the agent at a file</AlertTitle>
          <AlertDescription>
            Use <code>/llms.txt</code> for the map. Use <code>/llms-full.txt</code>{" "}
            when it should install a component without opening the site.
          </AlertDescription>
        </Alert>

        <section className="space-y-4">
          <h2 id="files">Files</h2>
          <p>
            Both files are <code>text/plain</code> at the site root. They are
            built from the docs, so a new page shows up without a second source
            of truth.
          </p>
          <ItemGroup className="max-w-xl gap-3">
            {files.map((file) => (
              <Item
                key={file.href}
                variant="outline"
                render={<a href={file.href} />}
              >
                <ItemMedia variant="icon">
                  <FileTextIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{file.title}</ItemTitle>
                  <ItemDescription>{file.description}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon />
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </section>

        <section className="space-y-4">
          <h2 id="markdown">Markdown</h2>
          <p>
            Append <code>.md</code> to any <code>/docs</code> URL. The response
            is the page an agent reads from the index: description, usage, API,
            and source.
          </p>
          <CodeBlock
            language="text"
            code={`/docs/components/button.md
/docs/installation.md
/docs/styles.md`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="prompt">Prompt</h2>
          <p>
            Give the agent the Markdown URL and ask it to copy the files. Product
            copy stays English. The visual language is paper, pills, and Inter,
            with no interactive blue. Compose with existing components. Prefer <code>render</code> on
            Base UI triggers, and <code>cn()</code> for classes.
          </p>
          <CodeBlock
            language="text"
            code={`Read /llms.txt, then install Button from /docs/components/button.md.

Copy the listed source, add the npm dependencies, and reuse cn() and the CSS tokens.`}
          />
        </section>
      </div>
    </>
  )
}
