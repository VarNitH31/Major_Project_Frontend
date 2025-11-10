'use client'

interface FilterTagsProps {
  tags: string[]
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
}

export default function FilterTags({ tags, selectedTags, setSelectedTags }: FilterTagsProps) {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            selectedTags.includes(tag) ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
