import { Fragment } from "react"
import { ChevronRightIcon, InboxIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/Item"

const people = [
  { initials: "IN", name: "Ink", text: "One black, then quieter greys." },
  { initials: "TY", name: "Type", text: "Inter for the UI, Fraunces as an optional heading font." },
  { initials: "PI", name: "Pills", text: "Actions are round. Cards are not." },
]

export default function ItemPage() {
  return (
    <ComponentDocs
      name="Item"
      description="A row for a title, a description, and an action. Media sits on the left. Group rows when they belong together."
      preview={
        <Item variant="outline" className="max-w-md">
          <ItemMedia variant="icon">
            <InboxIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Paper</ItemTitle>
            <ItemDescription>
              The page is the surface. The row sits on it.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Open
            </Button>
          </ItemActions>
        </Item>
      }
      usage={`import { InboxIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/Item"

<Item variant="outline">
  <ItemMedia variant="icon">
    <InboxIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Paper</ItemTitle>
    <ItemDescription>The page is the surface.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="outline" size="sm">Open</Button>
  </ItemActions>
</Item>`}
      extraHeadings={[
        { id: "variants", text: "Variants", level: 2 },
        { id: "group", text: "Group", level: 2 },
        { id: "link", text: "Link", level: 2 },
      ]}
      extra={
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 id="variants">Variants</h2>
              <p className="text-sm text-muted-foreground">
                Default is bare. Outline draws the card border. Muted fills the
                row.
              </p>
            </div>
            <Preview className="flex-col">
              <Item className="max-w-md">
                <ItemMedia variant="icon">
                  <InboxIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Default</ItemTitle>
                  <ItemDescription>No border. The paper shows through.</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant="outline" className="max-w-md">
                <ItemMedia variant="icon">
                  <InboxIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Outline</ItemTitle>
                  <ItemDescription>A card edge, nothing heavier.</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant="muted" className="max-w-md">
                <ItemMedia variant="icon">
                  <InboxIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Muted</ItemTitle>
                  <ItemDescription>A quiet fill for a secondary row.</ItemDescription>
                </ItemContent>
              </Item>
            </Preview>
            <CodeBlock
              code={`<Item variant="outline">…</Item>
<Item variant="muted" size="sm">…</Item>`}
            />
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 id="group">Group</h2>
              <p className="text-sm text-muted-foreground">
                ItemGroup stacks rows. ItemSeparator is the same line as
                Separator.
              </p>
            </div>
            <Preview>
              <ItemGroup className="max-w-sm">
                {people.map((person, index) => (
                  <Fragment key={person.name}>
                    {index > 0 ? <ItemSeparator /> : null}
                    <Item size="sm">
                      <ItemMedia>
                        <Avatar>
                          <AvatarFallback>{person.initials}</AvatarFallback>
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{person.name}</ItemTitle>
                        <ItemDescription>{person.text}</ItemDescription>
                      </ItemContent>
                    </Item>
                  </Fragment>
                ))}
              </ItemGroup>
            </Preview>
            <CodeBlock
              code={`<ItemGroup>
  <Item size="sm">
    <ItemMedia>
      <Avatar>
        <AvatarFallback>IN</AvatarFallback>
      </Avatar>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Ink</ItemTitle>
      <ItemDescription>One black, then quieter greys.</ItemDescription>
    </ItemContent>
  </Item>
  <ItemSeparator />
</ItemGroup>`}
            />
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 id="link">Link</h2>
              <p className="text-sm text-muted-foreground">
                Pass render to turn the row into a link. Hover and focus stay
                on the row.
              </p>
            </div>
            <Preview>
              <Item
                variant="outline"
                className="max-w-md"
                render={<a href="/docs/styles" />}
              >
                <ItemMedia variant="icon">
                  <InboxIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Styles</ItemTitle>
                  <ItemDescription>Tokens, type, and the paper.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon />
                </ItemActions>
              </Item>
            </Preview>
            <CodeBlock
              code={`<Item variant="outline" render={<a href="/docs/styles" />}>
  <ItemContent>
    <ItemTitle>Styles</ItemTitle>
    <ItemDescription>Tokens, type, and the paper.</ItemDescription>
  </ItemContent>
</Item>`}
            />
          </section>
        </div>
      }
    />
  )
}
