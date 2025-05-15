import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Button } from 'antd';
import { Question } from '../quiz/types';
import { QuizHistoryItem } from './types';

export default function ResolvedQuizView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const raw = localStorage.getItem('quiz_history');
  const history: QuizHistoryItem[] = raw ? JSON.parse(raw) : [];

  const quiz = history.find(q => q.id === id);

  if (!quiz) {
    return <Alert message="Resultado no encontrado" type="error" />;
  }

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <Button onClick={() => navigate('/home/history')} style={{ marginBottom: 24 }}>
        ← Volver al historial
      </Button>

      <h1 style={{ textAlign: 'center' }}>Resultado del Quiz</h1>
      <p style={{ textAlign: 'center' }}>
        Categoría: <strong>{quiz.category}</strong> | Fecha: {quiz.date} | Puntaje: {quiz.score}
      </p>

      <div style={{ marginTop: 40 }}>
        {quiz.questions.map((q: Question) => (
          <div key={q.id} style={{ marginBottom: '1.5rem' }}>
            <h3>{q.text}</h3>
            {q.answer_options.map((opt) => {
              const isSelected = quiz.answers[q.id]?.includes(opt.id_answer_option);
              const isCorrect = opt.is_correct;

              return (
                <div key={opt.id_answer_option} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled
                    style={{ marginRight: 8 }}
                  />
                  <span style={{ color: isCorrect ? 'green' : isSelected ? 'red' : undefined }}>
                    {opt.text}
                  </span>
                  {isCorrect && <span style={{ marginLeft: 8, color: 'green' }}>✔</span>}
                  {isSelected && !isCorrect && <span style={{ marginLeft: 8, color: 'red' }}>✖</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
