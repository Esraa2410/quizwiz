export interface Root2 {
  quiz: Quiz
  participants: Participant[]
}

export interface Quiz {
  _id: string
  code: string
  title: string
  description: string
  status: string
  instructor: string
  group: string
  questions_number: number
  schadule: string
  duration: number
  score_per_question: number
  type: string
  difficulty: string
  updatedAt: string
  createdAt: string
  __v: number
  closed_at: string
}

export interface Participant {
  _id: string
  quiz: Quiz2
  participant: Participant2
  score: number
  started_at: string
  finished_at: string
}

export interface Quiz2 {
  _id: string
  title: string
}

export interface Participant2 {
  _id: string
  first_name: string
  last_name: string
  email: string
}
