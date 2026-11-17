import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "lumen-ui"

export const Bottom = () => (
  <Drawer defaultOpen>
    <DrawerTrigger render={<Button />}>Bottom</DrawerTrigger>
    <DrawerPopup>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>Swipe down to close.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerPopup>
  </Drawer>
)

export const Side = () => (
  <Drawer defaultOpen swipeDirection="right">
    <DrawerTrigger render={<Button variant="outline" />}>Side</DrawerTrigger>
    <DrawerPopup>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Panel</DrawerTitle>
          <DrawerDescription>Swipe right to close.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerPopup>
  </Drawer>
)
