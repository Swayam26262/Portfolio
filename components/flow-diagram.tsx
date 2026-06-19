import { Fragment } from "react"
import { ChevronRight } from "lucide-react"

export type FlowNode = { label: string; sub?: string; accent?: boolean }
export type FlowLane = { title: string; tag?: string; nodes: FlowNode[] }

export function FlowDiagram({ lanes, note }: { lanes: FlowLane[]; note?: string }) {
  return (
    <div className="space-y-10">
      {lanes.map((lane) => (
        <div key={lane.title}>
          <div className="mb-4 flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-mute">
              {lane.title}
            </span>
            {lane.tag && (
              <span className="rounded-full border border-ink/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                {lane.tag}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
            {lane.nodes.map((node, i) => (
              <Fragment key={i}>
                <div
                  className={`flex-1 rounded-xl border p-3.5 transition-colors ${
                    node.accent
                      ? "border-signal bg-signal/10"
                      : "border-ink/15 bg-surface"
                  }`}
                >
                  <div className="font-display text-sm font-semibold leading-tight">{node.label}</div>
                  {node.sub && (
                    <div className="mt-1 font-mono text-[11px] leading-snug text-ink-mute">
                      {node.sub}
                    </div>
                  )}
                </div>
                {i < lane.nodes.length - 1 && (
                  <span className="flex shrink-0 items-center justify-center text-ink-mute">
                    <ChevronRight className="h-4 w-4 rotate-90 lg:rotate-0" />
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      ))}

      {note && (
        <p className="rounded-xl border border-ink/10 bg-sunken/60 p-4 font-mono text-xs leading-relaxed text-ink-soft">
          <span className="text-signal-deep dark:text-signal">{"// "}</span>
          {note}
        </p>
      )}
    </div>
  )
}
