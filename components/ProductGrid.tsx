'use client'

import { useState, useEffect, useRef } from 'react'
import ProductCard from './ProductCard'
import LoadingSkeleton from './LoadingSkeleton'

interface Product {
  name: string
  url: string
  index?:number
}

interface QueryProduct {
  name: string
  url: string
  index: number
}

interface ProductGridProps {
  products: Product[]
  selectedProducts: number[]
  setSelectedProducts: (val: number[]) => void
  setQueryProducts: React.Dispatch<React.SetStateAction<QueryProduct[]>>
}

export default function ProductGrid({
  products,
  selectedProducts,
  setSelectedProducts,
  setQueryProducts,
}: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        setVisibleCount(prev => Math.min(prev + 50, products.length))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [products.length])

  const toggleSelection = (index: number, product: Product) => {
    const alreadySelected = selectedProducts.includes(index)

    if (alreadySelected) {
      // @ts-ignore
      setSelectedProducts(prev => prev.filter(i => i !== index))
      setQueryProducts(prev => prev.filter(p => p.index !== index))
    } else {
      // @ts-ignore
      setSelectedProducts(prev => [...prev, index])
      setQueryProducts(prev => [...prev, { name: product.name, url: product.url, index }])
    }
  }

  return (
    <div
      ref={containerRef}
      className="
        m-4 
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 
        gap-4 w-full
      "
    >
      {products.slice(0, visibleCount).map((product, idx) => (
        <div className="w-full" key={idx}>
          <ProductCard
            product={product}
            index={idx}
            selectedIndex={selectedProducts.indexOf(idx)}
            onClick={() => toggleSelection(idx, product)}
          />
        </div>
      ))}

      {visibleCount < products.length &&
        Array.from({ length: 10 }).map((_, i) => (
          <LoadingSkeleton key={`skeleton-${i}`} />
        ))}
    </div>
  )
}
