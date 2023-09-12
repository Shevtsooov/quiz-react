export interface Question {
  title: string
  answers: string[]
  correctAnswer: number
  category: string
  categoryName: string
  difficulty: string | null
}
