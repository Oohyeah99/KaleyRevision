import { essayCategories } from '../data/essay-phrases'
import type { CategoryGroup } from '../pages/ReviewPage'

export const essayReviewData: CategoryGroup[] = essayCategories.map(cat => ({
  title: cat.title,
  items: cat.phrases.map((phrase, idx) => ({
    id: `essay-${cat.title}-${idx}`,
    en: phrase.en,
    zh: phrase.zh,
    category: cat.title,
  })),
}))
