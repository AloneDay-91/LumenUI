"use client";
import { createContext, useContext, useState } from "react";

type Heading = { id: string; text: string; level: number };

type TOCContextValue = {
  headings: Heading[];
  setHeadings: (h: Heading[]) => void;
};

const DocsTOCContext = createContext<TOCContextValue>({
  headings: [],
  setHeadings: () => {},
});
export default function DocsTOCProvider({ children }: { children: React.ReactNode }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  return (
    <DocsTOCContext.Provider value={{ headings, setHeadings }}>{children}</DocsTOCContext.Provider>
  );
}

export function useDocsTOC() {
  return useContext(DocsTOCContext);
}

export type { Heading };
