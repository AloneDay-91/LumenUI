import { VUE_EXAMPLES } from "@/lib/vue-examples"

/**
 * Components that also ship for Vue 3 (Reka UI), keyed by docs slug. The data is
 * generated from vue/src/examples by `npm run registry`.
 */
export const VUE_COMPONENTS = VUE_EXAMPLES

export function vueComponent(slug: string) {
  const entry = VUE_EXAMPLES[slug]
  return entry ? { item: entry.item, usage: entry.code } : undefined
}

export function vueInstallCommand(item: string) {
  return `npx @aloneday/lumenui@latest add ${item} --framework vue`
}
