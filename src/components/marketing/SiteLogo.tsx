import Link from "next/link";

export function SiteLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Lumen UI"
      className="inline-flex items-center"
    >
      <svg
        viewBox="0 -10 682.5 120"
        fill="currentColor"
        aria-hidden="true"
        className="h-[18px] w-[102.4px] shrink-0 overflow-visible"
      >
        <use href="#lumen-lockup" />
      </svg>
    </Link>
  );
}
