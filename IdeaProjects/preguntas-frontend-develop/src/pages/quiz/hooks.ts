import { useState } from 'react';
import { Question } from './types';

export function useQuizHandler(
  questions: Question[],
  onSubmitFinish?: (summary: {
    correct: number;
    total: number;
    answers: { [key: string]: string[] };
    questions: Question[];
  }) => void
) {
  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
  const [score, setScore] = useState<number | null>(null);
  const [startQuiz, setStartQuiz] = useState(false);

  const handleChange = (questionId: string, optionId: string, isChecked: boolean) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      if (isChecked) {
        return { ...prev, [questionId]: [...current, optionId] };
      } else {
        return { ...prev, [questionId]: current.filter((id) => id !== optionId) };
      }
    });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      const selected = answers[q.id] || [];
      const correctOptions = q.answer_options
        .filter((opt) => opt.is_correct)
        .map((opt) => opt.id_answer_option);

      const isEqual =
        selected.length === correctOptions.length &&
        selected.every((id) => correctOptions.includes(id));

      if (isEqual) correct++;
    });

    setScore(correct);

    if (onSubmitFinish) {
      onSubmitFinish({
        correct,
        total: questions.length,
        answers,
        questions,
      });
    }
  };

  const resetScore = () => {
    setScore(null);
    setAnswers({});
  };

  return {
    answers,
    handleChange,
    handleSubmit,
    score,
    startQuiz,
    setStartQuiz,
    resetScore,
  };
}
