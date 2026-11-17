import * as React from "react"
import { ClipboardIcon, CopyIcon, PencilIcon, TrashIcon } from "lucide-react"
import {
  Card,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "lumen-ui"

// Opens the menu at a point inside the trigger, as a real right-click would.
function useOpenAtPoint(ref: React.RefObject<HTMLDivElement | null>) {
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const id = window.setTimeout(() => {
      const r = el.getBoundingClientRect()
      el.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          button: 2,
          clientX: r.left + r.width * 0.55,
          clientY: r.top + r.height * 0.45,
        })
      )
    }, 50)
    return () => window.clearTimeout(id)
  }, [ref])
}

export const Open = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  useOpenAtPoint(ref)
  return (
    <ContextMenu>
      <ContextMenuTrigger
        ref={ref}
        render={
          <Card
            size="sm"
            variant="secondary"
            className="flex h-28 w-56 cursor-context-menu items-center justify-center text-sm text-muted-foreground"
          />
        }
      >
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <CopyIcon />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>
          <ClipboardIcon />
          Paste
        </ContextMenuItem>
        <ContextMenuItem>
          <PencilIcon />
          Rename
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem defaultChecked>Show hidden files</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <TrashIcon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const Trigger = () => (
  <ContextMenu>
    <ContextMenuTrigger
      render={
        <Card
          size="sm"
          variant="secondary"
          className="flex h-28 w-56 cursor-context-menu items-center justify-center text-sm text-muted-foreground"
        />
      }
    >
      Right-click here
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Paste</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
)
