"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { OTPField, OTPFieldInput } from "@/components/ui/OTPField"

export default function OTPFieldPage() {
  return (
    <ComponentDocs
      name="OTP Field"
      description="Code à usage unique, une case par caractère. Construit sur @base-ui/react/otp-field."
      preview={
        <OTPField length={6}>
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
        </OTPField>
      }
      usage={`import { OTPField, OTPFieldInput } from "@/components/ui/OTPField"

<OTPField length={6}>
  <OTPFieldInput />
  <OTPFieldInput />
  <OTPFieldInput />
  <OTPFieldInput />
  <OTPFieldInput />
  <OTPFieldInput />
</OTPField>`}
    />
  )
}
