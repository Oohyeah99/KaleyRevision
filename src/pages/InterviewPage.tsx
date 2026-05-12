import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shuffle, List, FileText, EyeOff, Plus, X, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react'

interface Question {
  id: number
  text: string
}

interface QAData {
  questions: Question[]
  notes: Record<number, string>
}

const DEFAULT_QUESTIONS: Question[] = [
  { id: 1, text: 'Which is more boring, childhood or growing up?' },
  { id: 2, text: 'Which do you prefer, math or art?' },
  { id: 3, text: 'Do you prefer online or in-person interactions?' },
]

const DATA_KEY = 'kaley_qa_data'

function loadData(): QAData {
  try {
    const data = localStorage.getItem(DATA_KEY)
    if (data) return JSON.parse(data)
  } catch { /* ignore */ }
  return { questions: [...DEFAULT_QUESTIONS], notes: {} }
}

function saveData(data: QAData) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data))
}

function getNextId(questions: Question[]): number {
  return questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1
}

export function InterviewPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<QAData>({ questions: [], notes: {} })
  const [view, setView] = useState<'random' | 'all'>('random')
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [showNoteFor, setShowNoteFor] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newQuestionText, setNewQuestionText] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<Question | null>(null)
  const [showExpandedNote, setShowExpandedNote] = useState(false)

  useEffect(() => {
    const loaded = loadData()
    setData(loaded)
    if (loaded.questions.length > 0) {
      setCurrentQuestion(loaded.questions[Math.floor(Math.random() * loaded.questions.length)])
    }
  }, [])

  const updateData = (updater: (prev: QAData) => QAData) => {
    setData(prev => {
      const next = updater(prev)
      saveData(next)
      return next
    })
  }

  const getRandomQuestion = useCallback(() => {
    const qs = data.questions
    if (qs.length === 0) return null
    const idx = Math.floor(Math.random() * qs.length)
    return qs[idx]
  }, [data.questions])

  const handleRandom = () => {
    let next = getRandomQuestion()
    while (next && currentQuestion && next.id === currentQuestion.id && data.questions.length > 1) {
      next = getRandomQuestion()
    }
    setCurrentQuestion(next)
    setShowNoteFor(null)
  }

  const updateNote = (id: number, text: string) => {
    updateData(prev => ({ ...prev, notes: { ...prev.notes, [id]: text } }))
  }

  const toggleNote = (id: number) => {
    setShowNoteFor(prev => prev === id ? null : id)
  }

  const handleAddQuestion = () => {
    const text = newQuestionText.trim()
    if (!text) return
    updateData(prev => {
      const newQ: Question = { id: getNextId(prev.questions), text }
      return { ...prev, questions: [...prev.questions, newQ] }
    })
    setNewQuestionText('')
    setShowAddForm(false)
  }

  const handleDeleteRequest = (id: number) => {
    setDeleteConfirmId(id)
  }

  const confirmDelete = (id: number) => {
    updateData(prev => {
      const newNotes = { ...prev.notes }
      delete newNotes[id]
      return { ...prev, questions: prev.questions.filter(q => q.id !== id), notes: newNotes }
    })
    if (currentQuestion?.id === id) {
      setCurrentQuestion(null)
    }
    if (showNoteFor === id) setShowNoteFor(null)
    setDeleteConfirmId(null)
  }

  const cancelDelete = () => {
    setDeleteConfirmId(null)
  }

  const moveQuestion = (id: number, direction: 'up' | 'down') => {
    updateData(prev => {
      const qs = [...prev.questions]
      const idx = qs.findIndex(q => q.id === id)
      if (idx === -1) return prev
      const newIdx = direction === 'up' ? idx - 1 : idx + 1
      if (newIdx < 0 || newIdx >= qs.length) return prev
      const [moved] = qs.splice(idx, 1)
      qs.splice(newIdx, 0, moved)
      return { ...prev, questions: qs }
    })
  }

  const handleRestoreAll = () => {
    if (!confirm('This will restore all default questions. Your custom questions and notes will be kept for questions that still exist. Continue?')) return
    updateData(prev => {
      const defaultIds = new Set(DEFAULT_QUESTIONS.map(q => q.id))
      const customQuestions = prev.questions.filter(q => !defaultIds.has(q.id))
      const restored = [...DEFAULT_QUESTIONS, ...customQuestions]
      return { ...prev, questions: restored }
    })
    setCurrentQuestion(null)
    setShowNoteFor(null)
    setDeleteConfirmId(null)
  }

  const questions = data.questions
  const notes = data.notes

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Interview Questions</h1>
            <p className="text-xs text-gray-500">面试问题</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {/* View toggle buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => { setView('random'); handleRandom() }}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
              view === 'random'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary/50'
            }`}
          >
            <Shuffle className="w-4 h-4 inline mr-1.5" />
            Random
          </button>
          <button
            onClick={() => { setView('all'); setShowNoteFor(null) }}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
              view === 'all'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary/50'
            }`}
          >
            <List className="w-4 h-4 inline mr-1.5" />
            All ({questions.length})
          </button>
        </div>

        {/* Random Question View */}
        {view === 'random' && (
          <div>
            {currentQuestion ? (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-2 font-medium">
                        Question {questions.findIndex(q => q.id === currentQuestion.id) + 1} of {questions.length}
                      </p>
                      <h2 className="text-xl font-bold text-gray-900 leading-tight">
                        {currentQuestion.text}
                      </h2>
                    </div>
                    <button
                      onClick={() => toggleNote(currentQuestion.id)}
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors flex-shrink-0"
                      title={showNoteFor === currentQuestion.id ? 'Hide note' : 'Show note'}
                    >
                      {showNoteFor === currentQuestion.id ? (
                        <EyeOff className="w-5 h-5 text-primary" />
                      ) : (
                        <FileText className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Note section */}
                  {showNoteFor === currentQuestion.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <label className="block text-sm font-medium mb-2 text-gray-600">
                        Your Notes / Answer Ideas:
                      </label>
                      <textarea
                        value={notes[currentQuestion.id] || ''}
                        onChange={(e) => updateNote(currentQuestion.id, e.target.value)}
                        className="w-full h-28 p-3 rounded-xl border-2 border-primary/20 bg-gray-50 resize-none focus:border-primary focus:outline-none text-sm"
                        placeholder="Write your answer ideas or notes here..."
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={handleRandom}
                  className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Next Random Question
                </button>
              </>
            ) : (
              <p className="text-center text-gray-400 py-12">No questions available. Add some!</p>
            )}
          </div>
        )}

        {/* All Questions View */}
        {view === 'all' && (
          <div>
            {/* Add Question + Restore All buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
              >
                {showAddForm ? <X className="w-4 h-4 inline mr-1.5" /> : <Plus className="w-4 h-4 inline mr-1.5" />}
                {showAddForm ? 'Cancel' : 'Add Question'}
              </button>
              <button
                onClick={handleRestoreAll}
                className="flex-1 py-3 rounded-xl text-sm font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                title="Restore all default questions"
              >
                <RotateCcw className="w-4 h-4 inline mr-1.5" />
                Restore
              </button>
            </div>

            {/* Add Question form */}
            {showAddForm && (
              <div className="bg-white rounded-xl shadow-sm border border-green-200 p-4 mb-4">
                <label className="block text-sm font-medium mb-2">New Question:</label>
                <textarea
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full h-20 p-3 rounded-xl border-2 border-gray-200 bg-gray-50 resize-none focus:border-green-400 focus:outline-none text-sm mb-3"
                  placeholder="Type your new question here..."
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleAddQuestion}
                    disabled={!newQuestionText.trim()}
                    className="flex-1 py-2.5 rounded-xl bg-green-600 text-white font-semibold text-sm disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4 inline mr-1.5" />
                    Add Question
                  </button>
                  <button
                    onClick={() => { setShowAddForm(false); setNewQuestionText('') }}
                    className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-semibold text-sm hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Question cards */}
            <div className="space-y-3">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  onClick={() => { setExpandedQuestion(q); setShowExpandedNote(false) }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-primary/30 p-4 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      {/* Up/down reorder buttons */}
                      <div className="flex flex-col gap-0.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => moveQuestion(q.id, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded hover:bg-primary/10 transition-colors disabled:opacity-20"
                          title="Move up"
                        >
                          <ArrowUp className="w-3 h-3 text-gray-400" />
                        </button>
                        <button
                          onClick={() => moveQuestion(q.id, 'down')}
                          disabled={index === questions.length - 1}
                          className="p-1 rounded hover:bg-primary/10 transition-colors disabled:opacity-20"
                          title="Move down"
                        >
                          <ArrowDown className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-medium mb-0.5">
                          #{index + 1}
                        </p>
                        <p className="text-sm font-medium text-gray-900 leading-snug">
                          {q.text}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleNote(q.id)}
                        className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                        title={showNoteFor === q.id ? 'Hide note' : 'Show note'}
                      >
                        {showNoteFor === q.id ? (
                          <EyeOff className="w-4 h-4 text-primary" />
                        ) : (
                          <FileText className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      {deleteConfirmId === q.id ? (
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => confirmDelete(q.id)}
                            className="px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600"
                          >
                            OK
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeleteRequest(q.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                          title="Delete question"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Note section */}
                  {showNoteFor === q.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
                      <label className="block text-sm font-medium mb-2 text-gray-600">
                        Your Notes / Answer Ideas:
                      </label>
                      <textarea
                        value={notes[q.id] || ''}
                        onChange={(e) => updateNote(q.id, e.target.value)}
                        className="w-full h-20 p-3 rounded-xl border-2 border-primary/20 bg-gray-50 resize-none focus:border-primary focus:outline-none text-sm"
                        placeholder="Write your answer ideas or notes here..."
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {questions.length === 0 && (
              <p className="text-center text-gray-400 py-12">No questions yet. Add your first one!</p>
            )}
          </div>
        )}
      </main>

      {/* Expanded question overlay */}
      {expandedQuestion && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
          onClick={() => setExpandedQuestion(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400 mb-2 font-medium">
                  Question {questions.findIndex(q => q.id === expandedQuestion.id) + 1} of {questions.length}
                </p>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  {expandedQuestion.text}
                </h2>
              </div>
              <button
                onClick={() => setExpandedQuestion(null)}
                className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
                title="Close"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Notes toggle button */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
              <button
                onClick={() => setShowExpandedNote(prev => !prev)}
                className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 flex items-center"
              >
                {showExpandedNote ? <EyeOff className="w-4 h-4 mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
                {showExpandedNote ? 'Hide Notes' : 'Notes'}
              </button>
            </div>

            {/* Note section */}
            {showExpandedNote && (
              <div className="mt-4">
                <textarea
                  value={notes[expandedQuestion.id] || ''}
                  onChange={(e) => updateNote(expandedQuestion.id, e.target.value)}
                  className="w-full h-28 p-3 rounded-xl border-2 border-primary/20 bg-gray-50 resize-none focus:border-primary focus:outline-none text-sm"
                  placeholder="Write your answer ideas or notes here..."
                />
              </div>
            )}

            {/* Next Question button */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  const currentIdx = questions.findIndex(q => q.id === expandedQuestion.id)
                  const nextIdx = (currentIdx + 1) % questions.length
                  setExpandedQuestion(questions[nextIdx])
                  setShowExpandedNote(false)
                }}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Next Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
