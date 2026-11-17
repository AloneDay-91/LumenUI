import { Fragment } from "react"
import { ChevronRightIcon, InboxIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "lumen-ui"

const people = [
  { initials: "IN", name: "Ink", text: "One black, then quieter greys." },
  { initials: "TY", name: "Type", text: "Inter for the UI, Fraunces as an optional heading font." },
  { initials: "PI", name: "Pills", text: "Actions are round. Cards are not." },
]

export const Default = () => (
  <Item variant="outline" className="max-w-md">
    <ItemMedia variant="icon">
      <InboxIcon />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Paper</ItemTitle>
      <ItemDescription>The page is the surface. The row sits on it.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="outline" size="sm">
        Open
      </Button>
    </ItemActions>
  </Item>
)

export const Variants = () => (
  <div className="flex w-full max-w-md flex-col gap-3">
    <Item>
      <ItemMedia variant="icon">
        <InboxIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Default</ItemTitle>
        <ItemDescription>No border. The paper shows through.</ItemDescription>
      </ItemContent>
    </Item>
    <Item variant="outline">
      <ItemMedia variant="icon">
        <InboxIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Outline</ItemTitle>
        <ItemDescription>A card edge, nothing heavier.</ItemDescription>
      </ItemContent>
    </Item>
    <Item variant="muted">
      <ItemMedia variant="icon">
        <InboxIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Muted</ItemTitle>
        <ItemDescription>A quiet fill for a secondary row.</ItemDescription>
      </ItemContent>
    </Item>
  </div>
)

export const Group = () => (
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
)

export const AsLink = () => (
  <Item variant="outline" className="max-w-md" render={<a href="#styles" />}>
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
)
