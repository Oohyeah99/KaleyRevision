import { ReviewPage } from './ReviewPage'
import { essayReviewData } from '../data/essay-review-data'

export function EssaysPage() {
  return (
    <ReviewPage
      title="English Essay Phrases"
      subtitle="英语作文短语"
      categories={essayReviewData}
      storageKey="kaley_essays"
    />
  )
}
