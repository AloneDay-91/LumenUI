<script setup lang="ts">
import { ArrowRight } from "@lucide/vue"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPanel,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const menus = [
  {
    id: "system",
    title: "System",
    featured: {
      title: "Get started",
      items: [
        { href: "/docs", label: "Introduction" },
        { href: "/docs/installation", label: "Installation" },
        { href: "/docs/frameworks", label: "Frameworks" },
      ],
    },
    section: {
      title: "Foundations",
      items: [
        { href: "/docs/styles", label: "Tokens and type" },
        { href: "/docs/accessibility", label: "Accessibility" },
      ],
    },
  },
  {
    id: "components",
    title: "Components",
    featured: {
      title: "Most used",
      items: [
        { href: "/docs/components/button", label: "Button" },
        { href: "/docs/components/dialog", label: "Dialog" },
        { href: "/docs/components/select", label: "Select" },
      ],
    },
    section: {
      title: "Forms",
      items: [
        { href: "/docs/components/field", label: "Field" },
        { href: "/docs/components/form", label: "Form" },
      ],
    },
  },
]
</script>

<template>
  <NavigationMenu class="w-full rounded-[inherit]">
    <div class="flex items-center px-6 py-5">
      <NavigationMenuList>
        <NavigationMenuItem v-for="menu in menus" :key="menu.id" :value="menu.id">
          <NavigationMenuTrigger>{{ menu.title }}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuPanel class="max-w-none">
              <NavigationMenuGroup :title="menu.featured.title">
                <NavigationMenuLink
                  v-for="item in menu.featured.items"
                  :key="item.href"
                  variant="featured"
                  :href="item.href"
                >
                  {{ item.label }}
                </NavigationMenuLink>
              </NavigationMenuGroup>
              <div class="flex flex-col gap-10">
                <NavigationMenuGroup :title="menu.section.title">
                  <NavigationMenuLink v-for="item in menu.section.items" :key="item.href" :href="item.href">
                    {{ item.label }}
                  </NavigationMenuLink>
                </NavigationMenuGroup>
                <NavigationMenuLink variant="muted" class="mt-auto self-start" href="/docs/components">
                  All components
                  <ArrowRight class="size-3.5" aria-hidden="true" />
                </NavigationMenuLink>
              </div>
            </NavigationMenuPanel>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </div>
    <NavigationMenuPortal>
      <NavigationMenuPositioner>
        <NavigationMenuPopup>
          <NavigationMenuViewport />
        </NavigationMenuPopup>
      </NavigationMenuPositioner>
    </NavigationMenuPortal>
  </NavigationMenu>
</template>
