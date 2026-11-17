"use client"

import { useCallback, useState } from "react"

/** A value that matches no item, so cmdk has nothing to select at mount. */
const IDLE = "__idle__"

/**
 * cmdk calls `scrollIntoView` on its selected item as soon as it mounts, which
 * drags the page down to a Command that sits below the fold. This hook keeps
 * cmdk's selection empty until the visitor focuses or hovers the Command.
 * `active` is the highlighted item either way: style it with `data-active`.
 */
export function useQuietCommand(initial: string) {
  const [active, setActive] = useState(initial)
  const [engaged, setEngaged] = useState(false)

  const engage = useCallback(() => setEngaged(true), [])
  const onValueChange = useCallback((next: string) => {
    if (next && next !== IDLE) setActive(next)
  }, [])

  return {
    active,
    engaged,
    /** Pass as `value` while the Command has not been engaged yet. */
    idleValue: IDLE,
    commandProps: {
      value: engaged ? active : IDLE,
      onValueChange,
      onFocusCapture: engage,
      onPointerEnter: engage,
    },
  }
}
