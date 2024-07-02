export interface IStudentQuiz {
  data: {
    _id: string;
    code: string;
    title: string;
    description: string;
    status: string;
    instructor: string;
    group: string;
    questions_number: number;
    questions: IStudentQuizQuestion[];
    schadule: string;
    duration: number;
    score_per_question: number;
    type: string;
    difficulty: string;
    updatedAt: string;
    createdAt: string;
    __v: number;
  };
}

export interface IStudentQuizQuestion {
  _id: string;
  title: string;
  options: IStudentQuizOptions;
}

export interface IStudentQuizOptions {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

export interface IJoinQuizResponse {
  data: IJoinQuizData;
  message: string;
}

export interface IJoinQuizData {
  quiz: string;
  participant: string;
  score: number;
  started_at: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface IJoinQuizReq {
  code: string;
}

export interface ISubmitQuizReq {
  answers: ISubmitQuizAnswer[];
}

export interface ISubmitQuizAnswer {
  question: string;
  answer: string;
}

export interface ISubmitQuizResponse {
  data: ISubmitQuizData;
  message: string;
}

export interface ISubmitQuizData {
  _id: string;
  quiz: string;
  participant: string;
  score: number;
  started_at: string;
  finished_at: string;
  questions: ISubmitQuizQuestion[];
}

export interface ISubmitQuizQuestion
  extends Omit<IStudentQuizQuestion, 'options'> {
  options: ISubmitQuizOptions;
  answer: string;
}

export interface ISubmitQuizOptions extends Omit<IStudentQuizOptions, '_id'> {}
