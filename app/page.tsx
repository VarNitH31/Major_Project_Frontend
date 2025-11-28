"use client";

import { useState, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import { useRouter } from "next/navigation";
import axios from "axios";
import RecommendationGrid from "@/components/RecommendationGrid";

interface Product {
	name: string;
	url: string;
	index?: number;
}

interface QueryProduct {
	name: string;
	url: string;
	index: number;
}

interface Recommendations {
	index: number;
	score: number;
	name: string;
	url: string;
	text_weight: number;
	image_weight: number;
}

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
	const [queryProducts, setQueryProducts] = useState<QueryProduct[]>([]);
	const [indexes, setIndexes] = useState<QueryProduct[]>([]);
	const [searchText, setSearchText] = useState("");
	const [recommendations, setRecommendations] = useState<Recommendations[]>([]);
	const [homepage, setHomepage] = useState(true);
	const [topK, setTopK] = useState(50);

	const router = useRouter();

	// const api = "http://localhost:8000";
	const api = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		fetch("/products.json")
			.then((res) => res.json())
			.then((data: Product[]) => {
				setProducts(data);
			});
	}, []);

	const handleRecommend = async () => {
		if (homepage) {
			setHomepage(false);

			let indices: number[] = [];
			if (searchText.trim().length > 0) {
				indices = searchText
					.split(",")
					.map((num) => parseInt(num.trim()))
					.filter((num) => !isNaN(num));

				const manualSelected = indices.map((i) => ({
					name: products[i].name,
					url: products[i].url,
					index: i,
				}));

				setQueryProducts(manualSelected);
				setSelectedProducts(indices);
			} else {
				indices = selectedProducts;
			}

			console.log("Using indices:", indices);
			const reqbody = { indices, top_k: topK };
			const res = await axios.post(`${api}/recommend`, reqbody);
			setRecommendations(res.data.recommendations);
			console.log("Recommendations:", res.data.recommendations);
		} else {
			setHomepage(true);
			setRecommendations([]);
			setSelectedProducts([]);
			setQueryProducts([]);
			setSearchText("");
		}
	};

	return (
		<div>
			<div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] transition-colors duration-200">
				{/* Header */}
				<header className="w-full bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between py-4 gap-4">
							{/* Logo */}
							<div className="flex items-center gap-3 min-w-0">
<img 
  src="/logo-icon.png" 
  alt="VisionFuse AI Logo" 
  className="h-15 w-15 object-contain"
/>


								<div className="min-w-0">
<h1 className="text-xl font-semibold text-slate-800">
  VisionFuse AI
</h1>
<p className="text-xs text-slate-500">
  Multimodal Recommendation Engine
</p>

								</div>
							</div>

							<div className="flex items-center gap-3 max-w-2xl w-full mx-4">
								{/* Search input */}
								<input
									type="text"
									placeholder="Enter indices (e.g. 12,45,78)"
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
									className="
      w-full px-4 py-2.5 text-sm rounded-lg
      bg-white border border-[#E2E8F0]
      placeholder-gray-400 text-[#0F172A]
      focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]
      shadow-sm transition-all
    "
								/>

								{/* Top-k dropdown */}
								<select
									value={topK}
									onChange={(e) => setTopK(Number(e.target.value))}
									className="
      px-3 py-2.5 text-sm rounded-lg bg-white border border-[#E2E8F0]
      text-[#0F172A] shadow-sm hover:border-[#0EA5E9]
      focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9]
      transition
    "
								>
									<option value={10}>Top 10</option>
									<option value={20}>Top 20</option>
									<option value={30}>Top 30</option>
									<option value={50}>Top 50</option>
									<option value={75}>Top 75</option>
									<option value={100}>Top 100</option>
								</select>
							</div>
						</div>
					</div>
				</header>

				{/* Main content */}
				<main className="w-full">
					<div className="h-fit mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<div
							className="
              bg-white shadow-md rounded-xl p-6 
              border border-[#E2E8F0]
            "
						>
							{homepage ? (
								<div className="w-full">
									<ProductGrid
										products={products}
										selectedProducts={selectedProducts}
										setSelectedProducts={setSelectedProducts}
										setQueryProducts={setQueryProducts}
									/>
								</div>
							) : (
								<div className="w-full">
									<RecommendationGrid
										queryProducts={queryProducts}
										recommendedProducts={recommendations}
									/>
								</div>
							)}
						</div>
					</div>
				</main>

				{/* Floating CTA */}
				{(selectedProducts.length > 0 || searchText !== "") && (
					<div className="fixed bottom-6 right-6 z-[1000]">
						{homepage ? (
							<button
								onClick={handleRecommend}
								className="
                  flex items-center gap-3 
                  bg-[#0EA5E9] text-white px-6 py-3 rounded-full
                  shadow-xl hover:bg-[#0284C7] transition-all font-semibold
                "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12l2 2 4-4"
									/>
								</svg>
								Recommend (
								{selectedProducts.length || searchText.split(",").length})
							</button>
						) : (
							<button
								onClick={handleRecommend}
								className="
                  flex items-center gap-3 
                  bg-white text-[#0EA5E9] border border-[#0EA5E9]/40 
                  px-5 py-2.5 rounded-full shadow-md
                  hover:bg-[#F0F9FF] transition
                "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 19l-7-7 7-7"
									/>
								</svg>
								Back to catalog
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
