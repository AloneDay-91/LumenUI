import Script from "next/script"

import { SITE_URL } from "@/lib/site"

/**
 * Subresource Integrity for the two files served by the analytics host.
 * Recompute both after the host updates script.js or recorder.js:
 * openssl dgst -sha384 -binary FILE | openssl base64 -A
 */
const INTEGRITY = {
  tracker: "sha384-ZMxgpYfO/phGz4GiYTIZhcauuGKTb2onmOB5gsiigjmBR38DGAmIna5J1Y/dM/13",
  recorder: "sha384-RFbJB7wXp6wvtb7Yj7euqgFcWmpCYnwbQM8RHA4TiyV8qukjCB/YV9blThgO/M5Z",
} as const

/**
 * Page views load after hydration. Session replay waits until the page is idle.
 * Both are skipped in development, and when the public env vars are missing.
 *
 * NEXT_PUBLIC_ANALYTICS_WEBSITE_ID is not a secret: the browser has to send it.
 * Country, region and city are resolved by the analytics server from the IP.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null

  const host = process.env.NEXT_PUBLIC_ANALYTICS_HOST?.replace(/\/$/, "")
  const websiteId = process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID
  if (!host || !websiteId) return null

  const domain = new URL(SITE_URL).hostname

  return (
    <>
      <Script
        src={`${host}/script.js`}
        integrity={INTEGRITY.tracker}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        data-website-id={websiteId}
        data-domains={domain}
      />
      <Script
        src={`${host}/recorder.js`}
        integrity={INTEGRITY.recorder}
        crossOrigin="anonymous"
        strategy="lazyOnload"
        data-website-id={websiteId}
        data-domains={domain}
      />
    </>
  )
}
