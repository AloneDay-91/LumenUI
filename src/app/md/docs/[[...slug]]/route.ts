import { getDocsMarkdown } from "@/lib/docs-markdown"
import { getRequestOrigin } from "@/lib/llms"

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await context.params
  const pathname = slug?.length ? `/docs/${slug.join("/")}` : "/docs"
  const markdown = await getDocsMarkdown(pathname, getRequestOrigin())

  if (!markdown) {
    return new Response("Not found", { status: 404 })
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `inline; filename="${(slug?.at(-1) ?? "docs")}.md"`,
      "Cache-Control": "public, max-age=60",
    },
  })
}
