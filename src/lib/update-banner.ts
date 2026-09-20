import { getLatestChangelog } from "@/lib/changelog"

export const UPDATE_BANNER_STORAGE_KEY = "lumen:update-banner"

export function dismissUpdateBanner(version = getLatestChangelog().version) {
  try {
    localStorage.setItem(UPDATE_BANNER_STORAGE_KEY, version)
  } catch {
    // Private mode can throw.
  }

  document.documentElement.setAttribute("data-update-banner", "dismissed")
}

export function getUpdateBannerBootstrap() {
  const version = getLatestChangelog().version

  return `(function(){try{if(localStorage.getItem(${JSON.stringify(UPDATE_BANNER_STORAGE_KEY)})===${JSON.stringify(version)})document.documentElement.setAttribute("data-update-banner","dismissed")}catch(e){}})();`
}
