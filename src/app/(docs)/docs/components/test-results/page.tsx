import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { TestResultsDemo } from "@/components/docs/AiExamples"

export default function TestResultsPage() {
  return (
    <ComponentDocs
      name="Test Results"
      description="A test run by the agent: counts and a bar on the row, then each suite. Suites with a failure open by default and show the error."
      preview={<TestResultsDemo />}
      usage={`import { TestResults } from "@/components/ui/TestResults"

<TestResults
  suites={[
    {
      name: "cli/test/add.test.js",
      tests: [
        { name: "copies the component", status: "passed", duration: 8 },
        { name: "keeps a file the user edited", status: "failed", error: "…" },
      ],
    },
  ]}
/>`}
    />
  )
}
