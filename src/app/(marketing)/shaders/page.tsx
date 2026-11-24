import type { Metadata } from "next"
import { Suspense } from "react"

import { ShadersWorkspace } from "@/components/shaders/ShadersWorkspace"
import { AspectRatio } from "@/components/ui/AspectRatio"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Container } from "@/components/ui/Container"
import { Skeleton } from "@/components/ui/Skeleton"
import { Stack } from "@/components/ui/Stack"
import { LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Shaders",
  description:
    "Browse real-time WebGL shaders, customize colors and uniforms, or create your own procedural gradients and GLSL effects.",
}

function ShadersSkeleton() {
  return (
    <Stack gap="xl">
      <Stack align="center" gap="sm" className="pt-4">
        <Skeleton className="h-5 w-48 rounded-full" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-4 w-80 rounded-full" />
      </Stack>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} size="sm" className="gap-3 p-2.5">
            <CardContent className="p-0">
              <AspectRatio ratio={4 / 4.15}>
                <Skeleton className="size-full rounded-[min(var(--radius-3xl),18px)]" />
              </AspectRatio>
            </CardContent>
            <CardHeader className="gap-2 px-2 pt-0 pb-1">
              <Skeleton className="h-4 w-32 rounded-full" />
              <Skeleton className="h-3 w-48 rounded-full" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </Stack>
  )
}

export default function ShadersPage() {
  return (
    <Container
      render={<main id="content" />}
      size="full"
      padding="wide"
      className={cn("flex flex-1 flex-col pt-4 pb-16", LANDING_MAX_WIDTH)}
    >
      <Suspense fallback={<ShadersSkeleton />}>
        <ShadersWorkspace />
      </Suspense>
    </Container>
  )
}
