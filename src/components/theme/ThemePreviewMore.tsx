"use client";

import { useState, type ReactNode } from "react";
import { InfoIcon, PaperclipIcon, SparklesIcon } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/AvatarGroup";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Callout, CalloutIcon, CalloutText } from "@/components/ui/Callout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Message,
  MessageAvatar,
  MessageBody,
  MessageContent,
} from "@/components/ui/Message";
import { Meter } from "@/components/ui/Meter";
import { OTPField, OTPFieldInput, OTPFieldSeparator } from "@/components/ui/OTPField";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ui/PromptInput";
import { Rating } from "@/components/ui/Rating";
import { Stat, StatDelta, StatLabel, StatValue } from "@/components/ui/Stat";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@/components/ui/Stepper";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineSeparator,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/Timeline";

// A fixed month, so the server and the browser render the same grid.
const BOOKING_MONTH = new Date(2026, 11, 1);

const releases = [
  { title: "1.3.0 tagged", date: "2026-11-17", label: "17 Nov", text: "Blocks, versions, and a new default theme." },
  { title: "1.2.0 tagged", date: "2026-11-03", label: "3 Nov", text: "Components for AI apps." },
  { title: "1.1.0 tagged", date: "2026-10-29", label: "29 Oct", text: "First release through release-please." },
];

const steps = [
  { status: "complete", title: "Tokens", text: "Colors, type, and radius." },
  { status: "current", title: "Components", text: "Copy the files you need." },
  { status: "upcoming", title: "Ship", text: "Edit them in your repo." },
] as const;

function Column({ children }: { children: ReactNode }) {
  return <div className="flex min-w-0 flex-col gap-3">{children}</div>;
}

function AssistantCard() {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_auto]">
        <CardTitle>Assistant</CardTitle>
        <CardDescription>Ask about the components.</CardDescription>
        <Badge variant="secondary" className="col-start-2 row-span-2 row-start-1 self-start">
          <SparklesIcon />
          Beta
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Message from="user">
          <MessageBody>
            <MessageContent>Which components follow the radius token?</MessageContent>
          </MessageBody>
        </Message>
        <Message from="assistant">
          <MessageAvatar>
            <Avatar>
              <AvatarFallback>L</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageBody>
            <MessageContent>
              All of them. Change the radius on the left and every corner here
              scales from it.
            </MessageContent>
          </MessageBody>
        </Message>
        <PromptInput>
          <PromptInputTextarea aria-label="Message" placeholder="Ask a follow-up…" />
          <PromptInputToolbar>
            <Button variant="ghost" size="icon-sm" aria-label="Attach a file">
              <PaperclipIcon />
            </Button>
            <PromptInputSubmit />
          </PromptInputToolbar>
        </PromptInput>
      </CardContent>
    </Card>
  );
}

function ReleasesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Releases</CardTitle>
        <CardDescription>What shipped lately.</CardDescription>
      </CardHeader>
      <CardContent>
        <Timeline>
          {releases.map((release) => (
            <TimelineItem key={release.title}>
              <TimelineSeparator />
              <TimelineMarker />
              <TimelineContent>
                <TimelineTitle>{release.title}</TimelineTitle>
                <TimelineTime dateTime={release.date}>{release.label}</TimelineTime>
                <TimelineDescription>{release.text}</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

function VerifyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>Enter the six digits sent to you.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <OTPField length={6} defaultValue="4829">
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldSeparator />
          <OTPFieldInput />
          <OTPFieldInput />
          <OTPFieldInput />
        </OTPField>
        <p className="text-xs text-muted-foreground">
          No code? <Button variant="link" className="h-auto p-0 text-xs">Send it again</Button>
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Verify</Button>
      </CardFooter>
    </Card>
  );
}

function StatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>This week</CardTitle>
        <CardDescription>Installs and storage for your workspace.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Stat>
            <StatLabel>Installs</StatLabel>
            <StatValue>12,480</StatValue>
            <StatDelta trend="up">+8.2%</StatDelta>
          </Stat>
          <Stat>
            <StatLabel>Errors</StatLabel>
            <StatValue>31</StatValue>
            <StatDelta trend="down" intent="positive">−42%</StatDelta>
          </Stat>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Storage</span>
            <span className="font-medium tabular-nums">6.4 of 10 GB</span>
          </div>
          <Meter value={64} aria-label="Storage used" />
        </div>
      </CardContent>
    </Card>
  );
}

function OnboardingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get started</CardTitle>
        <CardDescription>Three steps to your first screen.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <StepperItem key={step.title} status={step.status}>
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperContent>
                <StepperTitle>{step.title}</StepperTitle>
                <StepperDescription>{step.text}</StepperDescription>
              </StepperContent>
            </StepperItem>
          ))}
        </Stepper>
      </CardContent>
    </Card>
  );
}

function BookingCard() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 11, 9));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book a call</CardTitle>
        <CardDescription>Pick a day for the design review.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={BOOKING_MONTH}
        />
      </CardContent>
    </Card>
  );
}

function HelpCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Questions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Callout>
          <CalloutIcon>
            <InfoIcon />
          </CalloutIcon>
          <CalloutText>The preset only changes tokens. Your components stay yours.</CalloutText>
        </Callout>
        <Accordion defaultValue={["files"]}>
          <AccordionItem value="files">
            <AccordionTrigger>Where do the files go?</AccordionTrigger>
            <AccordionPanel>
              Into components/ui. The CLI writes the source, you edit it.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="update">
            <AccordionTrigger>How do I update a component?</AccordionTrigger>
            <AccordionPanel>Run add again and review the diff before you keep it.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function FeedbackCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate this theme</CardTitle>
        <CardDescription>Your team reviewed it this week.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <Rating defaultValue={4} label="Theme rating" />
        <AvatarGroup aria-label="Reviewers">
          <Avatar>
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>LU</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <AvatarGroupCount count={4} />
        </AvatarGroup>
      </CardContent>
    </Card>
  );
}

/** Two more columns of the preview: AI, status, forms, and data components. */
export function ThemePreviewMore() {
  return (
    <>
      <Column>
        <AssistantCard />
        <ReleasesCard />
        <VerifyCard />
      </Column>
      <Column>
        <StatsCard />
        <OnboardingCard />
        <BookingCard />
        <HelpCard />
        <FeedbackCard />
      </Column>
    </>
  );
}
