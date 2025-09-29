import React from "react";
import HeadingsSetter from "@/components/docs/HeadingsSetter";

export default function InstallationPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "installation", text: "Installation", level: 1 },
          { id: "requirements", text: "Requirements", level: 2 },
          { id: "package-installation", text: "Package Installation", level: 2 },
          { id: "configuration", text: "Configuration", level: 2 },
          { id: "first-component", text: "First Component", level: 2 },
          { id: "next-steps", text: "Next Steps", level: 2 },
        ]}
      />

      <div className="space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Docs</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Installation</span>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 id="installation" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Installation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Get started with Lumen UI in your React project. This comprehensive guide will walk you through the installation process and initial setup.
          </p>
        </div>

        {/* Requirements */}
        <section className="space-y-4">
          <h2 id="requirements" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Requirements
          </h2>
          <p className="text-muted-foreground leading-7">
            Before installing Lumen UI, ensure your project meets these minimum requirements:
          </p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                React <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">18.0.0</code> or higher
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                Node.js <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">16.0.0</code> or higher
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                TypeScript <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">4.5.0</code> or higher (recommended)
              </span>
            </div>
          </div>
        </section>

        {/* Package Installation */}
        <section className="space-y-4">
          <h2 id="package-installation" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Package Installation
          </h2>
          <p className="text-muted-foreground leading-7">
            Install Lumen UI using your preferred package manager:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Using npm</h3>
              <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono">npm install @lumen/ui</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Using yarn</h3>
              <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono">yarn add @lumen/ui</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Using pnpm</h3>
              <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono">pnpm add @lumen/ui</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="space-y-4">
          <h2 id="configuration" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Configuration
          </h2>
          <p className="text-muted-foreground leading-7">
            After installation, you need to configure your build tools and import the necessary styles.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Configure Tailwind CSS</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Add Lumen UI to your <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">tailwind.config.js</code> file:
              </p>
              <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono">{`/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@lumen/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@lumen/ui/plugin')],
}`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Import Styles</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Import the CSS variables in your main CSS file:
              </p>
              <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono">{`@import '@lumen/ui/styles';

/* Your existing styles */`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Setup Provider (Optional)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For advanced theming support, wrap your app with the LumenUIProvider:
              </p>
              <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
                <code className="text-sm font-mono">{`import { LumenUIProvider } from '@lumen/ui';

function MyApp({ Component, pageProps }) {
  return (
    <LumenUIProvider>
      <Component {...pageProps} />
    </LumenUIProvider>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* First Component */}
        <section className="space-y-4">
          <h2 id="first-component" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            First Component
          </h2>
          <p className="text-muted-foreground leading-7">
            You&quote;re now ready to use Lumen UI components. Here&quote;s a simple example:
          </p>

          <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono">{`import { Button } from '@lumen/ui';

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Lumen UI</h1>
      <Button variant="default" size="lg">
        Get Started
      </Button>
    </div>
  );
}`}</code>
          </pre>
        </section>

        {/* Next Steps */}
        <section className="space-y-4">
          <h2 id="next-steps" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Next Steps
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <a href="/docs/components/button" className="group block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Browse Components</h3>
                  <p className="text-sm text-muted-foreground">Explore all available components and their usage examples</p>
                </div>
              </div>
            </a>

            <a href="/docs/customization" className="group block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center">
                  <svg className="h-5 w-5 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Customization Guide</h3>
                  <p className="text-sm text-muted-foreground">Learn how to customize themes and create your own component variants</p>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Callout */}
        <div className="docs-callout info">
          <div className="flex items-start space-x-3">
            <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                TypeScript Support
              </p>
              <p className="text-blue-800 dark:text-blue-200 text-sm mt-1">
                All Lumen UI components include comprehensive TypeScript definitions for enhanced development experience and type safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
