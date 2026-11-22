import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/AvatarGroup"

export default function AvatarGroupPage() {
  return (
    <ComponentDocs
      name="Avatar Group"
      description="Overlapping row of avatars with a count for the rest. Each avatar is ringed in the page background."
      preview={
        <AvatarGroup aria-label="Reviewers">
          <Avatar>
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>LU</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <AvatarGroupCount count={4} />
        </AvatarGroup>
      }
      usage={`import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/AvatarGroup"

<AvatarGroup aria-label="Reviewers">
  <Avatar>
    <AvatarFallback>AM</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>LU</AvatarFallback>
  </Avatar>
  <AvatarGroupCount count={4} />
</AvatarGroup>`}
      extraHeadings={[{ id: "sizes", text: "Sizes", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="sizes">Sizes</h2>
          <p>
            Size the avatars and the count together with <code>size-*</code>. The
            initials scale with the container.
          </p>
          <AvatarGroup className="-space-x-3">
            <Avatar className="size-10">
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <Avatar className="size-10">
              <AvatarFallback>LU</AvatarFallback>
            </Avatar>
            <AvatarGroupCount count={12} className="size-10 text-xs" />
          </AvatarGroup>
          <CodeBlock
            code={`<AvatarGroup className="-space-x-3">
  <Avatar className="size-10">…</Avatar>
  <AvatarGroupCount count={12} className="size-10 text-xs" />
</AvatarGroup>`}
          />
        </section>
      }
    />
  )
}
