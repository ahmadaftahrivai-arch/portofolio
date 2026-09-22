interface LightningBoltProps {
  className?: string
}

/**
 * Hand-authored jagged bolt path, animated with a stroke dash "draw-in" +
 * looping glow pulse. Pure SVG/CSS, no external image or generated asset.
 */
export function LightningBolt({ className = '' }: LightningBoltProps) {
  return (
    <svg
      viewBox="0 0 220 560"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="bolt-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M150 0 L96 150 L136 158 L60 300 L104 308 L34 470 L78 478 L20 560
           M136 158 L170 170 L120 260"
        stroke="#93c5fd"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#bolt-glow)"
        pathLength={1}
        className="bolt-path"
      />
      <style>{`
        .bolt-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation:
            bolt-draw 1.2s ease-out forwards,
            bolt-pulse 2.2s ease-in-out 1.2s infinite;
        }
        @keyframes bolt-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes bolt-pulse {
          0%, 100% { opacity: 0.7; filter: url(#bolt-glow) brightness(1); }
          50% { opacity: 1; filter: url(#bolt-glow) brightness(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bolt-path {
            animation: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  )
}
