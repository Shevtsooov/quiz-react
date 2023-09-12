export interface Question {
  id: number
  title: string
  answers: string[]
  correctAnswer: number
  category: string
  categoryName: string
  difficulty: string | null
}
