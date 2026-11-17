import { InfoIcon, TriangleAlertIcon } from "lucide-react"
import { Callout, CalloutIcon, CalloutText } from "lumen-ui"

const notice = "You will need admin privileges to install and access this application."

export const Default = () => (
  <Callout className="max-w-md">
    <CalloutIcon>
      <InfoIcon />
    </CalloutIcon>
    <CalloutText>{notice}</CalloutText>
  </Callout>
)

export const Variant = () => (
  <div className="flex max-w-md flex-col gap-3">
    {(["soft", "surface", "outline"] as const).map((variant) => (
      <Callout key={variant} variant={variant}>
        <CalloutIcon>
          <InfoIcon />
        </CalloutIcon>
        <CalloutText>{notice}</CalloutText>
      </Callout>
    ))}
  </div>
)

export const Color = () => (
  <div className="flex max-w-md flex-col gap-3">
    <Callout color="indigo">
      <CalloutIcon>
        <InfoIcon />
      </CalloutIcon>
      <CalloutText>{notice}</CalloutText>
    </Callout>
    <Callout color="jade">
      <CalloutIcon>
        <InfoIcon />
      </CalloutIcon>
      <CalloutText>Your workspace is ready. Invite the rest of the team.</CalloutText>
    </Callout>
    <Callout color="crimson" role="alert">
      <CalloutIcon>
        <TriangleAlertIcon />
      </CalloutIcon>
      <CalloutText>Access denied. Ask an admin to open this page.</CalloutText>
    </Callout>
    <Callout color="indigo" highContrast>
      <CalloutIcon>
        <InfoIcon />
      </CalloutIcon>
      <CalloutText>{notice}</CalloutText>
    </Callout>
  </div>
)

export const Size = () => (
  <div className="flex max-w-md flex-col gap-3">
    <Callout size="sm">
      <CalloutIcon>
        <InfoIcon />
      </CalloutIcon>
      <CalloutText>{notice}</CalloutText>
    </Callout>
    <Callout size="lg">
      <CalloutIcon>
        <InfoIcon />
      </CalloutIcon>
      <CalloutText>{notice}</CalloutText>
    </Callout>
  </div>
)
