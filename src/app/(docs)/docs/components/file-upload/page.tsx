import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { FileUploadDemo } from "@/components/docs/FileUploadExamples"
import { FileUpload } from "@/components/ui/FileUpload"

export default function FileUploadPage() {
  return (
    <ComponentDocs
      name="File Upload"
      description="Dropzone around a native file input. Click, keyboard, or drop; accept and maxSize filter the files before they reach you."
      preview={<FileUploadDemo />}
      usage={`import {
  FileUpload,
  FileUploadItem,
  FileUploadList,
} from "@/components/ui/FileUpload"

const [files, setFiles] = React.useState<File[]>([])

<FileUpload
  multiple
  accept="image/*,.pdf"
  maxSize={5 * 1024 * 1024}
  onFilesChange={(picked) => setFiles((f) => [...f, ...picked])}
  onReject={(rejections) => console.warn(rejections)}
/>
<FileUploadList>
  {files.map((file, i) => (
    <FileUploadItem key={i} file={file} onRemove={() => remove(i)} />
  ))}
</FileUploadList>`}
      extraHeadings={[
        { id: "content", text: "Custom content", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="content">Custom content</h2>
            <p>
              Children replace the default icon and copy. The whole zone stays the
              click target.
            </p>
            <div className="w-full max-w-md">
              <FileUpload accept=".csv">
                <span className="font-medium text-foreground">Import a CSV</span>
                <span>One row per contact, 2 MB at most.</span>
              </FileUpload>
            </div>
            <CodeBlock
              code={`<FileUpload accept=".csv">
  <span className="font-medium text-foreground">Import a CSV</span>
  <span>One row per contact, 2 MB at most.</span>
</FileUpload>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              The zone is a <code>label</code> wrapping a visually hidden file
              input, so Tab reaches it, Space or Enter opens the picker, and the
              focus ring draws on the zone. Dropping is a pointer extra: everything
              it does is also reachable from the keyboard. Announce rejected files
              yourself, as the demo does with <code>role=&quot;alert&quot;</code>.
            </p>
          </section>
        </>
      }
    />
  )
}
