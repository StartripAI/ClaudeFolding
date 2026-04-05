type ScrollIconProps = {
  className?: string;
};

export function ScrollIcon({ className }: ScrollIconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="10"
        y="8"
        width="20"
        height="24"
        rx="4"
        fill="rgba(212,168,83,0.12)"
        stroke="rgba(212,168,83,0.55)"
      />
      <circle
        cx="10"
        cy="16"
        r="5"
        fill="rgba(212,168,83,0.18)"
        stroke="rgba(212,168,83,0.55)"
      />
      <circle
        cx="30"
        cy="24"
        r="5"
        fill="rgba(212,168,83,0.18)"
        stroke="rgba(212,168,83,0.55)"
      />
      <path
        d="M16 15H24M16 20H24M16 25H22"
        stroke="rgba(232,232,232,0.85)"
        strokeLinecap="round"
      />
    </svg>
  );
}
