import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { StackIcon, ComponentInstanceIcon, LightningBoltIcon, CodeIcon, CopyIcon, RocketIcon } from "@radix-ui/react-icons";
import React from "react";
import Link from "next/link";
import { Footer } from "@/components/docs/Footer";

const version = process.env.NEXT_PUBLIC_VERSION

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-5xl text-center">
            <Badge variant="outline" className="mb-6 backdrop-blur-sm bg-background/80">
              <LightningBoltIcon className="mr-1 h-3 w-3" />
              {version}
            </Badge>

            <h1 className="mb-6 flex flex-col items-center justify-center gap-4 text-6xl font-extrabold tracking-tight lg:text-7xl">
              <StackIcon width="80" height="80" className="text-primary" />
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Lumen UI
              </span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-xl text-muted-foreground backdrop-blur-sm bg-background/60 rounded-lg p-4">
              Un système de design moderne et élégant pour créer des interfaces utilisateur exceptionnelles.
            </p>

            <p className="mx-auto mb-8 max-w-2xl text-sm text-muted-foreground/80 backdrop-blur-sm bg-background/40 rounded-lg p-3">
              Construit avec <span className="border-b border-border">Next.js 15</span>, <span className="border-b border-border">React 19</span> et <span className="border-b border-border">Tailwind CSS 4</span>
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs">
                <Button size="lg" className="gap-2 backdrop-blur-sm">
                  <RocketIcon className="h-4 w-4" />
                  Commencer
                </Button>
              </Link>
              <Link href="/docs/components/button">
                <Button variant="secondary" size="lg" className="gap-2 backdrop-blur-sm">
                  <ComponentInstanceIcon className="h-4 w-4" />
                  Composants
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 backdrop-blur-md bg-background/30">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight">
                Pourquoi Lumen UI ?
              </h2>
              <p className="text-lg text-muted-foreground">
                Un système de design pensé pour les développeurs modernes
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <CopyIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Copy & Paste</CardTitle>
                  <CardDescription>
                    Pas de npm install. Copiez le code directement dans votre projet et personnalisez-le.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <ComponentInstanceIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Composants Riches</CardTitle>
                  <CardDescription>
                    9 composants prêts à l'emploi avec variants et états multiples.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <LightningBoltIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>100% Personnalisable</CardTitle>
                  <CardDescription>
                    Vous possédez le code. Modifiez les styles, les comportements, tout est à vous.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <CardTitle>Mode Sombre</CardTitle>
                  <CardDescription>
                    Support natif du mode sombre avec des variables CSS intelligentes.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <CardTitle>Accessible</CardTitle>
                  <CardDescription>
                    Construit sur Radix UI pour une accessibilité maximale (ARIA, clavier, etc.).
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <CardTitle>TypeScript First</CardTitle>
                  <CardDescription>
                    Typé de bout en bout pour une meilleure expérience développeur.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <Card>
              <CardHeader className="">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <RocketIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>
                  Prêt à commencer ?
                </CardTitle>
                <CardDescription>
                  Explorez la documentation et commencez à construire des interfaces magnifiques en quelques minutes.
                </CardDescription>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link href="/docs/installation">
                    <Button className="gap-2">
                      <CodeIcon className="h-4 w-4" />
                      Installation
                    </Button>
                  </Link>
                  <Link href="/docs/components/button">
                    <Button variant="outline" className="gap-2 backdrop-blur-sm">
                      <ComponentInstanceIcon className="h-4 w-4" />
                      Voir les composants
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>
        <Footer/>
      </div>
    </main>
  );
}
