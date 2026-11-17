import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { SubagentDemo } from "@/components/docs/AiExamples"

export default function SubagentPage() {
  return (
    <ComponentDocs
      name="Subagent"
      description="A run handed to another agent: its name, the brief it got, the tools it called as nested Tool traces, and what it returned."
      preview={<SubagentDemo />}
      usage={`import { Subagent, SubagentResult, SubagentSteps, SubagentTask } from "@/components/ui/Subagent"

<Subagent name="Docs researcher" meta="3 tools · 4.2s" status="done">
  <SubagentTask>Find every page that mentions Split Button.</SubagentTask>
  <SubagentSteps>
    <Tool name="search_docs" status="done">…</Tool>
  </SubagentSteps>
  <SubagentResult>Two pages.</SubagentResult>
</Subagent>`}
    />
  )
}
