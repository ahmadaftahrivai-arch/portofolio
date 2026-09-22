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
      viewBox="0 0 200 500"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="bolt-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M120 0 L60 190 L110 200 L40 340 L95 350 L20 500"
        stroke="#60a5fa"
        strokeWidth="6"
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
            bolt-draw 1.1s ease-out forwards,
            bolt-pulse 2.4s ease-in-out 1.1s infinite;
        }
        @keyframes bolt-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes bolt-pulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
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
