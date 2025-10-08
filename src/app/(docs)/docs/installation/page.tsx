import React from "react";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

export default function InstallationPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "installation", text: "Installation", level: 1 },
          { id: "copy-paste", text: "Copier & Coller", level: 2 },
          { id: "setup", text: "Configuration", level: 2 },
          { id: "usage", text: "Utilisation", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Démarrage</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Installation</span>
        </div>

        <div className="space-y-4">
          <h1 id="installation" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Installation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Lumen UI n&apos;est pas une librairie npm. C&apos;est une collection de composants réutilisables
            que vous copiez et collez dans vos applications.
          </p>
        </div>

        <section className="space-y-4">
          <h2 id="copy-paste" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Copier & Coller
          </h2>
          <p className="text-muted-foreground leading-7">
            Choisissez le composant dont vous avez besoin, copiez le code et collez-le dans votre projet.
            C&apos;est simple, rapide et vous gardez le contrôle total sur votre code.
          </p>

          <Alert variant="info">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <AlertTitle>Pourquoi Copier & Coller ?</AlertTitle>
            <AlertDescription>
              Vous possédez le code, vous pouvez le personnaliser sans limite et il n&apos;y a aucune dépendance à maintenir.
            </AlertDescription>
          </Alert>
        </section>

        <section className="space-y-4">
          <h2 id="setup" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Configuration
          </h2>
          <p className="text-muted-foreground leading-7">
            Avant de commencer à copier les composants, assurez-vous d&apos;avoir configuré votre projet :
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">1. Installer Tailwind CSS</h3>
              <p className="text-sm text-muted-foreground">
                Les composants utilisent Tailwind CSS pour le style.
              </p>
              <CodeBlock
                code="npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p"
                language="bash"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">2. Ajouter les styles globaux</h3>
              <p className="text-sm text-muted-foreground">
                Copiez les variables CSS depuis la page <a href="/docs/styles" className="text-primary hover:underline">Styles</a>.
              </p>
              <CodeBlock
                code={`// globals.css
@import "tailwindcss";

// Copiez toutes les variables CSS depuis /docs/styles`}
                filename="app/globals.css"
                language="css"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">3. Installer les dépendances</h3>
              <p className="text-sm text-muted-foreground">
                Installez les utilitaires nécessaires :
              </p>
              <CodeBlock
                code="npm install class-variance-authority clsx tailwind-merge"
                language="bash"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">4. Créer le fichier utils</h3>
              <p className="text-sm text-muted-foreground">
                Créez un fichier pour la fonction utilitaire <code className="bg-muted px-1 py-0.5 rounded">cn()</code> :
              </p>
              <CodeBlock
                code={`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
                filename="lib/utils.ts"
                language="tsx"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="usage" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Utilisation
          </h2>
          <p className="text-muted-foreground leading-7">
            Une fois la configuration terminée, parcourez les composants, copiez le code et utilisez-le dans votre projet :
          </p>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <a href="/docs/components/button" className="group block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                    <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">Parcourir les composants</h3>
                    <p className="text-sm text-muted-foreground">Découvrez tous les composants disponibles</p>
                  </div>
                </div>
              </a>

              <a href="/docs/styles" className="group block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center">
                    <svg className="h-5 w-5 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">Personnaliser les styles</h3>
                    <p className="text-sm text-muted-foreground">Adaptez les variables CSS à votre marque</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
