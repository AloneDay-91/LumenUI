"use client";

import React from "react";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

export default function StylesPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const cssCode = `@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --lumen-surface-subtle: #fafafa;
  --lumen-surface-subtle-hover: #f4f4f5;
  --lumen-surface-subtle-active: #e4e4e7;
  --lumen-surface-default: #ffffff;
  --lumen-surface-default-hover: #f4f4f5;
  --lumen-surface-default-active: #e4e4e7;
  --lumen-surface-elevated: #fafafa;
  --lumen-surface-input: #fafafa;
  --lumen-surface-disabled: #f4f4f5;
  --lumen-surface-overlay: #18181b;
  --lumen-surface-highlight: #eff6ff;
  --lumen-surface-interactive: #3b82f6;
  --lumen-text-primary: #18181b;
  --lumen-text-secondary: #52525b;
  --lumen-text-tertiary: #71717a;
  --lumen-text-disabled: #a1a1aa;
  --lumen-text-inverse: #ffffff;
  --lumen-text-on-color: #ffffff;
  --lumen-text-interactive: #2563eb;
  --lumen-text-danger: #e11d48;
  --lumen-stroke-default: #e4e4e7;
  --lumen-stroke-strong: #d4d4d8;
  --lumen-stroke-interactive: #3b82f6;
  --lumen-stroke-danger: #e11d48;
  --lumen-stroke-critical: #be123c;
  --lumen-action-primary: #27272a;
  --lumen-action-primary-hover: #3f3f46;
  --lumen-action-secondary: #ffffff;
  --lumen-action-secondary-hover: #f4f4f5;
  --lumen-action-danger: #e11d48;
  --lumen-action-danger-hover: #be123c;

  --radius: 8px;
  --background: var(--lumen-surface-default);
  --foreground: var(--lumen-text-primary);
  --card: var(--lumen-surface-elevated);
  --card-foreground: var(--lumen-text-primary);
  --popover: var(--lumen-surface-elevated);
  --popover-foreground: var(--lumen-text-primary);
  --primary: var(--lumen-action-primary);
  --primary-foreground: var(--lumen-text-inverse);
  --secondary: var(--lumen-action-secondary);
  --secondary-foreground: var(--lumen-text-primary);
  --muted: var(--lumen-surface-subtle);
  --muted-foreground: var(--lumen-text-tertiary);
  --accent: var(--lumen-surface-subtle-hover);
  --accent-foreground: var(--lumen-text-primary);
  --destructive: var(--lumen-action-danger);
  --border: var(--lumen-stroke-default);
  --border-strong: var(--lumen-stroke-strong);
  --input: var(--lumen-surface-input);
  --ring: var(--lumen-stroke-interactive);
}

.dark {
  --lumen-surface-subtle: #18181b;
  --lumen-surface-subtle-hover: #212124;
  --lumen-surface-subtle-active: #27272a;
  --lumen-surface-default: #212124;
  --lumen-surface-default-hover: #27272a;
  --lumen-surface-default-active: #3f3f46;
  --lumen-surface-elevated: #27272a;
  --lumen-surface-disabled: #27272a;
  --lumen-surface-overlay: #18181b;
  --lumen-surface-highlight: #172554;
  --lumen-surface-interactive: #60a5fa;
  --lumen-text-primary: #f4f4f5;
  --lumen-text-secondary: #a1a1aa;
  --lumen-text-tertiary: #71717a;
  --lumen-text-disabled: #52525b;
  --lumen-text-inverse: #18181b;
  --lumen-text-on-color: #ffffff;
  --lumen-text-interactive: #60a5fa;
  --lumen-text-danger: #fb7185;
  --lumen-stroke-default: #3f3f46;
  --lumen-stroke-strong: #52525b;
  --lumen-stroke-interactive: #60a5fa;
  --lumen-stroke-danger: #fb7185;
  --lumen-stroke-critical: #be123c;
  --lumen-action-primary: #52525b;
  --lumen-action-primary-hover: #71717a;
  --lumen-action-secondary: #27272a;
  --lumen-action-secondary-hover: #3f3f46;
  --lumen-action-danger: #9f1239;
  --lumen-action-danger-hover: #be123c;

  --background: var(--lumen-surface-default);
  --foreground: var(--lumen-text-primary);
  --card: var(--lumen-surface-elevated);
  --card-foreground: var(--lumen-text-primary);
  --popover: var(--lumen-surface-elevated);
  --popover-foreground: var(--lumen-text-primary);
  --primary: var(--lumen-action-secondary-hover);
  --primary-foreground: var(--lumen-text-primary);
  --secondary: var(--lumen-action-primary);
  --secondary-foreground: var(--lumen-text-primary);
  --muted: var(--lumen-surface-subtle);
  --muted-foreground: var(--lumen-text-tertiary);
  --accent: var(--lumen-surface-subtle-hover);
  --accent-foreground: var(--lumen-text-primary);
  --destructive: var(--lumen-action-danger);
  --border: var(--lumen-stroke-default);
  --border-strong: var(--lumen-stroke-strong);
  --input: var(--lumen-surface-elevated);
  --ring: var(--lumen-stroke-interactive);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}`;

  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "styles", text: "Styles Globaux", level: 1 },
          { id: "installation", text: "Installation", level: 2 },
          { id: "css-variables", text: "Variables CSS", level: 2 },
          { id: "theming", text: "Thématisation", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Fondations</span>
            <span className="inline-block h-4 w-px bg-muted-foreground/20" />
            <span className="font-medium text-foreground">Styles</span>
          </div>

          <div className="space-y-4">
            <h1 id="styles" className="scroll-m-20 text-4xl font-bold tracking-tight">
              Styles Globaux
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Le système de design Lumen UI utilise des variables CSS pour garantir cohérence et thématisation facile.
            </p>
          </div>
        </div>

        <section className="space-y-4">
          <h2 id="installation" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Installation
          </h2>
          <p className="text-muted-foreground leading-7">
            Copiez le contenu ci-dessous dans votre fichier <code className="bg-muted px-2 py-1 rounded">globals.css</code> :
          </p>

          <div className="relative">
            <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto max-h-[600px]">
              <code className="text-sm font-mono">{cssCode}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(cssCode)}
              className="absolute top-2 right-2 p-2 rounded-md bg-background border border-border hover:bg-accent transition-colors"
              title="Copier le code"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="css-variables" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Variables CSS
          </h2>
          <p className="text-muted-foreground leading-7">
            Le système utilise deux niveaux de variables pour une flexibilité maximale :
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Variables de base</h3>
              <p className="text-sm text-muted-foreground">
                Variables définissant les couleurs et espacements de base du design system.
              </p>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">Catégorie</th>
                      <th className="text-left p-4 font-semibold">Variables</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4 font-mono text-sm">Surfaces</td>
                      <td className="p-4 text-sm text-muted-foreground">lumen-surface-subtle, lumen-surface-default, lumen-surface-elevated, lumen-surface-input, etc.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 font-mono text-sm">Textes</td>
                      <td className="p-4 text-sm text-muted-foreground">lumen-text-primary, lumen-text-secondary, lumen-text-tertiary, lumen-text-inverse, etc.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 font-mono text-sm">Bordures</td>
                      <td className="p-4 text-sm text-muted-foreground">lumen-stroke-default, lumen-stroke-strong, lumen-stroke-interactive, etc.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-sm">Actions</td>
                      <td className="p-4 text-sm text-muted-foreground">lumen-action-primary, lumen-action-secondary, lumen-action-danger, etc.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Variables sémantiques</h3>
              <p className="text-sm text-muted-foreground">
                Variables sémantiques mappées aux variables de base pour une utilisation dans les composants.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">--background</code>
                    <div className="h-6 w-6 rounded border border-border" style={{backgroundColor: 'var(--background)'}}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Couleur de fond principale</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">--foreground</code>
                    <div className="h-6 w-6 rounded border border-border" style={{backgroundColor: 'var(--foreground)'}}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Couleur de texte principale</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">--primary</code>
                    <div className="h-6 w-6 rounded border border-border" style={{backgroundColor: 'var(--primary)'}}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Couleur primaire</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">--destructive</code>
                    <div className="h-6 w-6 rounded border border-border" style={{backgroundColor: 'var(--destructive)'}}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Couleur destructive</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">--muted</code>
                    <div className="h-6 w-6 rounded border border-border" style={{backgroundColor: 'var(--muted)'}}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Couleur atténuée</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono">--border</code>
                    <div className="h-6 w-6 rounded border-2" style={{borderColor: 'var(--border)'}}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Couleur de bordure</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="theming" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Thématisation
          </h2>
          <p className="text-muted-foreground leading-7">
            Le système supporte automatiquement les modes clair et sombre via la classe <code className="bg-muted px-2 py-1 rounded">.dark</code>.
          </p>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Personnalisation</h3>
            <p className="text-sm text-muted-foreground">
              Pour personnaliser les couleurs, modifiez simplement les valeurs des variables CSS dans les sections <code className="bg-muted px-1 py-0.5 rounded">:root</code> et <code className="bg-muted px-1 py-0.5 rounded">.dark</code>.
            </p>

            <Alert variant="info">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <AlertTitle>Note importante</AlertTitle>
              <AlertDescription>
                Les variables CSS permettent une personnalisation complète tout en maintenant la cohérence du design system.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </div>
    </>
  );
}
