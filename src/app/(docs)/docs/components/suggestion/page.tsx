import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { SuggestionDemo } from "@/components/docs/AiExamples"

export default function SuggestionPage() {
  return (
    <ComponentDocs
      name="Suggestion"
      description="A short prompt you can send to the agent in one click. A row of them scrolls sideways on narrow screens."
      preview={<SuggestionDemo />}
      usage={`import { Suggestion, Suggestions } from "@/components/ui/Suggestion"

<Suggestions>
  {prompts.map((prompt) => (
    <Suggestion key={prompt} suggestion={prompt} onSelect={send} />
  ))}
</Suggestions>`}
    />
  )
}
