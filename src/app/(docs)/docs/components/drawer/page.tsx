"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"

export default function DrawerPage() {
  return (
    <ComponentDocs
      name="Drawer"
      description="Panel that slides from an edge, swipe to close. Built on @base-ui/react/drawer."
      preview={
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Drawer>
            <DrawerTrigger render={<Button />}>Bottom</DrawerTrigger>
            <DrawerPopup>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Notifications</DrawerTitle>
                  <DrawerDescription>
                    Swipe down to close.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="secondary" />}>
                    Close
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </DrawerPopup>
          </Drawer>
          <Drawer swipeDirection="right">
            <DrawerTrigger render={<Button variant="outline" />}>
              Side
            </DrawerTrigger>
            <DrawerPopup>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Panel</DrawerTitle>
                  <DrawerDescription>
                    Swipe right to close.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="secondary" />}>
                    Close
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </DrawerPopup>
          </Drawer>
        </div>
      }
      usage={`import { Drawer, DrawerTrigger, DrawerPopup, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/Drawer"

<Drawer>
  <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
  <DrawerPopup>
    <DrawerContent>
      <DrawerTitle>Notifications</DrawerTitle>
      <DrawerDescription>Swipe to close.</DrawerDescription>
      <DrawerClose render={<Button variant="secondary" />}>Close</DrawerClose>
    </DrawerContent>
  </DrawerPopup>
</Drawer>`}
    />
  )
}
