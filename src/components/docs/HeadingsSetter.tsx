"use client";
import { useEffect } from "react";
import { useDocsTOC } from "./DocsTOCContext";
import type { Heading } from "./DocsTOCContext";

export default function HeadingsSetter({ headings }: { headings: Heading[] }) {
  const { setHeadings } = useDocsTOC();

  useEffect(() => {
    setHeadings(headings || []);
  }, [headings, setHeadings]);

  return null;
}
