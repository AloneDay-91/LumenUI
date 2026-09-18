import { getDocsMarkdown } from "@/lib/docs-markdown"

export async function GET(
  request: Request,
  context: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await context.params
  const pathname = slug?.length ? `/docs/${slug.join("/")}` : "/docs"
  const markdown = await getDocsMarkdown(pathname, getOrigin(request))

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

function getOrigin(request: Request) {
  const url = new URL(request.url)
  const forwardedHost = request.headers.get("x-forwarded-host")
  const forwardedProto = request.headers.get("x-forwarded-proto")
  const host = forwardedHost ?? request.headers.get("host") ?? url.host
  const protocol = forwardedProto ?? url.protocol.replace(":", "")

  return `${protocol}://${host}`
}
