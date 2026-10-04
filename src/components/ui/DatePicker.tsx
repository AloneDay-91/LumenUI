"use client";

import { format, isSameDay } from "date-fns";
import type { DateRange } from "@daypicker/react";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { cn } from "@/lib/utils";

const dateFormat = "MMM d, yyyy";

type DatePickerShared = {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
};

type DatePickerSingleProps = DatePickerShared & {
  mode?: "single";
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
};

type DatePickerRangeProps = DatePickerShared & {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
};

type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

function formatSingle(date: Date | undefined, placeholder: string) {
  return date ? format(date, dateFormat) : placeholder;
}

function formatRange(range: DateRange | undefined, placeholder: string) {
  if (!range?.from) return placeholder;
  if (!range.to || isSameDay(range.from, range.to))
    return format(range.from, dateFormat);
  return `${format(range.from, dateFormat)} – ${format(range.to, dateFormat)}`;
}

function DatePicker(props: DatePickerProps) {
  const { placeholder, disabled, className, id } = props;
  const [open, setOpen] = React.useState(false);
  const [singleState, setSingleState] = React.useState<Date | undefined>(
    props.mode === "range" ? undefined : props.defaultValue,
  );
  const [rangeState, setRangeState] = React.useState<DateRange | undefined>(
    props.mode === "range" ? props.defaultValue : undefined,
  );
  const controlled = "value" in props;

  if (props.mode === "range") {
    const range = controlled ? props.value : rangeState;
    const label = formatRange(range, placeholder ?? "Pick a range");

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={disabled}
          render={
            <Button
              id={id}
              variant="outline"
              disabled={disabled}
              className={cn(
                "min-w-52 justify-start font-normal",
                !range?.from && "text-muted-foreground",
                className,
              )}
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {label}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-3">
          <Calendar
            autoFocus
            mode="range"
            selected={range}
            onSelect={(next) => {
              if (!controlled) setRangeState(next);
              props.onValueChange?.(next);
              if (next?.from && next.to && !isSameDay(next.from, next.to))
                setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    );
  }

  const date = controlled ? props.value : singleState;
  const label = formatSingle(date, placeholder ?? "Pick a date");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            id={id}
            variant="outline"
            disabled={disabled}
            className={cn(
              "min-w-52 justify-start font-normal",
              !date && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {label}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-3">
        <Calendar
          autoFocus
          mode="single"
          selected={date}
          onSelect={(next) => {
            if (!controlled) setSingleState(next);
            props.onValueChange?.(next);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, type DatePickerProps };
