export interface IOptionBase {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface IOption extends IOptionBase {
  _id: string;
}

export interface IQuestionBase {
  title: string;
  description: string;
  options: IOptionBase;
  answer: string;
  difficulty: string;
  type: string;
}

export interface IQuestion extends IQuestionBase {
  _id: string;
  status: string;
  instructor: string;
  points: number;
}
