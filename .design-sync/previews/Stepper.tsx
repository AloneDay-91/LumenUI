import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "lumen-ui"

function InstallSteps({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  return (
    <Stepper orientation={orientation}>
      <StepperItem status="complete">
        <StepperIndicator>1</StepperIndicator>
        <StepperContent>
          <StepperTitle>Tokens</StepperTitle>
          <StepperDescription>Copy globals.css</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem status="current">
        <StepperIndicator>2</StepperIndicator>
        <StepperContent>
          <StepperTitle>Button</StepperTitle>
          <StepperDescription>First component</StepperDescription>
        </StepperContent>
      </StepperItem>
      <StepperItem status="upcoming">
        <StepperIndicator>3</StepperIndicator>
        <StepperContent>
          <StepperTitle>Ship</StepperTitle>
          <StepperDescription>The rest on demand</StepperDescription>
        </StepperContent>
      </StepperItem>
    </Stepper>
  )
}

export const Horizontal = () => (
  <div className="w-full max-w-lg">
    <InstallSteps />
  </div>
)

export const Vertical = () => (
  <div className="w-full max-w-md">
    <InstallSteps orientation="vertical" />
  </div>
)
