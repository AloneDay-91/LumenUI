"use client"

import * as React from "react"
import { FileIcon, FolderIcon } from "lucide-react"

import { TreeView, type TreeItem } from "@/components/ui/TreeView"
import { cn } from "@/lib/utils"

type FileChange = "added" | "modified" | "deleted"

type FileNode = {
  /** Path segment: a folder or file name. */
  name: string
  change?: FileChange
  children?: FileNode[]
}

const changeMark: Record<FileChange, { letter: string; className: string; label: string }> = {
  added: { letter: "A", className: "text-jade-ink", label: "added" },
  modified: { letter: "M", className: "text-orange-ink", label: "modified" },
  deleted: { letter: "D", className: "text-crimson-ink", label: "deleted" },
}

function toItems(nodes: FileNode[], parent = ""): TreeItem[] {
  return nodes.map((node) => {
    const path = parent ? `${parent}/${node.name}` : node.name
    const isFolder = Boolean(node.children)
    const mark = node.change ? changeMark[node.change] : null
    return {
      id: path,
      textValue: node.name,
      icon: isFolder ? <FolderIcon /> : <FileIcon />,
      label: (
        <span className="flex min-w-0 items-center gap-2">
          <span className={cn("truncate font-mono", node.change === "deleted" && "line-through opacity-60")}>
            {node.name}
          </span>
          {mark ? (
            <span className={cn("ms-auto font-mono text-[10px] font-medium", mark.className)}>
              <span aria-hidden>{mark.letter}</span>
              <span className="sr-only">, {mark.label}</span>
            </span>
          ) : null}
        </span>
      ),
      children: node.children ? toItems(node.children, path) : undefined,
    }
  })
}

function allFolders(nodes: FileNode[], parent = ""): string[] {
  return nodes.flatMap((node) => {
    const path = parent ? `${parent}/${node.name}` : node.name
    return node.children ? [path, ...allFolders(node.children, path)] : []
  })
}

/**
 * The files an agent changed, as a folder tree on Tree View, with A / M / D
 * marks in the hues. Every folder starts open; the full path is the item id.
 */
function FileTree({
  files,
  onSelect,
  className,
  "aria-label": ariaLabel = "Changed files",
}: {
  files: FileNode[]
  /** Called with the path of the picked file. */
  onSelect?: (path: string) => void
  className?: string
  "aria-label"?: string
}) {
  const items = React.useMemo(() => toItems(files), [files])
  const folders = React.useMemo(() => allFolders(files), [files])

  return (
    <TreeView
      data-slot="file-tree"
      aria-label={ariaLabel}
      items={items}
      defaultExpanded={folders}
      onValueChange={(id, item) => {
        if (!item.children) onSelect?.(id)
      }}
      className={cn("[&_[data-slot=tree-view-row]>span:last-child]:flex-1", className)}
    />
  )
}

export { FileTree }
export type { FileNode, FileChange }
