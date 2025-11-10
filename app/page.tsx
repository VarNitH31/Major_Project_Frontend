'use client'

import { useState, useEffect } from 'react'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import FilterTags from '../components/FilterTags'
import ToggleSwitch from '../components/ToggleSwitch'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import RecommendationGrid from '@/components/RecommendationGrid'

interface Product {
  name: string
  // description: string
  url: string
  index?:number
  // tags: string[]
}

interface QueryProduct {
  name: string
  url: string
  index: number
}

interface Recommendations{
  index:number,
  score:number,
  name:string,
  url:string
  text_weight:number
  image_weight:number
}


export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  // const [historyBased, setHistoryBased] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [queryProducts, setQueryProducts] = useState<QueryProduct[]>([])
  const [indexes, setIndexes] = useState<QueryProduct[]>([])
  const [searchText, setSearchText] = useState('')
  const [recommendations, setRecommendations] = useState<Recommendations[]>([]) 
  // const [selectedTags, setSelectedTags] = useState<string[]>([])
  // const [allTags, setAllTags] = useState<string[]>([])
  const [homepage, setHomepage] = useState(true)



  const router = useRouter()

 const api = process.env.NEXT_PUBLIC_API_URL;

  // const api="http://localhost:8000"

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data)
      })
  }, [])


  // const handleRecommend =async () => {
  //   if(homepage){
  //     setHomepage(false)
  //     console.log('Selected Products:', selectedProducts)
  //     console.log('Query Products:', queryProducts)
      
  //     const reqbody = {
  //       indices:selectedProducts,
  //       top_k:50
  //     }
  //     const res =await axios.post(`${api}/recommend`, reqbody)
  //     setRecommendations(res.data.recommendations)
  //     console.log('Recommendations:', res.data.recommendations)
  //   }else{
  //     setHomepage(true)
  //     setRecommendations([])
  //     setSelectedProducts([])
  //     setQueryProducts([])
  //   }
  // }

  const handleRecommend = async () => {
  if (homepage) {
    setHomepage(false);

    // ✅ If user manually entered indices, use them instead of selectedProducts
    let indices: number[] = [];
    if (searchText.trim().length > 0) {
      indices = searchText
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));

      // ✅ Convert indices → queryProducts using data from products.json
      const manualSelected = indices.map((i) => ({
        name: products[i].name,
        url: products[i].url,
        index: i,
      }));

      setQueryProducts(manualSelected);
      setSelectedProducts(indices); // to preserve compatibility
    } else {
      indices = selectedProducts;
    }

    // ✅ API call
    console.log('Using indices:', indices);
    const reqbody = { indices, top_k: 50 };
    const res = await axios.post(`${api}/recommend`, reqbody);
    setRecommendations(res.data.recommendations);
    console.log('Recommendations:', res.data.recommendations);

  } else {
    // ✅ Toggle back to home
    setHomepage(true);
    setRecommendations([]);
    setSelectedProducts([]);
    setQueryProducts([]);
    setSearchText(''); 
  }
};


  return (
    <div>
      <div className="min-h-screen bg-slate-900 text-slate-100 transition-colors duration-200">
        {/* Header */}
        <header className="w-full bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-sm">
                  <span className="font-semibold">!</span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg font-semibold leading-tight truncate"></h1>
                  <p className="text-xs text-slate-300 truncate">Smart product recommendations</p>
                </div>
              </div>
              <div className="flex-1 max-w-2xl mx-4">
                {/* <SearchBar searchText={searchText} setSearchText={setSearchText} /> */}
                {/* <input type="text" name="index" id="indexes" value={indexes} /> */}
                <input
  type="text"
  placeholder="Enter indices (e.g. 12,45,78)"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  className="w-full bg-slate-700 text-slate-200 px-3 py-2 rounded-md outline-none text-sm"
/>

              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="w-full">
          <div className="h-fit mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-slate-800/60 shadow-sm rounded-lg p-6 backdrop-blur-sm transition-colors">
              {homepage?  
                <div className="w-full">
                  
                  <ProductGrid 
                    products={products} 
                    selectedProducts={selectedProducts} 
                    setSelectedProducts={setSelectedProducts}
                    setQueryProducts={setQueryProducts}
                  />
                </div>
                :
                <div className="w-full">
                  <RecommendationGrid queryProducts={queryProducts} recommendedProducts={recommendations} />
                </div>
              }
            </div>
          </div>
        </main>

        { (selectedProducts.length > 0 || searchText!='') && (
          <div className="fixed bottom-6 right-6 z-[1000]">
            {homepage ? (
              <button 
                onClick={handleRecommend}
                className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-blue-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                Recommend ({  selectedProducts.length || searchText.split(',').length  })
              </button>
            ) : (
              <button 
                onClick={handleRecommend}
                className="flex items-center gap-3 bg-white text-blue-600 border border-blue-200 px-5 py-2.5 rounded-full shadow-md hover:bg-blue-50 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to catalog
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}