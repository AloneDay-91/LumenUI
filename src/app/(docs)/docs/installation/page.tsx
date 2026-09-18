import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"

export default function InstallationPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "installation", text: "Installation", level: 1 },
          { id: "dependances", text: "Dépendances", level: 2 },
          { id: "tokens", text: "Tokens", level: 2 },
          { id: "utilitaire", text: "Utilitaire", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Démarrage"
          title="Installation"
          description="Lumen UI n'est pas une librairie à installer. Vous posez les fondations, puis vous copiez les composants dont vous avez besoin."
        />

        <Alert>
          <AlertTitle>Pourquoi copy-paste</AlertTitle>
          <AlertDescription>
            Vous possédez le code. Les primitives Base UI restent une dépendance, le style Lumen non.
          </AlertDescription>
        </Alert>

        <section className="space-y-4">
          <h2 id="dependances">
            Dépendances
          </h2>
          <CodeBlock
            language="bash"
            code={`npm install @base-ui/react class-variance-authority clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/postcss tw-animate-css`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="tokens">
            Tokens
          </h2>
          <Alert>
            <AlertTitle>CSS global</AlertTitle>
            <AlertDescription>
              Copiez les variables depuis <a href="/docs/styles">Styles</a> dans
              votre feuille globale. Inter, Fraunces et JetBrains Mono se chargent
              via <code>next/font</code>.
            </AlertDescription>
          </Alert>
        </section>

        <section className="space-y-4">
          <h2 id="utilitaire">
            Utilitaire
          </h2>
          <CodeBlock
            filename="lib/utils.ts"
            language="ts"
            code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          />
        </section>
      </div>
    </>
  )
}
