export interface IQuiz {
   
        _id: string
        code: string
        title: string
        description: string
        status: string
        instructor: string
        group: string
        questions_number: number
        questions: string[]
        schadule: string
        duration: number
        score_per_question: number
        type: string
        difficulty: string
        updatedAt: string
        createdAt: string
        __v: number
        closed_at: string
        participants: number
      }





/** */
export interface IQuizRequest {
    title: string
    description: string
    group: string
    questions_number: number
    difficulty: string
    type: string
    schadule: string
    duration: string
    score_per_question: string
}
export interface IQuizResponse{
   
        data: Data
        message: string
}
      
      export interface Data {
        code: string
        title: string
        description: string
        status: string
        instructor: string
        group: string
        questions_number: number
        questions: string[]
        schadule: string
        duration: number
        score_per_question: number
        type: string
        difficulty: string
        _id: string
        updatedAt: string
        createdAt: string
        __v: number
      }


