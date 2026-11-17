import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "lumen-ui"

export const Open = () => (
  <Popover defaultOpen>
    <PopoverTrigger render={<Button variant="outline" />}>Details</PopoverTrigger>
    <PopoverContent>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Width, height, and radius from Lumen tokens.</PopoverDescription>
    </PopoverContent>
  </Popover>
)
