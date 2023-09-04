export interface Question {
  title: string
  answers: string[]
  correct: number
  category: string
  categoryName: string
  difficulty: string | null
}
