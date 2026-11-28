<script setup lang="ts">
import { computed, getCurrentInstance, ref, watch, type ComponentPublicInstance, type HTMLAttributes } from "vue"
import { FormRoot, type FormRootProps } from "reka-ui"

import { cn } from "@/lib/utils"
import type { FormErrors, FormSlotProps, FormValues } from "./types"

/**
 * A form on Reka UI's FormRoot: native validation is turned off in favour of
 * field messages, the first invalid control takes focus on submit, server
 * `errors` show until their field is edited, and `formSubmit` hands over the
 * values of every named control.
 *
 * Reka fields (FieldRoot) register with it directly. The Lumen Field and plain
 * inputs are checked through their native constraints (`required`, `type`,
 * `pattern`…), and the default slot receives `{ invalid, errors }` to wire them.
 */
const props = withDefaults(
  defineProps<FormRootProps & { class?: HTMLAttributes["class"]; errors?: FormErrors }>(),
  { validationMode: "onSubmit", as: "form" },
)
const emits = defineEmits<{
  /** The native submit event, once every field is valid. */
  submit: [event: SubmitEvent]
  /** The values of every named control. Listening to it prevents the native submission. */
  formSubmit: [values: FormValues, event: SubmitEvent]
  /** A field with a server error was edited: the errors that remain. */
  clearErrors: [errors: FormErrors]
}>()

const delegated = computed(() => {
  const { class: _class, errors: _errors, ...rest } = props
  return rest
})

const instance = getCurrentInstance()
const rootRef = ref<ComponentPublicInstance<{}, { validate: (name?: string) => boolean }> | null>(null)
const formElement = () => (rootRef.value?.$el as HTMLFormElement | undefined) ?? null

const submitCount = ref(0)
const nativeErrors = ref<Record<string, string>>({})
const cleared = ref(new Set<string>())
watch(
  () => props.errors,
  () => {
    cleared.value = new Set()
  },
)

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

function controls(name?: string): Control[] {
  const form = formElement()
  if (!form) return []
  return (Array.from(form.elements) as Control[]).filter(
    (el) => "willValidate" in el && el.name && (!name || el.name === name),
  )
}

function validateControl(el: Control) {
  const next = { ...nativeErrors.value }
  if (el.willValidate && !el.validity.valid) next[el.name] = el.validationMessage
  else delete next[el.name]
  nativeErrors.value = next
  return el.validity.valid
}

/** Validates every control, or those named `name`. Returns whether they're all valid. */
function validate(name?: string) {
  const nativeValid = controls(name)
    .map(validateControl)
    .every(Boolean)
  const rekaValid = rootRef.value?.validate(name) ?? true
  return nativeValid && rekaValid
}
defineExpose({ validate })

const serverErrors = computed(() => {
  const out: Record<string, string[]> = {}
  for (const [name, value] of Object.entries(props.errors ?? {})) {
    if (cleared.value.has(name)) continue
    const messages = Array.isArray(value) ? value : [value]
    if (messages.length) out[name] = messages
  }
  return out
})

const slotProps = computed<FormSlotProps>(() => {
  const errors: Record<string, string[]> = {}
  for (const [name, message] of Object.entries(nativeErrors.value)) errors[name] = [message]
  for (const [name, messages] of Object.entries(serverErrors.value)) {
    errors[name] = [...(errors[name] ?? []), ...messages]
  }
  const invalid: Record<string, boolean> = {}
  for (const name of Object.keys(errors)) invalid[name] = true
  return { invalid, errors, submitCount: submitCount.value }
})

function collectValues(form: HTMLFormElement): FormValues {
  const values: FormValues = {}
  for (const [name, value] of new FormData(form).entries()) {
    const previous = values[name]
    if (previous === undefined) values[name] = value
    else values[name] = Array.isArray(previous) ? [...previous, value] : [previous, value]
  }
  return values
}

// Runs before FormRoot's own handler: a native control that fails its
// constraints stops the submission there.
function onSubmitCapture(event: Event) {
  submitCount.value++
  const invalidControls = controls().filter((el) => !validateControl(el))
  if (invalidControls.length === 0) return
  event.preventDefault()
  event.stopImmediatePropagation()
  const first = invalidControls[0]!
  first.focus()
  if (first instanceof HTMLInputElement) first.select?.()
}

function revalidate(event: Event, trigger: "change" | "blur") {
  const el = event.target as Control | null
  if (!el || !("willValidate" in el) || !el.name) return
  const mode = props.validationMode
  if (
    (trigger === "change" && (mode === "onChange" || (mode === "onSubmit" && submitCount.value > 0))) ||
    (trigger === "blur" && mode === "onBlur")
  ) {
    validateControl(el)
  }
}

function onEdit(event: Event) {
  const name = (event.target as Control | null)?.name
  if (name && props.errors && name in props.errors && !cleared.value.has(name)) {
    cleared.value = new Set([...cleared.value, name])
    const { [name]: _removed, ...rest } = props.errors
    emits("clearErrors", rest)
  }
  revalidate(event, "change")
}

const hasFormSubmitListener = computed(() => Boolean(instance?.vnode.props?.onFormSubmit))
const rootListeners = computed(() => ({
  onSubmit: (event: SubmitEvent) => emits("submit", event),
  ...(hasFormSubmitListener.value
    ? {
        onFormSubmit: (values: Record<string, unknown>, event: SubmitEvent) => {
          const form = event.currentTarget as HTMLFormElement | null
          emits("formSubmit", { ...(form ? collectValues(form) : {}), ...values }, event)
        },
      }
    : {}),
}))
</script>

<template>
  <FormRoot
    ref="rootRef"
    data-slot="form"
    v-bind="delegated"
    :errors="serverErrors"
    :class="cn('flex flex-col gap-4', props.class)"
    v-on="rootListeners"
    @submit.capture="onSubmitCapture"
    @input="onEdit"
    @change="onEdit"
    @focusout="revalidate($event, 'blur')"
  >
    <slot v-bind="slotProps" />
  </FormRoot>
</template>
