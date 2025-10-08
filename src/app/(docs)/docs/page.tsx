import React from "react";
import HeadingsSetter from "@/components/docs/HeadingsSetter";

export default function DocsPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "introduction", text: "Introduction", level: 1 },
          { id: "qu-est-ce-que-lumen-ui", text: "Qu'est-ce que Lumen UI ?", level: 2 },
          { id: "caracteristiques-cles", text: "Caractéristiques clés", level: 2 },
          { id: "pour-qui", text: "Pour qui ?", level: 2 },
          { id: "commencer", text: "Commencer", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="space-y-4">
          <h1 id="introduction" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Introduction
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bienvenue dans la documentation de Lumen UI, un système de design moderne pour créer
            des interfaces utilisateur élégantes et accessibles.
          </p>
        </div>

        <section className="space-y-4 text-sm">
          <h2 id="qu-est-ce-que-lumen-ui" className="scroll-m-20 text-xl font-semibold tracking-tight">
            Qu&apos;est-ce que Lumen UI ?
          </h2>
          <p className="text-muted-foreground leading-7">
            Lumen UI est un système de design complet qui fait le pont entre le design et le développement.
            Il fournit tout ce dont vous avez besoin pour construire de belles interfaces utilisateur accessibles et cohérentes.
          </p>

          <div className="space-y-2">
            <p className="text-muted-foreground leading-7">Notre système de design inclut :</p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Une bibliothèque complète de composants React pré-construits et accessibles</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Des tokens de design cohérents basés sur des principes de design éprouvés</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Une documentation complète et des guides d&apos;utilisation</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Des outils et utilitaires adaptés aux développeurs</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="caracteristiques-cles" className="scroll-m-20 text-xl font-semibold tracking-tight">
            Caractéristiques clés
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md border text-primary-foreground bg-primary flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl">Accessibilité d&apos;abord</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Construit avec la conformité WCAG 2.1 AA en tête. Tous les composants incluent les attributs ARIA appropriés et la navigation au clavier.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md text-primary-foreground bg-primary flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl">Hautement personnalisable</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Les variables CSS et l&apos;intégration Tailwind permettent des possibilités étendues de thématisation et de personnalisation.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md text-primary-foreground bg-primary flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl">Expérience développeur</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Support TypeScript, documentation complète et API intuitives rendent le développement un plaisir.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-lg border border-border bg-card">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md text-primary-foreground bg-primary flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl">Prêt pour la production</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Composants testés en production avec une couverture de tests complète.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 text-sm">
          <h2 id="pour-qui" className="scroll-m-20 text-xl font-semibold tracking-tight">
            Pour qui ?
          </h2>
          <p className="text-muted-foreground leading-7">
            Lumen UI est parfait pour les équipes et les individus qui souhaitent construire des applications React de haute qualité rapidement et efficacement :
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4 flex flex-col items-start space-y-1">
              <h3 className="font-semibold text-foreground text-xl">Développeurs Frontend</h3>
              <p className="text-sm text-muted-foreground my-0">
                Construisez des applications plus rapidement avec des composants pré-construits et testés qui suivent les meilleures pratiques.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4 flex flex-col items-start space-y-1">
              <h3 className="font-semibold text-foreground text-xl">Équipes Design</h3>
              <p className="text-sm text-muted-foreground my-0">
                Assurez la cohérence entre les produits avec un langage de design unifié et une bibliothèque de composants.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4 flex flex-col items-start space-y-1">
              <h3 className="font-semibold text-foreground text-xl">Équipes Produit</h3>
              <p className="text-sm text-muted-foreground my-0">
                Accélérez les cycles de développement et maintenez des expériences utilisateur de haute qualité.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="commencer" className="scroll-m-20 text-xl font-semibold tracking-tight">
            Commencer
          </h2>
          <p className="text-muted-foreground leading-7 text-sm">
            Prêt à commencer à construire avec Lumen UI ? Voici vos prochaines étapes :
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <a href="/docs/installation" className="group block p-6 rounded-lg border border-border bg-card hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors text-xl">Guide d&apos;installation</h3>
                  <p className="text-sm text-muted-foreground">Apprenez comment installer et configurer Lumen UI dans votre projet</p>
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
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Explorer les composants</h3>
                  <p className="text-sm text-muted-foreground">Parcourez notre bibliothèque de composants et voyez ce qui est disponible</p>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
