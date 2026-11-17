import { Button, Field, FieldControl, FieldDescription, FieldError, FieldLabel, Form } from "lumen-ui"

export const Default = () => (
  <Form className="w-64" onFormSubmit={() => {}}>
    <Field name="email">
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" placeholder="you@studio.com" required />
      <FieldError match="valueMissing">Required</FieldError>
    </Field>
    <Button type="submit">Send</Button>
  </Form>
)

export const WithErrors = () => (
  <Form className="w-64" errors={{ email: "This email is already registered." }} onFormSubmit={() => {}}>
    <Field name="name">
      <FieldLabel>Full name</FieldLabel>
      <FieldControl defaultValue="Ada Lovelace" />
    </Field>
    <Field name="email">
      <FieldLabel>Email</FieldLabel>
      <FieldControl type="email" defaultValue="ada@studio.com" />
      <FieldError />
    </Field>
    <Field name="team">
      <FieldLabel>Team</FieldLabel>
      <FieldControl placeholder="Design" />
      <FieldDescription>Optional.</FieldDescription>
    </Field>
    <Button type="submit">Create account</Button>
  </Form>
)
