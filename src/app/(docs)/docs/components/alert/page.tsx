import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function AlertPage() {
  const componentCode = `import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning: "border-yellow-500/50 text-yellow-900 bg-yellow-50 dark:bg-yellow-950/20 dark:text-yellow-200 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        success: "border-green-500/50 text-green-900 bg-green-50 dark:bg-green-950/20 dark:text-green-200 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        info: "border-blue-500/50 text-blue-900 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-200 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };`;

  const componentCodeVue = `<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

interface AlertProps {
  variant?: 'default' | 'destructive' | 'warning' | 'success' | 'info';
  class?: string;
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'default'
});

const alertClass = computed(() => {
  const baseClass = "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground";
  
  const variants = {
    default: "bg-background text-foreground",
    destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
    warning: "border-yellow-500/50 text-yellow-900 bg-yellow-50 dark:bg-yellow-950/20 dark:text-yellow-200 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
    success: "border-green-500/50 text-green-900 bg-green-50 dark:bg-green-950/20 dark:text-green-200 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
    info: "border-blue-500/50 text-blue-900 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-200 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400"
  };
  
  return cn(baseClass, variants[props.variant], props.class);
});
</script>

<template>
  <div role="alert" :class="alertClass">
    <slot />
  </div>
</template>`;

  const usageCode = `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

export default function Example() {
  return (
    <Alert>
      <AlertTitle>Titre de l'alerte</AlertTitle>
      <AlertDescription>
        Ceci est un exemple de description pour votre alerte.
      </AlertDescription>
    </Alert>
  );
}`;

  const usageCodeVue = `<script setup lang="ts">
import Alert from '@/components/ui/Alert.vue';
import AlertTitle from '@/components/ui/AlertTitle.vue';
import AlertDescription from '@/components/ui/AlertDescription.vue';
</script>

<template>
  <Alert>
    <AlertTitle>Titre de l'alerte</AlertTitle>
    <AlertDescription>
      Ceci est un exemple de description pour votre alerte.
    </AlertDescription>
  </Alert>
</template>`;

  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "alert", text: "Alert", level: 1 },
          { id: "installation", text: "Installation", level: 2 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "variants", text: "Variantes", level: 2 },
          { id: "api-reference", text: "Référence API", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Composants</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Alert</span>
        </div>

        <div className="space-y-4">
          <h1 id="alert" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Alert
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un composant d'alerte polyvalent pour afficher des messages importants avec différents niveaux de sévérité.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-8">
            <Alert>
              <AlertTitle>Titre de l'alerte</AlertTitle>
              <AlertDescription>
                Ceci est un exemple de description pour votre alerte.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <section className="space-y-4">
          <h2 id="installation" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Installation
          </h2>
          <p className="text-muted-foreground leading-7">
            Copiez et collez le code suivant dans votre projet :
          </p>

          <CodeBlock
            code={componentCode}
            vueCode={componentCodeVue}
            filename="components/ui/Alert.tsx"
            language="tsx"
          />
        </section>

        <section className="space-y-4">
          <h2 id="usage" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Utilisation
          </h2>

          <CodeBlock
            code={usageCode}
            vueCode={usageCodeVue}
            filename="app/page.tsx"
            language="tsx"
          />
        </section>

        <section className="space-y-4">
          <h2 id="variants" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Variantes
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Default</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Alert>
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Ceci est une alerte standard pour afficher des informations générales.
                  </AlertDescription>
                </Alert>
              </div>
              <CodeBlock
                code={`<Alert>
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Ceci est une alerte standard pour afficher des informations générales.
  </AlertDescription>
</Alert>`}
                vueCode={`<Alert>
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Ceci est une alerte standard pour afficher des informations générales.
  </AlertDescription>
</Alert>`}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Info</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Alert variant="info">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <AlertTitle>Bon à savoir</AlertTitle>
                  <AlertDescription>
                    Cette fonctionnalité est disponible dans la version premium de l'application.
                  </AlertDescription>
                </Alert>
              </div>
              <CodeBlock
                code={`<Alert variant="info">
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
  <AlertTitle>Bon à savoir</AlertTitle>
  <AlertDescription>
    Cette fonctionnalité est disponible dans la version premium de l'application.
  </AlertDescription>
</Alert>`}
                vueCode={`<Alert variant="info">
  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
  </svg>
  <AlertTitle>Bon à savoir</AlertTitle>
  <AlertDescription>
    Cette fonctionnalité est disponible dans la version premium de l'application.
  </AlertDescription>
</Alert>`}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Success</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Alert variant="success">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <AlertTitle>Opération réussie</AlertTitle>
                  <AlertDescription>
                    Votre profil a été mis à jour avec succès.
                  </AlertDescription>
                </Alert>
              </div>
              <CodeBlock
                code={`<Alert variant="success">
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
  <AlertTitle>Opération réussie</AlertTitle>
  <AlertDescription>
    Votre profil a été mis à jour avec succès.
  </AlertDescription>
</Alert>`}
                vueCode={`<Alert variant="success">
  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" :stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  <AlertTitle>Opération réussie</AlertTitle>
  <AlertDescription>
    Votre profil a été mis à jour avec succès.
  </AlertDescription>
</Alert>`}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Warning</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Alert variant="warning">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <AlertTitle>Attention requise</AlertTitle>
                  <AlertDescription>
                    Certaines fonctionnalités seront désactivées pendant la maintenance programmée.
                  </AlertDescription>
                </Alert>
              </div>
              <CodeBlock
                code={`<Alert variant="warning">
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
  <AlertTitle>Attention requise</AlertTitle>
  <AlertDescription>
    Certaines fonctionnalités seront désactivées pendant la maintenance programmée.
  </AlertDescription>
</Alert>`}
                vueCode={`<Alert variant="warning">
  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" :stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
  <AlertTitle>Attention requise</AlertTitle>
  <AlertDescription>
    Certaines fonctionnalités seront désactivées pendant la maintenance programmée.
  </AlertDescription>
</Alert>`}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Destructive</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Alert variant="destructive">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <AlertTitle>Erreur critique</AlertTitle>
                  <AlertDescription>
                    Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.
                  </AlertDescription>
                </Alert>
              </div>
              <CodeBlock
                code={`<Alert variant="destructive">
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
  <AlertTitle>Erreur critique</AlertTitle>
  <AlertDescription>
    Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.
  </AlertDescription>
</Alert>`}
                vueCode={`<Alert variant="destructive">
  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" :stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
  <AlertTitle>Erreur critique</AlertTitle>
  <AlertDescription>
    Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.
  </AlertDescription>
</Alert>`}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="api-reference" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Référence API
          </h2>

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Composant</th>
                  <th className="text-left p-4 font-semibold">Prop</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Défaut</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">Alert</td>
                  <td className="p-4 font-mono text-sm">variant</td>
                  <td className="p-4 font-mono text-sm">
                    &quot;default&quot; | &quot;destructive&quot; | &quot;warning&quot; | &quot;success&quot; | &quot;info&quot;
                  </td>
                  <td className="p-4 font-mono text-sm">&quot;default&quot;</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">AlertTitle</td>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">ReactNode</td>
                  <td className="p-4 font-mono text-sm">-</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">AlertDescription</td>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">ReactNode</td>
                  <td className="p-4 font-mono text-sm">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Alert variant="default">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <AlertTitle>Accessibilité</AlertTitle>
          <AlertDescription>
            Le composant Alert inclut les attributs ARIA appropriés (role=&quot;alert&quot;) pour les lecteurs d&apos;écran.
            Les icônes sont décoratives et n&apos;interfèrent pas avec le contenu du message.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
