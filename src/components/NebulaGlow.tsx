/**
 * Soft blurred blue glow blobs behind the starfield, giving the background
 * a bit of nebula/smoke atmosphere instead of flat black + dots.
 */
export function NebulaGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-accent-600/25 blur-[130px]" />
      <div className="absolute -bottom-52 -right-40 h-[550px] w-[550px] rounded-full bg-accent-700/20 blur-[130px]" />
      <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[130px]" />
    </div>
  )
}
