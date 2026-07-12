export function StatCardSkeleton() {
  return (
    <div className="glass-panel p-5">
      <div className="skeleton h-3 w-20" />
      <div className="skeleton mt-4 h-7 w-24" />
      <div className="skeleton mt-3 h-2 w-16" />
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-line-soft">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <div className="skeleton h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}

export function ChartSkeleton({ height = 260 }: { height?: number }) {
  return <div className="skeleton w-full" style={{ height }} />
}
