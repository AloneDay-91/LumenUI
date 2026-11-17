import { Card, CardContent, ScrollArea, Separator } from "lumen-ui"

const tags = Array.from({ length: 24 }, (_, i) => `v1.${24 - i}.0`)

export const InCard = () => (
  <Card size="sm" variant="secondary" className="h-32 w-56 overflow-hidden py-0">
    <ScrollArea className="h-32">
      <CardContent className="py-3">
        <p className="text-sm leading-6">
          Inter, Fraunces, JetBrains Mono. Semantic tokens, pills, warm paper.
          Copy-paste, not a library. Base UI for behavior. CVA for variants. The
          chrome stays Lumen.
        </p>
      </CardContent>
    </ScrollArea>
  </Card>
)

export const TagList = () => (
  <Card size="sm" className="w-48 overflow-hidden py-0">
    <ScrollArea style={{ height: 200 }}>
      <div className="p-4">
        <p className="mb-3 text-sm font-medium">Releases</p>
        {tags.map((tag, i) => (
          <div key={tag}>
            {i > 0 ? <Separator className="my-2" /> : null}
            <p className="text-sm text-muted-foreground">{tag}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  </Card>
)
