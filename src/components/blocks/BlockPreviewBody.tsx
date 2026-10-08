"use client"

import { useEffect } from "react"

import { lumenBlocks } from "@/components/blocks/lumen-blocks"

export function BlockPreviewSizer() {
  useEffect(() => {
    const root = document.querySelector(".root")
    const nodes = [document.documentElement, document.body, root].filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    )
    for (const node of nodes) node.style.minHeight = "0"

    const post = () => {
      const height = document.documentElement.scrollHeight
      window.parent.postMessage({ type: "lumen-block-height", height }, window.location.origin)
    }

    post()
    const observer = new ResizeObserver(post)
    observer.observe(document.body)
    window.addEventListener("load", post)
    return () => {
      observer.disconnect()
      window.removeEventListener("load", post)
    }
  }, [])

  return null
}

export function BlockPreviewBody({ id }: { id: string }) {
  const block = lumenBlocks.find((item) => item.id === id)
  if (!block) return null

  return (
    <>
      <BlockPreviewSizer />
      {block.preview}
    </>
  )
}
