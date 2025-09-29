import React from "react";
import HeadingsSetter from "@/components/docs/HeadingsSetter";

export default function DocsPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "introduction", text: "Introduction", level: 1 },
          { id: "what-is-lumen-ui", text: "What is Lumen UI?", level: 2 },
          { id: "key-features", text: "Key Features", level: 2 },
          { id: "who-should-use", text: "Who should use Lumen UI?", level: 2 },
          { id: "getting-started", text: "Getting Started", level: 2 },
        ]}
      />

      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 id="introduction" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Introduction
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Welcome to Lumen UI, a modern and comprehensive design system built for React applications.
            Designed to accelerate development while maintaining high-quality user experiences.
          </p>
        </div>

        {/* What is Lumen UI */}
        <section className="space-y-4">
          <h2 id="what-is-lumen-ui" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            What is Lumen UI?
          </h2>
          <p className="text-muted-foreground leading-7">
            Lumen UI is a complete design system that bridges the gap between design and development.
            It provides everything you need to build beautiful, accessible, and consistent user interfaces.
          </p>

          <div className="space-y-2">
            <p className="text-muted-foreground leading-7">Our design system includes:</p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>A complete library of pre-built, accessible React components</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Consistent design tokens based on proven design principles</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Comprehensive documentation and usage guidelines</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Developer-friendly tools and utilities</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-4">
          <h2 id="key-features" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Key Features
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold">Accessibility First</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Built with WCAG 2.1 AA compliance in mind. All components include proper ARIA attributes and keyboard navigation.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-green-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold">Highly Customizable</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                CSS variables and Tailwind integration allow for extensive theming and customization possibilities.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-purple-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold">Developer Experience</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                TypeScript support, comprehensive documentation, and intuitive APIs make development a breeze.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-orange-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-semibold">Production Ready</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Battle-tested components used in production environments with comprehensive testing coverage.
              </p>
            </div>
          </div>
        </section>

        {/* Who should use */}
        <section className="space-y-4">
          <h2 id="who-should-use" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Who should use Lumen UI?
          </h2>
          <p className="text-muted-foreground leading-7">
            Lumen UI is perfect for teams and individuals who want to build high-quality React applications quickly and efficiently:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-foreground">Frontend Developers</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Build applications faster with pre-built, tested components that follow best practices.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-foreground">Design Teams</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Ensure consistency across products with a unified design language and component library.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-foreground">Product Teams</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Accelerate development cycles and maintain high-quality user experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="space-y-4">
          <h2 id="getting-started" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Getting Started
          </h2>
          <p className="text-muted-foreground leading-7">
            Ready to start building with Lumen UI? Here are your next steps:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <a href="/docs/installation" className="group block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Installation Guide</h3>
                  <p className="text-sm text-muted-foreground">Learn how to install and set up Lumen UI in your project</p>
                </div>
              </div>
            </a>

            <a href="/docs/components/button" className="group block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-md bg-secondary flex items-center justify-center">
                  <svg className="h-5 w-5 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Explore Components</h3>
                  <p className="text-sm text-muted-foreground">Browse our component library and see what&quote;s available</p>
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
                Built with modern standards
              </p>
              <p className="text-blue-800 dark:text-blue-200 text-sm mt-1">
                Lumen UI is built on top of the latest web technologies including React 18, TypeScript, and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
