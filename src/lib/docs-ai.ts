import { SITE_NAME } from "@/lib/site"

export function getDocsMarkdownPath(pathname: string) {
  return `${pathname}.md`
}

export function getInstallPrompt(markdownUrl: string) {
  return `I'm looking at this ${SITE_NAME} documentation: ${markdownUrl}

Install this into my project. Follow the markdown exactly: copy the listed files, add the required npm dependencies, reuse existing tokens/utilities (cn, CSS variables), and show a working usage example.`
}

export function getPromptUrl(chatUrl: string, markdownUrl: string) {
  const url = new URL(chatUrl)
  url.searchParams.set("q", getInstallPrompt(markdownUrl))
  return url.toString()
}

export const docsAiProviders = [
  {
    id: "claude",
    label: "Ouvrir dans Claude",
    chatUrl: "https://claude.ai/new",
  },
  {
    id: "v0",
    label: "Ouvrir dans v0",
    chatUrl: "https://v0.dev/chat",
  },
  {
    id: "chatgpt",
    label: "Ouvrir dans ChatGPT",
    chatUrl: "https://chatgpt.com/?hints=search",
  },
] as const
