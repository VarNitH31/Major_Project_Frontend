'use client'

import React from 'react'
import { text } from 'stream/consumers'

interface Product {
  name: string
  url: string
  index?:number
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
      className="group relative w-full rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-700 transition-shadow duration-200 shadow-sm hover:shadow-lg cursor-pointer"
      onClick={() => onClick(index)}
      aria-label={`Select ${product.name}`}
    >
      {/* Image area */}
      <div className="w-full h-48 flex items-center justify-center bg-gradient-to-b from-slate-200 to-transparent dark:from-slate-800">
        <img
          src={product.url}
          alt={product.name}
          className="max-h-44 object-contain px-3"
          // loading="lazy"
        />
      </div>

      {/* selection badge (shows order index if selected) */}
      {isSelected && (
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center shadow">
          {selectedIndex! + 1}
        </span>
      )}

      {/* subtle overlay check icon when hovered or selected */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-200
          ${isSelected ? 'opacity-30 bg-blue-50 dark:bg-blue-900/30' : 'group-hover:opacity-10'}`}
      />

      {/* content */}
      <div className="px-3 py-2">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{product.name}</p>
        {/* <p className="text-xs text-slate-500 dark:text-slate-300 truncate">{product.description}</p> */}
        {score !== undefined && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Score: {score.toFixed(4)}</p>
        )}
        {text_weight !== undefined && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Text Weight: {text_weight.toFixed(4)}</p>
        )}
        {image_weight !== undefined && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Image Weight: {image_weight.toFixed(4)}</p>
        )}
      </div>

      {/* Hover tooltip: show full name and index on hover */}
      <div className="absolute left-3 right-3 bottom-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="mx-auto max-w-full bg-slate-800/85 text-slate-100 text-xs rounded-md px-3 py-2 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate">{product.name} </div>
              <div className="text-2xs text-slate-300 mt-0.5">Index: {index} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}