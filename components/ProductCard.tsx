'use client'

import React from 'react'

interface Product {
  name: string
  url: string
  index?: number
}

interface ProductCardProps {
  product: Product
  index: number
  score?: number
  text_weight?: number
  image_weight?: number
  selectedIndex?: number
  onClick: (index: number) => void
}

export default function ProductCard({
  product,
  index,
  selectedIndex,
  onClick,
  score,
  text_weight,
  image_weight,
}: ProductCardProps) {
  const isSelected = selectedIndex !== undefined && selectedIndex > -1

  return (
    <div
      className={`
        group relative w-full rounded-lg overflow-hidden cursor-pointer
        bg-white border border-[#E2E8F0] shadow-sm 
        hover:shadow-md transition-all duration-200
        ${isSelected ? 'ring-2 ring-[#0EA5E9] shadow-md' : ''}
      `}
      onClick={() => onClick(index)}
      aria-label={`Select ${product.name}`}
    >
      {/* Image area */}
      <div className="w-full h-48 flex items-center justify-center bg-white">
        <img
          src={product.url}
          alt={product.name}
          className="max-h-44 object-contain px-3"
        />
      </div>

      {/* Selection badge */}
      {isSelected && (
        <span className="
          absolute top-3 right-3 
          bg-[#0EA5E9] text-white text-xs font-semibold 
          rounded-full w-6 h-6 flex items-center justify-center shadow
        ">
          {selectedIndex! + 1}
        </span>
      )}

      {/* hover / selection overlay */}
      <div
        className={`
          absolute inset-0 pointer-events-none transition-opacity duration-200
          ${isSelected ? 'opacity-20 bg-[#0EA5E9]/20' : 'group-hover:opacity-10 bg-black/5'}
        `}
      />

      {/* Content */}
      <div className="px-3 py-2">
        <p className="text-sm font-medium text-slate-800 truncate">{product.name}</p>

        {score !== undefined && (
          <p className="text-xs text-slate-500 mt-1">Score: {score.toFixed(4)}</p>
        )}
        {text_weight !== undefined && (
          <p className="text-xs text-slate-500 mt-1">Text Weight: {text_weight.toFixed(4)}</p>
        )}
        {image_weight !== undefined && (
          <p className="text-xs text-slate-500 mt-1">Image Weight: {image_weight.toFixed(4)}</p>
        )}
      </div>

{/* Hover tooltip: show full name and index */}
<div className="
  absolute left-2 right-2 bottom-2 
  pointer-events-none opacity-0 group-hover:opacity-100
  transition-opacity duration-200 z-50
">
  <div className="
    bg-white border border-[#E2E8F0] shadow-xl 
    rounded-md px-3 py-2 text-slate-700
  ">
    <p className="text-sm font-semibold whitespace-normal break-words">
      {product.name}
    </p>

    <p className="text-[11px] text-slate-500 mt-1">
      Index: {index}
    </p>
  </div>
</div>


    </div>
  )
}
