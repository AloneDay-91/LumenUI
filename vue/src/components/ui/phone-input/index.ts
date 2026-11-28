export { default as PhoneInput } from "./PhoneInput.vue"

export type PhoneCountry = {
  /** ISO 3166-1 alpha-2, upper case: "FR". */
  code: string
  /** Calling code without the plus: "33". */
  dial: string
  /** National format, one # per digit: "# ## ## ## ##". Groups of three by default. */
  pattern?: string
  /** Drop a leading 0 typed in the national number, as most of Europe writes it. */
  trunkZero?: boolean
}

/** A starting list. Pass your own `countries` for more, fewer, or other formats. */
export const phoneCountries: PhoneCountry[] = [
  { code: "FR", dial: "33", pattern: "# ## ## ## ##", trunkZero: true },
  { code: "BE", dial: "32", pattern: "### ## ## ##", trunkZero: true },
  { code: "CH", dial: "41", pattern: "## ### ## ##", trunkZero: true },
  { code: "LU", dial: "352" },
  { code: "MC", dial: "377" },
  { code: "DE", dial: "49", trunkZero: true },
  { code: "AT", dial: "43", trunkZero: true },
  { code: "NL", dial: "31", pattern: "# ########", trunkZero: true },
  { code: "ES", dial: "34", pattern: "### ## ## ##" },
  { code: "PT", dial: "351", pattern: "### ### ###" },
  { code: "IT", dial: "39", pattern: "### ### ####" },
  { code: "GB", dial: "44", pattern: "#### ######", trunkZero: true },
  { code: "IE", dial: "353", trunkZero: true },
  { code: "DK", dial: "45", pattern: "## ## ## ##" },
  { code: "SE", dial: "46", trunkZero: true },
  { code: "NO", dial: "47", pattern: "### ## ###" },
  { code: "FI", dial: "358", trunkZero: true },
  { code: "PL", dial: "48", pattern: "### ### ###" },
  { code: "CZ", dial: "420", pattern: "### ### ###" },
  { code: "GR", dial: "30" },
  { code: "US", dial: "1", pattern: "(###) ###-####" },
  { code: "CA", dial: "1", pattern: "(###) ###-####" },
  { code: "MX", dial: "52" },
  { code: "BR", dial: "55", pattern: "## #####-####" },
  { code: "AR", dial: "54" },
  { code: "MA", dial: "212", pattern: "# ## ## ## ##", trunkZero: true },
  { code: "DZ", dial: "213", trunkZero: true },
  { code: "TN", dial: "216", pattern: "## ### ###" },
  { code: "SN", dial: "221", pattern: "## ### ## ##" },
  { code: "CI", dial: "225" },
  { code: "NG", dial: "234", trunkZero: true },
  { code: "ZA", dial: "27", trunkZero: true },
  { code: "EG", dial: "20", trunkZero: true },
  { code: "TR", dial: "90", trunkZero: true },
  { code: "IL", dial: "972", trunkZero: true },
  { code: "AE", dial: "971", trunkZero: true },
  { code: "SA", dial: "966", trunkZero: true },
  { code: "IN", dial: "91", pattern: "##### #####" },
  { code: "CN", dial: "86" },
  { code: "JP", dial: "81", trunkZero: true },
  { code: "KR", dial: "82", trunkZero: true },
  { code: "SG", dial: "65", pattern: "#### ####" },
  { code: "AU", dial: "61", pattern: "### ### ###", trunkZero: true },
  { code: "NZ", dial: "64", trunkZero: true },
]

/** "FR" → 🇫🇷, from the regional indicator letters. */
export function flag(code: string) {
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)))
}

export function formatPhoneNumber(digits: string, pattern?: string) {
  if (!digits) return ""
  if (!pattern) return digits.replace(/(\d{3})(?=\d)/g, "$1 ")
  let out = ""
  let i = 0
  for (const char of pattern) {
    if (i >= digits.length) break
    if (char === "#") out += digits[i++]
    else out += char
  }
  // Digits past the pattern are kept, not dropped.
  return i < digits.length ? `${out}${digits.slice(i)}` : out
}

/** "+33612345678" → the country and national digits, preferring `preferred` on shared codes. */
export function parsePhoneNumber(value: string, countries: PhoneCountry[], preferred: string) {
  const digits = value.replace(/\D/g, "")
  if (!value.startsWith("+") || !digits) return null
  const matches = countries
    .filter((country) => digits.startsWith(country.dial))
    .sort((a, b) => b.dial.length - a.dial.length)
  if (!matches.length) return null
  const longest = matches.filter((c) => c.dial.length === matches[0].dial.length)
  const country = longest.find((c) => c.code === preferred) ?? longest[0]
  return { country, national: digits.slice(country.dial.length) }
}
