import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Typography } from "@/components/ui/Typography"

function Sample() {
  return (
    <>
      <h2>Paper</h2>
      <p>
        The page is the surface. Body copy stays grey.{" "}
        <a href="/docs/styles">Styles</a> holds the tokens.
      </p>
    </>
  )
}

export function TypographyPreview() {
  return (
    <Typography>
      <h2>Paper</h2>
      <p>
        The page is the surface. Type sits on it in Inter, with a quiet grey
        for the body and ink for the headings.
      </p>
      <ul>
        <li>Headings stay in the foreground.</li>
        <li>
          Links are ink, not blue. Code uses <code>JetBrains Mono</code>.
        </li>
      </ul>
    </Typography>
  )
}

export function TypographyRhythm() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-xs text-foreground">article</p>
        <Typography>
          <Sample />
        </Typography>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-mono text-xs text-foreground">compact</p>
        <Typography variant="compact">
          <Sample />
        </Typography>
      </div>
    </div>
  )
}

export function TypographyElements() {
  return (
    <Typography>
      <h1>Paper</h1>
      <p>
        The page is the surface. <strong>Ink</strong> marks the emphasis.{" "}
        <a href="/docs/styles">Styles</a> holds the tokens, and <code>cn()</code>{" "}
        merges the classes.
      </p>
      <h2>Lists</h2>
      <ul>
        <li>Headings stay in the foreground.</li>
        <li>Links are ink, not blue.</li>
      </ul>
      <ol>
        <li>Copy the component.</li>
        <li>Wrap the rendered HTML.</li>
      </ol>
      <blockquote>
        <p>Actions are round. Cards are not.</p>
      </blockquote>
      <pre>
        <code>npm install</code>
      </pre>
      <table>
        <thead>
          <tr>
            <th>Face</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inter</td>
            <td>UI and body</td>
          </tr>
          <tr>
            <td>JetBrains Mono</td>
            <td>Code and labels</td>
          </tr>
        </tbody>
      </table>
    </Typography>
  )
}

export function TypographyOptOut() {
  return (
    <Typography>
      <h3>Article heading</h3>
      <p>This block follows the rhythm. The card below does not.</p>
      <Card size="sm" className="not-typography">
        <CardHeader>
          <CardTitle>Untouched</CardTitle>
          <CardDescription>The card keeps its own type.</CardDescription>
        </CardHeader>
      </Card>
    </Typography>
  )
}
