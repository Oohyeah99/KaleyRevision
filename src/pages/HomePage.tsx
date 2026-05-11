import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Calculator, FileText, ArrowRight } from 'lucide-react'

export function HomePage() {
  const navigate = useNavigate()

  const sections = [
    {
      id: 'math',
      title: 'Math Vocabulary',
      subtitle: '数学词汇',
      description: 'Geometry, arithmetic, algebra, and science terms with Chinese translations',
      icon: Calculator,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      path: '/math',
    },
    {
      id: 'essays',
      title: 'English Essay Phrases',
      subtitle: '英语作文短语',
      description: 'High-scoring phrases and sentence structures for zhongkao essays',
      icon: FileText,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      path: '/essays',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-5">
        <h1 className="text-xl font-bold text-gray-900">Kaley Revision</h1>
        <p className="text-sm text-gray-500 mt-1">卡莉复习资料</p>
      </header>

      {/* Content */}
      <div className="px-4 py-6 space-y-4 max-w-lg mx-auto">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => navigate(section.path)}
              className="w-full text-left"
            >
              <Card className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${section.iconBg}`}>
                    <Icon className={`w-6 h-6 ${section.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
                      <ArrowRight className="w-4 h-4 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{section.subtitle}</p>
                    <p className="text-xs text-gray-400">{section.description}</p>
                  </div>
                </div>
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}
