import { apiPartId, type ComponentApi as ComponentApiData } from "@/lib/component-api"

export function ComponentApi({ api }: { api: ComponentApiData }) {
  return (
    <div className="space-y-10">
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
          <h3 id={apiPartId(item.name)}>{item.name}</h3>
          {item.description ? <p>{item.description}</p> : null}
          {item.props.length > 0 ? (
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {item.props.map((prop) => (
                    <tr key={prop.name}>
                      <td>
                        <code>{prop.name}</code>
                      </td>
                      <td>
                        <code>{prop.type}</code>
                      </td>
                      <td>{prop.default ? <code>{prop.default}</code> : "—"}</td>
                      <td>{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}
