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
      description="Panneau qui glisse depuis un bord, avec swipe pour fermer. Construit sur @base-ui/react/drawer."
      preview={
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Drawer>
            <DrawerTrigger render={<Button />}>Bas</DrawerTrigger>
            <DrawerPopup>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Notifications</DrawerTitle>
                  <DrawerDescription>
                    Glisse vers le bas pour fermer.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="secondary" />}>
                    Fermer
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </DrawerPopup>
          </Drawer>
          <Drawer swipeDirection="right">
            <DrawerTrigger render={<Button variant="outline" />}>
              Côté
            </DrawerTrigger>
            <DrawerPopup>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Panneau</DrawerTitle>
                  <DrawerDescription>
                    Glisse vers la droite pour fermer.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose render={<Button variant="secondary" />}>
                    Fermer
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </DrawerPopup>
          </Drawer>
        </div>
      }
      usage={`import { Drawer, DrawerTrigger, DrawerPopup, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/Drawer"

<Drawer>
  <DrawerTrigger render={<Button />}>Ouvrir</DrawerTrigger>
  <DrawerPopup>
    <DrawerContent>
      <DrawerTitle>Notifications</DrawerTitle>
      <DrawerDescription>Glisse pour fermer.</DrawerDescription>
      <DrawerClose render={<Button variant="secondary" />}>Fermer</DrawerClose>
    </DrawerContent>
  </DrawerPopup>
</Drawer>`}
    />
  )
}
