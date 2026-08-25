// Doodle SVG playful — server-safe, tanpa state.
// Pakai sebagai dekor absolut di dalam container relative.

export function Star({ className = "", size = 28, ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden {...props}>
      <path
        d="M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z"
        fill="var(--color-yellow)"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScribbleArrow({ className = "", size = 64, ...props }) {
  return (
    <svg viewBox="0 0 80 60" width={size} height={size * 0.75} className={className} aria-hidden {...props}>
      <path
        d="M6 10 C 30 2 58 12 62 34"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <path
        d="M54 28 L63 37 L70 26"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bubbles({ className = "", size = 72, ...props }) {
  return (
    <svg viewBox="0 0 90 60" width={size} height={size * 0.66} className={className} aria-hidden {...props}>
      <circle cx="20" cy="38" r="14" fill="var(--color-blue)" stroke="var(--color-ink)" strokeWidth="2.5" />
      <circle cx="50" cy="22" r="9" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="2.5" />
      <circle cx="72" cy="42" r="7" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="2.5" />
      <circle cx="16" cy="33" r="4" fill="#fff" opacity="0.7" />
      <circle cx="47" cy="19" r="2.5" fill="#fff" opacity="0.7" />
    </svg>
  );
}

// Botol potion gede buat hero.
export function PotionBottle({ className = "", size = 210 }) {
  const body =
    "M88 74 C 40 96 28 150 44 192 C 58 228 142 228 156 192 C 172 150 160 96 112 74 Z";
  return (
    <svg viewBox="0 0 200 250" width={size} height={size * 1.25} className={className} aria-hidden>
      <defs>
        <clipPath id="potion-body">
          <path d={body} />
        </clipPath>
      </defs>
      {/* gabus */}
      <rect x="80" y="8" width="40" height="28" rx="7" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="4" />
      {/* leher */}
      <rect x="86" y="34" width="28" height="44" fill="#fff" stroke="var(--color-ink)" strokeWidth="4" />
      {/* badan */}
      <path d={body} fill="#fff" stroke="var(--color-ink)" strokeWidth="4" />
      {/* cairan */}
      <g clipPath="url(#potion-body)">
        <path
          d="M20 138 C 45 126 65 150 90 138 C 115 126 140 150 180 138 L 180 260 L 20 260 Z"
          fill="var(--color-purple)"
        />
        <circle cx="78" cy="170" r="7" fill="#fff" opacity="0.55" />
        <circle cx="108" cy="196" r="5" fill="#fff" opacity="0.55" />
        <circle cx="92" cy="214" r="4" fill="#fff" opacity="0.45" />
      </g>
      {/* kilau kaca */}
      <path d="M56 116 L 76 104" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
      <path d="M48 134 L 54 130" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
      {/* label */}
      <rect x="66" y="158" width="68" height="34" rx="6" fill="var(--color-yellow)" stroke="var(--color-ink)" strokeWidth="3" transform="rotate(-4 100 175)" />
      <text x="100" y="181" textAnchor="middle" fontSize="17" fontWeight="800" fontFamily="sans-serif" transform="rotate(-4 100 175)" fill="var(--color-ink)">
        ELIXIR
      </text>
    </svg>
  );
}

// Ilustrasi empty-state.
export function CameraDoodle({ size = 110 }) {
  return (
    <svg viewBox="0 0 120 90" width={size} height={size * 0.75} aria-hidden>
      <rect x="14" y="24" width="92" height="56" rx="10" fill="#fff" stroke="var(--color-ink)" strokeWidth="4" />
      <path d="M42 24 L48 12 L72 12 L78 24 Z" fill="var(--color-yellow)" stroke="var(--color-ink)" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="60" cy="52" r="17" fill="var(--color-blue)" stroke="var(--color-ink)" strokeWidth="4" />
      <circle cx="54" cy="46" r="5" fill="#fff" opacity="0.8" />
      <rect x="88" y="32" width="10" height="7" rx="2" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="2.5" />
    </svg>
  );
}

export function TrophyDoodle({ size = 110 }) {
  return (
    <svg viewBox="0 0 120 100" width={size} height={size * 0.83} aria-hidden>
      <path
        d="M38 14 H82 V38 C82 54 73 64 60 64 C47 64 38 54 38 38 Z"
        fill="var(--color-yellow)"
        stroke="var(--color-ink)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M38 22 H24 C24 40 30 48 42 50" fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
      <path d="M82 22 H96 C96 40 90 48 78 50" fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
      <rect x="52" y="64" width="16" height="14" fill="var(--color-ink)" />
      <rect x="38" y="78" width="44" height="12" rx="4" fill="var(--color-purple)" stroke="var(--color-ink)" strokeWidth="4" />
      <path d="M52 30 l5 8 9 1 -6.5 6 1.5 9 -8-4.5 -8 4.5 1.5-9 -6.5-6 9-1 z" fill="#fff" stroke="var(--color-ink)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
