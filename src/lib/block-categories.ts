export const blockCategories = [
  {
    slug: "headers",
    title: "Headers",
    group: "Marketing",
    description: "The bar at the top of a page.",
  },
  {
    slug: "heroes",
    title: "Heroes",
    group: "Marketing",
    description: "The first screen, with a title and the actions under it.",
  },
  {
    slug: "features",
    title: "Features",
    group: "Marketing",
    description: "A short list of what the product does.",
  },
  {
    slug: "pricing",
    title: "Pricing",
    group: "Marketing",
    description: "Plans side by side.",
  },
  {
    slug: "cta",
    title: "Call to action",
    group: "Marketing",
    description: "A closing line and one action.",
  },
  {
    slug: "footers",
    title: "Footers",
    group: "Marketing",
    description: "Links and a copyright line.",
  },
  {
    slug: "login",
    title: "Login",
    group: "Account",
    description: "A sign-in screen.",
  },
  {
    slug: "sign-up",
    title: "Sign up",
    group: "Account",
    description: "Create an account.",
  },
  {
    slug: "contact",
    title: "Contact",
    group: "Account",
    description: "A short message to the studio.",
  },
] as const

export type BlockCategorySlug = (typeof blockCategories)[number]["slug"]

export function getBlockCategory(slug: string) {
  return blockCategories.find((category) => category.slug === slug)
}
