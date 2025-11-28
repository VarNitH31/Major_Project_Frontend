'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from './ProductCard'
import LoadingSkeleton from './LoadingSkeleton'

interface Recommendations {
  index: number
  score: number
  name: string
  url: string
  text_weight: number
  image_weight: number
}

interface QueryProduct {
  name: string
  url: string
  index: number
}

interface RecommendationGridProps {
  queryProducts: QueryProduct[]
  recommendedProducts: Recommendations[]
}

export default function RecommendationGrid({
  queryProducts,
  recommendedProducts,
}: RecommendationGridProps) {
  const [loadedRecs, setLoadedRecs] = useState<Recommendations[]>([])
  const [loading, setLoading] = useState(true)
  const [fusionDone, setFusionDone] = useState(false)

  useEffect(() => {
    setLoading(true)
    setFusionDone(false)

    // ⏳ SLOWER FUSION TIMING
    const fusionTime = queryProducts.length * 450 + 2600
    const loadTime = fusionTime + 1500

    const fusionTimer = setTimeout(() => {
      setFusionDone(true)
    }, fusionTime)

    const recTimer = setTimeout(() => {
      setLoadedRecs(recommendedProducts)
      setLoading(false)
    }, loadTime)

    return () => {
      clearTimeout(fusionTimer)
      clearTimeout(recTimer)
    }
  }, [recommendedProducts, queryProducts])

  return (
    <div className="flex flex-col gap-10 text-slate-800">
      
      {/* 🔹 Query products */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-slate-700">
          Your Selected Products
        </h2>

        <div className="flex flex-col gap-4">
          {queryProducts.map((product, idx) => (
            <div
              key={`query-${idx}`}
              className="
                flex items-center gap-4 p-3 rounded-lg 
                bg-white border border-[#E2E8F0] shadow-sm
              "
            >
              <img
                src={product.url}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md border border-[#E2E8F0]"
              />
              <p className="text-base font-medium text-slate-800">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Fusion animation */}
      {!fusionDone && (
        <section className="relative">
          <h2 className="text-lg font-semibold mb-2 mt-4 text-slate-700">
            Fusing Knowledge...
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="
              relative w-full h-[70px] flex items-center justify-center 
              overflow-hidden rounded-md
              border border-[#E2E8F0] bg-white shadow-sm
            "
          >
            {queryProducts.map((product, idx) => (
              <motion.div
                key={`fusion-${idx}`}
                initial={{
                  x: idx % 2 === 0 ? -250 : 250,
                  opacity: 0,
                  scale: 1,
                }}
                animate={{
                  x: 0,
                  opacity: [0, 1, 1, 0],
                  scale: [1, 1.25, 0.9, 0.6],
                }}

                // ⏳ SLOWER, SMOOTHER TRANSITIONS
                transition={{
                  delay: 0.5 + idx * 0.45,
                  duration: 2.4,
                  ease: 'easeInOut',
                }}

                className="absolute flex items-center justify-center gap-2"
              >
                <img
                  src={product.url}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded-md border border-[#E2E8F0]"
                />
                <p className="text-sm font-medium text-slate-700">
                  {product.name}
                </p>
              </motion.div>
            ))}

            {/* Fusion glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.6, 0.6],
              }}
              transition={{
                delay: queryProducts.length * 0.45 + 0.6,
                duration: 2,
                ease: 'easeInOut',
              }}
              className="absolute w-10 h-10 rounded-full bg-[#0EA5E9] blur-md"
            />
          </motion.div>
        </section>
      )}

      {/* 🔹 Recommendations */}
      <section>
        <h2 className="text-lg mt-4 font-semibold mb-3 text-slate-700">
          Recommended for You
        </h2>

        <AnimatePresence>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            >
              {loadedRecs.map((product, idx) => (
                <motion.div
                  key={`rec-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.2,
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  <ProductCard
                    index={idx}
                    product={{ name: product.name, url: product.url }}
                    onClick={() => {}}
                    score={product.score}
                    text_weight={product.text_weight}
                    image_weight={product.image_weight}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
