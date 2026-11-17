import { MailIcon, SearchIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "lumen-ui"

export const Default = () => (
  <div className="w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search a component…" />
    </InputGroup>
  </div>
)

export const Suffix = () => (
  <div className="w-full max-w-sm">
    <InputGroup>
      <InputGroupInput placeholder="0.625" />
      <InputGroupAddon align="end">
        <InputGroupText>rem</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
)

export const Domain = () => (
  <div className="w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput defaultValue="ui.lumen.dev" />
    </InputGroup>
  </div>
)

export const BothSides = () => (
  <div className="w-full max-w-sm">
    <InputGroup>
      <InputGroupAddon>
        <MailIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="team" />
      <InputGroupAddon align="end">
        <InputGroupText>@lumen.dev</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  </div>
)
