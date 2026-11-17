import { CopyIcon } from "lucide-react"
import { Badge, Button, DataList, DataListItem, DataListLabel, DataListValue } from "lumen-ui"

const linkClassName =
  "underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"

const labelColors = ["indigo", "cyan", "orange", "crimson"] as const

export const Record = () => (
  <DataList className="w-full max-w-md">
    <DataListItem align="center">
      <DataListLabel minWidth="5.5rem">Status</DataListLabel>
      <DataListValue>
        <Badge color="jade">Authorized</Badge>
      </DataListValue>
    </DataListItem>
    <DataListItem align="center">
      <DataListLabel minWidth="5.5rem">ID</DataListLabel>
      <DataListValue>
        <span className="font-mono text-xs">u_2J89JSA4GJ</span>
        <Button variant="ghost" size="icon-xs" aria-label="Copy value">
          <CopyIcon />
        </Button>
      </DataListValue>
    </DataListItem>
    <DataListItem>
      <DataListLabel minWidth="5.5rem">Name</DataListLabel>
      <DataListValue>Ada Lovelace</DataListValue>
    </DataListItem>
    <DataListItem>
      <DataListLabel minWidth="5.5rem">Email</DataListLabel>
      <DataListValue>
        <a href="mailto:ada@lumen.studio" className={linkClassName}>
          ada@lumen.studio
        </a>
      </DataListValue>
    </DataListItem>
    <DataListItem>
      <DataListLabel minWidth="5.5rem">Company</DataListLabel>
      <DataListValue>
        <a href="https://github.com/AloneDay-91/LumenUI" className={linkClassName}>
          Lumen
        </a>
      </DataListValue>
    </DataListItem>
  </DataList>
)

export const Vertical = () => (
  <DataList orientation="vertical" className="w-full max-w-sm">
    <DataListItem>
      <DataListLabel>Name</DataListLabel>
      <DataListValue>Ada Lovelace</DataListValue>
    </DataListItem>
    <DataListItem>
      <DataListLabel>Email</DataListLabel>
      <DataListValue>
        <a href="mailto:ada@lumen.studio" className={linkClassName}>
          ada@lumen.studio
        </a>
      </DataListValue>
    </DataListItem>
    <DataListItem>
      <DataListLabel>Company</DataListLabel>
      <DataListValue>Lumen</DataListValue>
    </DataListItem>
  </DataList>
)

export const Sizes = () => (
  <div className="flex flex-wrap gap-10">
    {(["sm", "lg"] as const).map((size) => (
      <DataList key={size} size={size} className="w-full max-w-xs">
        <DataListItem>
          <DataListLabel>Name</DataListLabel>
          <DataListValue>Ada Lovelace</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Company</DataListLabel>
          <DataListValue>Lumen</DataListValue>
        </DataListItem>
      </DataList>
    ))}
  </div>
)

export const Colors = () => (
  <div className="flex flex-wrap gap-12">
    {[false, true].map((highContrast) => (
      <DataList key={String(highContrast)} orientation="vertical" className="w-full max-w-xs">
        {labelColors.map((color) => (
          <DataListItem key={color}>
            <DataListLabel color={color} highContrast={highContrast}>
              Name
            </DataListLabel>
            <DataListValue className="capitalize">{color}</DataListValue>
          </DataListItem>
        ))}
      </DataList>
    ))}
  </div>
)
