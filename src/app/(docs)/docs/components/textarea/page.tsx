import React from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function TextareaPage() {
	const componentCode = `import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }`;

	const usageCode = `import { Textarea } from "@/components/ui/Textarea";

export default function Example() {
  return <Textarea placeholder="Tapez votre message ici..." />;
}`;

	return (
		<>
			<HeadingsSetter
				headings={[
					{ id: "textarea", text: "Textarea", level: 1 },
					{ id: "installation", text: "Installation", level: 2 },
					{ id: "usage", text: "Utilisation", level: 2 },
					{ id: "examples", text: "Exemples", level: 2 },
				]}
			/>

			<div className="space-y-8">
				<div className="flex items-center space-x-1 text-sm text-muted-foreground">
					<span>Composants</span>
					<span className="inline-block h-4 w-px bg-muted-foreground/20" />
					<span className="font-medium text-foreground">Textarea</span>
				</div>

				<div className="space-y-4">
					<h1 id="textarea" className="scroll-m-20 text-4xl font-bold tracking-tight">
						Textarea
					</h1>
					<p className="text-xl text-muted-foreground leading-relaxed">
						Un composant textarea pour saisir du texte multiligne.
					</p>
				</div>

				<div className="space-y-4">
					<div className="rounded-lg border border-border bg-card p-8">
						<Textarea placeholder="Tapez votre message ici..." className="max-w-md" />
					</div>
				</div>

				<section className="space-y-4">
					<h2 id="installation" className="scroll-m-20 text-3xl font-semibold tracking-tight">
						Installation
					</h2>
					<p className="text-muted-foreground leading-7">
						Copiez et collez le code suivant dans votre projet :
					</p>

					<CodeBlock code={componentCode} filename="components/ui/Textarea.tsx" language="tsx" />
				</section>

				<section className="space-y-4">
					<h2 id="usage" className="scroll-m-20 text-3xl font-semibold tracking-tight">
						Utilisation
					</h2>

					<CodeBlock code={usageCode} filename="app/page.tsx" language="tsx" />
				</section>

				<section className="space-y-4">
					<h2 id="examples" className="scroll-m-20 text-3xl font-semibold tracking-tight">
						Exemples
					</h2>

					<div className="space-y-6">
						<div className="space-y-3">
							<h3 className="text-lg font-semibold">Avec Label</h3>
							<div className="rounded-lg border border-border bg-card p-6">
								<div className="space-y-2 max-w-md">
									<Label htmlFor="message">Votre message</Label>
									<Textarea id="message" placeholder="Tapez votre message ici..." />
								</div>
							</div>
							<CodeBlock code={`<div className="space-y-2">
  <Label htmlFor="message">Votre message</Label>
  <Textarea id="message" placeholder="Tapez votre message ici..." />
</div>`} />
						</div>

						<div className="space-y-3">
							<h3 className="text-lg font-semibold">Désactivé</h3>
							<div className="rounded-lg border border-border bg-card p-6">
								<Textarea disabled placeholder="Ce champ est désactivé" className="max-w-md" />
							</div>
							<CodeBlock code={`<Textarea disabled placeholder="Ce champ est désactivé" />`} />
						</div>

						<div className="space-y-3">
							<h3 className="text-lg font-semibold">Avec hauteur personnalisée</h3>
							<div className="rounded-lg border border-border bg-card p-6">
								<Textarea className="min-h-[200px] max-w-md" placeholder="Un textarea plus grand..." />
							</div>
							<CodeBlock code={`<Textarea className="min-h-[200px]" placeholder="Un textarea plus grand..." />`} />
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
