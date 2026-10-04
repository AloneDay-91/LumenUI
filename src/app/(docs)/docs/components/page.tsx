import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { PageIntro } from "@/components/docs/Preview";
import { docsSections } from "@/lib/docs-nav";
import Link from "next/link";

const componentItems =
  docsSections.find((section) => section.title === "Components")?.items ?? [];

export default function ListComponentsPage() {
  return (
    <>
      <HeadingsSetter
        headings={[{ id: "components", text: "Components", level: 1 }]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Components"
          title="List of Components"
          description="A list of all the components available in Lumen UI."
        />

        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2
            id="components"
            className="text-sm font-medium tracking-tight text-muted-foreground"
          >
            Components
          </h2>
          <p className="font-mono text-xs text-muted-foreground">
            {String(componentItems.length).padStart(2, "0")}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
          {componentItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-md text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
