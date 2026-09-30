import { getLlmsFull, getRequestOrigin } from "@/lib/llms"

export async function GET(request: Request) {
  const body = await getLlmsFull(getRequestOrigin(request))

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'inline; filename="llms-full.txt"',
      "Cache-Control": "public, max-age=300",
    },
  })
}
