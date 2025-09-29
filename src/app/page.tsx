import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-12">
      <div className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Lumen UI
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Un système de design inspiré par Medusa.js, construit avec Next.js et Tailwind CSS.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button>Commencer</Button>
          <Button variant="secondary">GitHub</Button>
        </div>
      </div>
    </main>
  );
}
