import { mathCategories } from '../data/math-vocab'
import type { CategoryGroup } from '../pages/ReviewPage'

export const mathReviewData: CategoryGroup[] = mathCategories.map(cat => ({
  title: cat.title,
  items: cat.terms.map((term, idx) => ({
    id: `math-${cat.title}-${idx}`,
    en: term.en,
    zh: term.zh,
    category: cat.title,
  })),
}))
