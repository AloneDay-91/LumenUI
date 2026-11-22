import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"

export default function AvatarPage() {
  return (
    <ComponentDocs
      name="Avatar"
      description="Profile image with initials fallback. Built on @base-ui/react/avatar."
      preview={
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>LU</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </div>
      }
      usage={`import { Avatar, AvatarFallback } from "@/components/ui/Avatar"

<Avatar>
  <AvatarFallback>LU</AvatarFallback>
</Avatar>`}
    />
  )
}
