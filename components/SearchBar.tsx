import React from 'react'

interface SearchBarProps {
  searchText: string
  setSearchText: (s: string) => void
}

export default function SearchBar({ searchText, setSearchText }: SearchBarProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <div className="relative flex items-center">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5 text-slate-700"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={2}
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M11 4a7 7 0 015.292 11.708l4 4a1 1 0 01-1.414 1.414l-4-4A7 7 0 1111 4z"
  />
</svg>

        </span>

        <input
          id="site-search"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search products, names, or URLs..."
          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-full
            bg-white border border-slate-300 text-slate-800 placeholder:text-slate-400
            focus:ring-2 focus:ring-blue-400 focus:border-transparent
            shadow-sm transition-all duration-200 ease-in-out
            appearance-none"
        />

        {searchText && (
          <button
            type="button"
            onClick={() => setSearchText('')}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
