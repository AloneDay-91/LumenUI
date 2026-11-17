import { CircleAlertIcon, InfoIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "lumen-ui"

export const Default = () => (
  <Alert className="max-w-md">
    <AlertTitle>Deploy complete</AlertTitle>
    <AlertDescription>
      The preview is live. Dark tokens follow the .dark class.
    </AlertDescription>
  </Alert>
)

export const Variants = () => (
  <div className="flex max-w-md flex-col gap-3">
    <Alert variant="info">
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>Components live in your repo.</AlertDescription>
    </Alert>
    <Alert variant="success">
      <AlertTitle>Deploy complete</AlertTitle>
      <AlertDescription>The preview is live.</AlertDescription>
    </Alert>
    <Alert variant="warning">
      <AlertTitle>Review the diff</AlertTitle>
      <AlertDescription>Two tokens changed since the last publish.</AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <AlertTitle>Save failed</AlertTitle>
      <AlertDescription>The server did not respond.</AlertDescription>
    </Alert>
  </div>
)

export const WithIcon = () => (
  <div className="flex max-w-md flex-col gap-3">
    <Alert variant="info">
      <InfoIcon />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        Tokens are plain CSS variables. Override them in your globals.css.
      </AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <CircleAlertIcon />
      <AlertTitle>Payment declined</AlertTitle>
      <AlertDescription>Check the card details and try again.</AlertDescription>
    </Alert>
  </div>
)
