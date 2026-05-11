import { useState, useCallback } from 'react'
import { Card } from './ui/Card'
import { Volume2, Star, Trash2, ChevronUp } from 'lucide-react'

interface ReviewCardProps {
  id: string
  en: string
  zh: string
  category: string
  starred: boolean
  onToggleStar: (id: string) => void
  onDelete: (id: string) => void
}

export function ReviewCard({ id, en, zh, category, starred, onToggleStar, onDelete }: ReviewCardProps) {
  const [revealed, setRevealed] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const handleSpeak = useCallback((text: string) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    setSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }, [])

  return (
    <Card className="p-4">
      {/* Header: category badge + action buttons */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-400 font-medium">{category}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleStar(id)}
            className="p-2 rounded-lg hover:bg-gray-100 active:scale-110 transition-transform"
          >
            {starred ? (
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            ) : (
              <Star className="w-4 h-4 text-gray-300" />
            )}
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 rounded-lg hover:bg-red-50 active:scale-110 transition-transform"
          >
            <Trash2 className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* English term + speak button */}
      <div className="flex items-start gap-2 mb-3">
        <p className="text-lg font-semibold text-gray-900 flex-1 leading-snug">{en}</p>
        <button
          onClick={(e) => { e.stopPropagation(); handleSpeak(en) }}
          className={`p-1.5 rounded-lg shrink-0 ${speaking ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-primary'}`}
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Translation reveal/hide */}
      {revealed ? (
        <div className="flex items-start gap-2 bg-primary/5 rounded-lg p-3 mb-3">
          <p className="text-sm text-primary-dark flex-1">{zh}</p>
          <button
            onClick={() => setRevealed(false)}
            className="p-1 rounded hover:bg-primary/10 text-gray-400"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-2 rounded-lg bg-gray-50 text-sm text-gray-500 hover:bg-gray-100 active:bg-gray-100 mb-3"
        >
          Show Chinese Translation
        </button>
      )}
    </Card>
  )
}
