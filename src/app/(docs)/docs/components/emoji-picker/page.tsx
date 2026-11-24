import { EmojiPickerDemo } from "@/components/docs/AppExamples"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Kbd } from "@/components/ui/Kbd"

export default function EmojiPickerPage() {
  return (
    <ComponentDocs
      name="Emoji Picker"
      description="A searchable grid of emoji in categories, with skin tones and keyboard navigation. Put it in a Popover for reactions."
      preview={<EmojiPickerDemo />}
      usage={`import { EmojiPicker } from "@/components/ui/EmojiPicker"

<EmojiPicker onSelect={(emoji) => addReaction(emoji)} />`}
      extraHeadings={[
        { id: "set", text: "The set", level: 2 },
        { id: "popover", text: "In a popover", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="set">The set</h2>
            <p>
              About 300 common emoji ship in the file, with names and keywords for search, so it adds no dependency. Pass <code>categories</code> for your own set in the same shape, such as a full Unicode list or custom emoji.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="popover">In a popover</h2>
            <p>
              The preview puts it in a Popover with <code>p-0</code> and <code>autoFocus</code>, so typing searches at once.
            </p>
            <CodeBlock
              code={`<Popover>
  <PopoverTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Add a reaction" />}>
    <SmilePlusIcon />
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0">
    <EmojiPicker autoFocus onSelect={addReaction} />
  </PopoverContent>
</Popover>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              <Kbd>↓</Kbd> from the search enters the grid; arrows move by emoji and row, <Kbd>Home</Kbd> and <Kbd>End</Kbd> jump, <Kbd>Enter</Kbd> picks. <Kbd>Enter</Kbd> in the search picks the first result. Each emoji is named, and the tone is a radio group.
            </p>
          </section>
        </>
      }
    />
  )
}
