import { GITHUB_URL } from "@/lib/site"

export function Footer() {
  return (
    <footer className="relative z-50 mt-auto">
      <div className="flex items-center justify-end gap-4 px-4 py-6 md:px-6">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          GitHub
        </a>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lumen UI
        </p>
      </div>
    </footer>
  )
}
