import type { Project } from '../data/types'
import { Placeholder } from './ui/Placeholder'
import { ExternalLinkIcon } from './icons'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40 hover:shadow-[0_12px_30px_rgba(37,99,235,0.15)]">
      <div className="aspect-video w-full overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Placeholder
            className="h-full w-full rounded-none border-0"
            label="Screenshot belum diisi"
            hint={`imageUrl di data/projects.ts (${project.id})`}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold text-ink-100">{project.title}</h3>
          <p className="mt-1 text-sm text-ink-500">{project.summary}</p>
        </div>

        {project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-ink-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-3 pt-2 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-accent-400 hover:text-accent-300"
            >
              Live <ExternalLinkIcon width={14} height={14} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-ink-300 hover:text-ink-100"
            >
              Code <ExternalLinkIcon width={14} height={14} />
            </a>
          )}
          {!project.liveUrl && !project.repoUrl && (
            <span className="text-xs text-ink-500">liveUrl / repoUrl belum diisi</span>
          )}
        </div>
      </div>
    </div>
  )
}
