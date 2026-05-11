import { ReviewPage } from './ReviewPage'
import { mathReviewData } from '../data/math-review-data'

export function MathPage() {
  return (
    <ReviewPage
      title="Math Vocabulary"
      subtitle="数学词汇"
      categories={mathReviewData}
      storageKey="kaley_math"
    />
  )
}
