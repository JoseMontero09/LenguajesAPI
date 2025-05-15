export type Quiz = {
  id_quiz: string;
  id_user: string;
  grade: number;
  completed: string; // ISO 8601
  status: 'in_progress' | 'completed' | string;
  end_time: string;
  questions: Question[];
};

export type Question = {
  id: string;
  id_user: string;
  username: string;
  rank: string;
  text: string;
  image: string | null;
  explanation: string;
  like: number;
  dislike: number;
  category: {
    id: string;
    name: string;
  };
  answer_options: AnswerOption[];
};

export type AnswerOption = {
  id_answer_option: string;
  text: string;
  is_correct: boolean;
};
