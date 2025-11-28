'use client'

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse w-full rounded-lg bg-white border border-[#E2E8F0] p-3 shadow-sm">
      <div className="w-full h-40 bg-[#E2E8F0] rounded-md mb-3" />
      <div className="h-3 bg-[#E2E8F0] rounded w-3/4 mb-2" />
      <div className="h-3 bg-[#E2E8F0] rounded w-1/2" />
    </div>
  )
}
