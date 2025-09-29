import { Button } from "@/components/ui/Button";

export default function ButtonPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <div className="font-medium text-foreground">Button</div>
        </div>
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Button</h1>
          <p className="text-lg text-muted-foreground">A clickable button with various styles.</p>
        </div>

        <div className="pb-12 pt-8">
          <h2 className="mb-4 text-2xl font-semibold">Examples</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
