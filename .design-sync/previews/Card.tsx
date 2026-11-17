import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "lumen-ui"

function ReleaseCard({ variant }: { variant?: "default" | "secondary" }) {
  return (
    <Card className="max-w-sm flex-1" variant={variant}>
      <CardHeader>
        <CardTitle>Release notes</CardTitle>
        <CardDescription>Paper tokens, pill buttons, Base UI for behavior.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Lumen UI 0.2</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant={variant === "secondary" ? "outline" : "default"}>
          Read
        </Button>
      </CardFooter>
    </Card>
  )
}

export const Default = () => <ReleaseCard />

export const Secondary = () => <ReleaseCard variant="secondary" />

export const Small = () => (
  <Card size="sm" className="max-w-sm">
    <CardHeader>
      <CardTitle>Storage</CardTitle>
      <CardDescription>18.4 GB of 25 GB used this month.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Resets on December 1.</p>
    </CardContent>
  </Card>
)
