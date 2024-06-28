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
  description: string;
  options: IOption;
  answer: string;
  status: string;
  instructor: string;
  difficulty: string;
  points: number;
  type: string;
}
