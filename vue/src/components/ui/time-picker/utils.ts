export type Time = { hours: number; minutes: number }

export type TimeOption = { value: number; label: string }

export function parseTime(value: string | undefined | null): Time | undefined {
  const match = value?.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return undefined
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours > 23 || minutes > 59) return undefined
  return { hours, minutes }
}

export const pad = (n: number) => String(n).padStart(2, "0")

export function toValue({ hours, minutes }: Time) {
  return `${pad(hours)}:${pad(minutes)}`
}

export function formatTime(time: Time, hourCycle: 12 | 24) {
  if (hourCycle === 24) return toValue(time)
  const period = time.hours < 12 ? "AM" : "PM"
  const hours = time.hours % 12 === 0 ? 12 : time.hours % 12
  return `${hours}:${pad(time.minutes)} ${period}`
}
