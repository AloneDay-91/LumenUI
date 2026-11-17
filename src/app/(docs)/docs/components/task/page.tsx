import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { TaskDemo } from "@/components/docs/AiExamples"

export default function TaskPage() {
  return (
    <ComponentDocs
      name="Task"
      description="The steps the agent takes, as it takes them: the task as the label, each action under it, with the files it touched."
      preview={<TaskDemo />}
      usage={`import { Task, TaskFile, TaskItem } from "@/components/ui/Task"

<Task title="Finding where Banner is used">
  <TaskItem title="Searched for <Banner" description="4 matches in 3 files." />
  <TaskItem title="Read the files">
    <TaskFile>UpdateBanner.tsx</TaskFile>
  </TaskItem>
  <TaskItem status="running" title="Checking the props" />
</Task>`}
      extraHeadings={[
        { id: "vs-plan", text: "Task or Plan", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="vs-plan">Task or Plan</h2>
            <p>
              Plan is what the agent means to do, announced up front. Task is what it is doing, appended as it goes.
            </p>
          </section>
        </>
      }
    />
  )
}
