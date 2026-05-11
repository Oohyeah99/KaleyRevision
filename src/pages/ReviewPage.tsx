import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react'
import { ReviewCard } from '../components/ReviewCard'

export interface ReviewItem {
  id: string
  en: string
  zh: string
  category: string
}

export interface CategoryGroup {
  title: string
  items: ReviewItem[]
}

interface ReviewPageProps {
  title: string
  subtitle: string
  categories: { title: string; items: ReviewItem[] }[]
  storageKey: string
}

export function ReviewPage({ title, subtitle, categories, storageKey }: ReviewPageProps) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
  const [starredIds, setStarredIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(`${storageKey}_starred`)
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })

  // Save starred IDs to localStorage
  useEffect(() => {
    localStorage.setItem(`${storageKey}_starred`, JSON.stringify([...starredIds]))
  }, [starredIds, storageKey])

  const toggleStar = (id: string) => {
    setStarredIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const deleteItem = (id: string) => {
    // For now, just a placeholder -- we could add archive/deleted tracking
    setStarredIds(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const toggleCategory = (categoryTitle: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev)
      if (next.has(categoryTitle)) next.delete(categoryTitle)
      else next.add(categoryTitle)
      return next
    })
  }

  // Filter items by search
  const filteredCategories: CategoryGroup[] = categories.map(cat => ({
    title: cat.title,
    items: searchTerm
      ? cat.items.filter(item =>
          item.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.zh.includes(searchTerm)
        )
      : cat.items,
  })).filter(cat => cat.items.length > 0)

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const visibleItems = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0)

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search terms or Chinese..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Stats */}
        {searchTerm && (
          <p className="text-xs text-gray-400 mt-2">
            Showing {visibleItems} of {totalItems} items
          </p>
        )}
      </header>

      {/* Content */}
      <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
        {filteredCategories.map((category) => {
          const isCollapsed = collapsedCategories.has(category.title)
          return (
            <div key={category.title}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category.title)}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">{category.title}</span>
                  <span className="text-xs text-gray-400">({category.items.length})</span>
                </div>
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {/* Cards */}
              {!isCollapsed && (
                <div className="space-y-3 mt-2">
                  {category.items.map((item) => (
                    <ReviewCard
                      key={item.id}
                      id={item.id}
                      en={item.en}
                      zh={item.zh}
                      category={category.title}
                      starred={starredIds.has(item.id)}
                      onToggleStar={toggleStar}
                      onDelete={deleteItem}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No items found</p>
          </div>
        )}
      </div>
    </div>
  )
}
