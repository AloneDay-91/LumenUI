"use client"

import { ArrowRightIcon, BellIcon, SearchIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/AvatarGroup"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Kbd } from "@/components/ui/Kbd"
import { Label } from "@/components/ui/Label"
import { Progress } from "@/components/ui/Progress"
import { Separator } from "@/components/ui/Separator"
import { Stat, StatDelta, StatLabel, StatValue } from "@/components/ui/Stat"
import { Switch } from "@/components/ui/Switch"
import { cn } from "@/lib/utils"

/**
 * A screenful of real Lumen components, laid out like a product: the picture
 * Portal Intro opens onto and the window Capture Reveal photographs.
 */
export function LumenMosaic({ className, progress = 64 }: { className?: string; progress?: number }) {
  return (
    <div className={cn("flex size-full flex-col gap-3 bg-background p-4", className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input readOnly tabIndex={-1} placeholder="Search components…" className="ps-8" />
        </div>
        <Kbd>⌘K</Kbd>
        <Button variant="outline" size="icon" tabIndex={-1} aria-label="Notifications">
          <BellIcon />
        </Button>
        <Avatar className="size-8">
          <AvatarFallback>EB</AvatarFallback>
        </Avatar>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-3">
        <Card size="sm">
          <CardContent className="flex flex-col gap-3">
            <Stat>
              <StatLabel>Monthly revenue</StatLabel>
              <StatValue>$48,210</StatValue>
              <StatDelta trend="up">12.4%</StatDelta>
            </Stat>
            <Progress value={progress} aria-label="Goal" />
            <span className="text-xs text-muted-foreground">{progress}% of the quarter goal</span>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Welcome back to your workspace.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input readOnly tabIndex={-1} defaultValue="ada@lumen.dev" />
            <Button tabIndex={-1} className="w-full">
              Continue <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Team</CardTitle>
            <CardDescription>4 members, 2 pending.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <AvatarGroup>
              {["AL", "GH", "KJ"].map((initials) => (
                <Avatar key={initials}>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount count={2} />
            </AvatarGroup>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              Notifications
              <Switch defaultChecked tabIndex={-1} aria-label="Notifications" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center gap-2">
        <Button tabIndex={-1} size="sm">Deploy</Button>
        <Button tabIndex={-1} size="sm" variant="secondary">Preview</Button>
        <Button tabIndex={-1} size="sm" variant="outline">Share</Button>
        <Button tabIndex={-1} size="sm" variant="ghost">Cancel</Button>
        <div className="ms-auto flex gap-1.5">
          <Badge color="jade">Live</Badge>
          <Badge color="indigo">Beta</Badge>
          <Badge color="orange">3 drafts</Badge>
        </div>
      </div>
    </div>
  )
}
