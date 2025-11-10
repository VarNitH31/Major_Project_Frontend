'use client'

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse w-full rounded-lg bg-slate-300 dark:bg-slate-700/60 p-3">
      <div className="w-full h-40 bg-slate-400 dark:bg-slate-600 rounded-md mb-3" />
      <div className="h-3 bg-slate-400 dark:bg-slate-600 rounded w-3/4 mb-2" />
      <div className="h-3 bg-slate-400 dark:bg-slate-600 rounded w-1/2" />
    </div>
  )
}