"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import Highlight, { defaultProps } from "prism-react-renderer";
import lightTheme from "prism-react-renderer/themes/github";
import darkTheme from "prism-react-renderer/themes/nightOwl";

interface CodeBlockProps {
  code: string;
  vueCode?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, vueCode, language = "tsx", filename, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const [framework, setFramework] = React.useState<"react" | "vue">(() => {
    // valeur par défaut : déduire du language si possible
    if (language?.toLowerCase().includes("vue")) return "vue";
    return "react";
  });

  // Alias pour éviter l'avertissement d'usage
  const showLines = !!showLineNumbers;

  // --- Prism theme dynamique ---
  const resolvePrismTheme = React.useCallback(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light") return lightTheme;
      if (saved === "dark") return darkTheme;
      // system or unset -> check document class or prefers-color-scheme
      if (typeof window !== "undefined") {
        const isDarkClass = document.documentElement.classList.contains("dark");
        if (isDarkClass) return darkTheme;
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? darkTheme : lightTheme;
      }
    } catch (e) {
      // fallback
    }
    return lightTheme;
  }, []);

  // Start with the light theme at render time (server and initial client render) to avoid
  // hydration mismatches. On mount we resolve the real theme (localStorage / class / system)
  // and update it; that's safe because it happens after hydration.
  const [prismTheme, setPrismTheme] = React.useState(() => lightTheme);

  React.useEffect(() => {
    // Set the real theme on mount (client only). Doing this inside useEffect avoids
    // running `resolvePrismTheme` during server rendering or initial hydration.
    setPrismTheme(resolvePrismTheme());

    // Update theme when relevant things change: storage, prefers-color-scheme, or class on documentElement
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        setPrismTheme(resolvePrismTheme());
      }
    };
    window.addEventListener("storage", onStorage);

    let mql: MediaQueryList | null = null;
    const onMediaChange = () => {
      // Only update if user selected "system" or didn't set an explicit theme
      const saved = localStorage.getItem("theme");
      if (!saved || saved === "system") {
        setPrismTheme(resolvePrismTheme());
      }
    };
    if (window.matchMedia) {
      mql = window.matchMedia("(prefers-color-scheme: dark)");
      try {
        mql.addEventListener("change", onMediaChange);
      } catch (e) {
        // Safari
        mql.addListener(onMediaChange as any);
      }
    }

    // Observe class changes on documentElement (ThemeToggle toggles the `dark` class)
    const observer = new MutationObserver((mutations) => {
      for (const mut of mutations) {
        if (mut.type === "attributes" && (mut as MutationRecord).attributeName === "class") {
          setPrismTheme(resolvePrismTheme());
          break;
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("storage", onStorage);
      if (mql) {
        try {
          mql.removeEventListener("change", onMediaChange);
        } catch (e) {
          mql.removeListener(onMediaChange as any);
        }
      }
      observer.disconnect();
    };
  }, [resolvePrismTheme]);

  // --- Persister la selection par filename (si fourni) ou globalement ---
  React.useEffect(() => {
    try {
      const key = filename ? `lumenui_code_framework:${filename}` : `lumenui_code_framework`;
      const saved = localStorage.getItem(key);
      if (saved === "react" || saved === "vue") setFramework(saved as "react" | "vue");
    } catch (e) {
      // ignore localStorage errors on SSR or privacy modes
    }
  }, [filename]);

  const persistFramework = (fw: "react" | "vue") => {
    try {
      const key = filename ? `lumenui_code_framework:${filename}` : `lumenui_code_framework`;
      localStorage.setItem(key, fw);
    } catch (e) {}
  };

  const currentCode = framework === "vue" && vueCode ? vueCode : code;
  // displayLanguage: texte montré dans l'entête (ex: 'vue' ou 'tsx')
  const displayLanguage = framework === "vue" ? "vue" : language;
  // highlightLanguage: langage passé à prism-react-renderer. Prism n'inclut pas
  // forcément un tokenizer 'vue' SFC, utiliser 'markup' (html) pour les fichiers Vue
  const highlightLanguage = framework === "vue" ? "markup" : language;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSetFramework = (fw: "react" | "vue") => {
    setFramework(fw);
    persistFramework(fw);
  };

  // expose plain colors for header styling
  const themePlain = (prismTheme as any)?.plain || {};

  // If vueCode is a SFC, split it into template and script parts for better highlighting
  const parseVueSFC = (sfc: string) => {
    try {
      const templateMatch = sfc.match(/<template[^>]*>([\s\S]*?)<\/template>/i);
      const scriptMatch = sfc.match(/<script(?:[^>]*lang=["'](ts|js|tsx|jsx)["'][^>]*)?[^>]*>([\s\S]*?)<\/script>/i);
      return {
        template: templateMatch ? templateMatch[1].trim() : null,
        script: scriptMatch ? scriptMatch[2].trim() : null,
        scriptLang: scriptMatch && scriptMatch[1] ? scriptMatch[1].toLowerCase() : null,
      };
    } catch (e) {
      return { template: null, script: null, scriptLang: null };
    }
  };

  const vueSFC = framework === "vue" && vueCode ? parseVueSFC(vueCode) : null;

  return (
    <div className="relative rounded-lg border border-border overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-transparent" style={{ color: themePlain.color }}>
          <span className="text-xs font-mono text-muted-foreground" style={{ color: themePlain.color }}>{filename}</span>
          <div className="flex items-center gap-2">
            {vueCode && (
              <div className="flex items-center gap-1 border border-border rounded-md">
                <button
                  onClick={() => handleSetFramework("react")}
                  aria-pressed={framework === "react"}
                  title="Afficher l'exemple React"
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    framework === "react"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  React
                </button>
                <button
                  onClick={() => handleSetFramework("vue")}
                  aria-pressed={framework === "vue"}
                  title="Afficher l'exemple Vue"
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    framework === "vue"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Vue
                </button>
              </div>
            )}
            <span className="text-xs text-muted-foreground">{displayLanguage}</span>
          </div>
        </div>
      )}
      <div className="relative">
        {vueSFC && (vueSFC.template || vueSFC.script) ? (
          <div>
            {vueSFC.template && (
              <Highlight {...defaultProps} theme={prismTheme} code={vueSFC.template} language={"markup" as any}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => {
                  const plain = (prismTheme && (prismTheme as any).plain) || {};
                  const preStyle = { ...style, backgroundColor: plain.backgroundColor, color: plain.color } as React.CSSProperties;
                  return (
                    <pre className={`${className} p-4 m-0 overflow-x-auto border-none text-sm font-mono rounded-none`} style={preStyle}>
                      {tokens.map((line, i) => {
                        const rawLineProps = getLineProps({ line, key: i }) as Record<string, any>;
                        const { key: _lineKey, ...linePropsWithoutKey } = rawLineProps;
                        return (
                          <div key={i} {...linePropsWithoutKey} className="flex">
                            {showLines && (
                              <span className="pr-4 text-xs select-none text-muted-foreground font-mono text-right w-12">
                                {i + 1}
                              </span>
                            )}
                            <div className="flex-1">
                              {line.map((token, tokenIndex) => {
                                const rawTokenProps = getTokenProps({ token, key: tokenIndex }) as Record<string, any>;
                                const { key: _tokenKey, ...tokenPropsWithoutKey } = rawTokenProps;
                                return <span key={tokenIndex} {...tokenPropsWithoutKey} />;
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </pre>
                  );
                }}
              </Highlight>
            )}

            {vueSFC.script && (
              <Highlight {...defaultProps} theme={prismTheme} code={vueSFC.script} language={(vueSFC.scriptLang && (vueSFC.scriptLang.startsWith("ts") ? "tsx" : "javascript")) as any}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => {
                  const plain = (prismTheme && (prismTheme as any).plain) || {};
                  const preStyle = { ...style, backgroundColor: plain.backgroundColor, color: plain.color } as React.CSSProperties;
                  return (
                    <pre className={`${className} p-4 m-0 overflow-x-auto border-none text-sm font-mono rounded-none`} style={preStyle}>
                      {tokens.map((line, i) => {
                        const rawLineProps = getLineProps({ line, key: i }) as Record<string, any>;
                        const { key: _lineKey, ...linePropsWithoutKey } = rawLineProps;
                        return (
                          <div key={i} {...linePropsWithoutKey} className="flex">
                            {showLines && (
                              <span className="pr-4 text-xs select-none text-muted-foreground font-mono text-right w-12">
                                {i + 1}
                              </span>
                            )}
                            <div className="flex-1">
                              {line.map((token, tokenIndex) => {
                                const rawTokenProps = getTokenProps({ token, key: tokenIndex }) as Record<string, any>;
                                const { key: _tokenKey, ...tokenPropsWithoutKey } = rawTokenProps;
                                return <span key={tokenIndex} {...tokenPropsWithoutKey} />;
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </pre>
                  );
                }}
              </Highlight>
            )}
          </div>
        ) : (
          <Highlight {...defaultProps} theme={prismTheme} code={currentCode.trimEnd()} language={(highlightLanguage || "tsx") as any}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => {
              const plain = (prismTheme && (prismTheme as any).plain) || {};
              const preStyle = { ...style, backgroundColor: plain.backgroundColor, color: plain.color } as React.CSSProperties;
              return (
                <pre className={`${className} p-4 m-0 overflow-x-auto border-none text-sm font-mono rounded-none`} style={preStyle}>
                  {tokens.map((line, i) => {
                    const rawLineProps = getLineProps({ line, key: i }) as Record<string, any>;
                    // retirer la clé potentielle renvoyée par getLineProps pour éviter de la spread
                    const { key: _lineKey, ...linePropsWithoutKey } = rawLineProps;
                    return (
                      <div key={i} {...linePropsWithoutKey} className="flex">
                        {showLines && (
                          <span className="pr-4 text-xs select-none text-muted-foreground font-mono text-right w-12">
                            {i + 1}
                          </span>
                        )}
                        <div className="flex-1">
                          {line.map((token, tokenIndex) => {
                            const rawTokenProps = getTokenProps({ token, key: tokenIndex }) as Record<string, any>;
                            const { key: _tokenKey, ...tokenPropsWithoutKey } = rawTokenProps;
                            return <span key={tokenIndex} {...tokenPropsWithoutKey} />;
                          })}
                        </div>
                      </div>
                    );
                  })}
                </pre>
              );
            }}
          </Highlight>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2"
          title={copied ? "Copié !" : "Copier le code"}
        >
          {copied ? (
            <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
}
