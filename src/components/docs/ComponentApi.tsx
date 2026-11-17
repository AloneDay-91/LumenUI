import { apiPartId, type ComponentApi as ComponentApiData } from "@/lib/component-api"

export function ComponentApi({ api }: { api: ComponentApiData }) {
  return (
    <div data-docs-panel>
      <section className="space-y-3">
        <h2 id="api">API</h2>
        <p>
          Lumen-specific and commonly used props. Parts also accept the matching{" "}
          {api.primitive ? (
            <>
              <code>{api.primitive}</code> props
            </>
          ) : (
            "native element props"
          )}
          . Source: <code>{api.source}</code>.
        </p>
      </section>

      {api.parts.map((item) => (
        <section key={item.name} className="space-y-3">
          <h3 id={apiPartId(item.name)} className="font-mono">
            {item.name}
          </h3>
          {item.description ? <p>{item.description}</p> : null}
          {item.props.length > 0 ? (
            <ul
              data-docs-api
              className="divide-y divide-border rounded-[min(var(--radius-4xl),24px)] border border-border"
            >
              {item.props.map((prop) => (
                <li key={prop.name} className="space-y-1.5 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <code className="font-medium text-foreground!">{prop.name}</code>
                    {prop.default ? (
                      <span className="shrink-0 text-xs text-muted-foreground">
                        Default <code>{prop.default}</code>
                      </span>
                    ) : null}
                  </div>
                  <code className="block bg-transparent! px-0! py-0! text-muted-foreground">
                    {prop.type}
                  </code>
                  <p>{prop.description}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  )
}
