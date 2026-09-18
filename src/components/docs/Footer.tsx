export function Footer() {
  return (
    <footer className="relative z-50 mt-auto">
      <div className="flex items-center justify-end gap-4 px-4 py-6 md:px-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lumen UI
        </p>
      </div>
    </footer>
  )
}
