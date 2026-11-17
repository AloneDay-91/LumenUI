import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { AttachmentDemo } from "@/components/docs/AiExamples"

export default function AttachmentPage() {
  return (
    <ComponentDocs
      name="Attachment"
      description="A file on its way into a message: a thumbnail for images, an icon for the rest, the name, the size, and a remove button."
      preview={<AttachmentDemo />}
      usage={`import { Attachment, AttachmentList } from "@/components/ui/Attachment"

<AttachmentList>
  {files.map((file) => (
    <Attachment
      key={file.name}
      name={file.name}
      type={file.type}
      size={file.size}
      previewUrl={URL.createObjectURL(file)}
      onRemove={() => remove(file)}
    />
  ))}
</AttachmentList>`}
      extraHeadings={[
        { id: "prompt", text: "In a Prompt Input", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="prompt">In a Prompt Input</h2>
            <p>
              Put the list above the textarea. Revoke object URLs with <code>URL.revokeObjectURL</code> when a file is removed or sent.
            </p>
          </section>
        </>
      }
    />
  )
}
