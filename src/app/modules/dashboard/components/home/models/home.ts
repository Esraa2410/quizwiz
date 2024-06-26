// Top Five Students
export interface IGroup {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface IStudent {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  avg_score: number;
  group: IGroup;
}

// UpComing Five Quizzes

export interface IOption {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}

export interface IQuestion {
  _id: string;
  title: string;
  options: IOption;
}

export interface IQuiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: IQuestion[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  participants: number;
}
