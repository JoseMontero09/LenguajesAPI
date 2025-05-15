import React, { useState, useEffect } from 'react';
import { useQuizHandler } from './hooks';
import { Question } from './types';
import { Select, Button, Row, Col, Card, InputNumber, Alert, message } from 'antd';

const mockQuestions: Question[] = [
  // Geografía
  {
    id: 'q1', id_user: 'u1', username: 'Ana', rank: 'Estudiante', text: '¿Capital de Francia?', image: null, explanation: '', like: 5, dislike: 1,
    category: { id: 'cat-geo', name: 'Geografía' },
    answer_options: [
      { id_answer_option: 'o1', text: 'París', is_correct: true },
      { id_answer_option: 'o2', text: 'Madrid', is_correct: false },
      { id_answer_option: 'o3', text: 'Londres', is_correct: false },
      { id_answer_option: 'o4', text: 'Berlín', is_correct: false },
    ]
  },
  {
    id: 'q4', id_user: 'u1', username: 'Ana', rank: 'Estudiante', text: '¿Dónde está el Everest?', image: null, explanation: '', like: 3, dislike: 0,
    category: { id: 'cat-geo', name: 'Geografía' },
    answer_options: [
      { id_answer_option: 'o11', text: 'Nepal', is_correct: true },
      { id_answer_option: 'o12', text: 'China', is_correct: false },
      { id_answer_option: 'o13', text: 'India', is_correct: false },
      { id_answer_option: 'o14', text: 'Tíbet', is_correct: false },
    ]
  },
  // Matemáticas
  {
    id: 'q2', id_user: 'u2', username: 'Luis', rank: 'Profesor', text: '¿Cuánto es 3x3?', image: null, explanation: '', like: 4, dislike: 0,
    category: { id: 'cat-math', name: 'Matemáticas' },
    answer_options: [
      { id_answer_option: 'o5', text: '6', is_correct: false },
      { id_answer_option: 'o6', text: '9', is_correct: true },
      { id_answer_option: 'o7', text: '12', is_correct: false },
      { id_answer_option: 'o8', text: '15', is_correct: false },
    ]
  },
  {
    id: 'q5', id_user: 'u2', username: 'Luis', rank: 'Profesor', text: '¿Raíz cuadrada de 16?', image: null, explanation: '', like: 2, dislike: 1,
    category: { id: 'cat-math', name: 'Matemáticas' },
    answer_options: [
      { id_answer_option: 'o15', text: '2', is_correct: false },
      { id_answer_option: 'o16', text: '4', is_correct: true },
      { id_answer_option: 'o17', text: '6', is_correct: false },
      { id_answer_option: 'o18', text: '8', is_correct: false },
    ]
  },
  // Literatura
  {
    id: 'q3', id_user: 'u3', username: 'Carlos', rank: 'Mentor', text: '¿Autor de “Cien años de soledad”?', image: null, explanation: '', like: 5, dislike: 0,
    category: { id: 'cat-lit', name: 'Literatura' },
    answer_options: [
      { id_answer_option: 'o9', text: 'Gabriel García Márquez', is_correct: true },
      { id_answer_option: 'o10', text: 'Isabel Allende', is_correct: false },
      { id_answer_option: 'o11', text: 'Pablo Neruda', is_correct: false },
      { id_answer_option: 'o12', text: 'Jorge Luis Borges', is_correct: false },
    ]
  },
  {
    id: 'q6', id_user: 'u3', username: 'Carlos', rank: 'Mentor', text: '¿Qué escribió Shakespeare?', image: null, explanation: '', like: 3, dislike: 0,
    category: { id: 'cat-lit', name: 'Literatura' },
    answer_options: [
      { id_answer_option: 'o19', text: 'Hamlet', is_correct: true },
      { id_answer_option: 'o20', text: 'Hamlet 2', is_correct: true },
      { id_answer_option: 'o21', text: 'El Principito', is_correct: false },
      { id_answer_option: 'o22', text: 'Cien años de soledad', is_correct: false },
    ]
  }
];

const allCategories = [...new Set(mockQuestions.map(q => q.category.name))];
const recommendedCategories = allCategories.slice(0, 8);

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [startQuiz, setStartQuiz] = useState(false);
  const [questionLimit, setQuestionLimit] = useState<number | null>(null);
  const [notEnoughQuestions, setNotEnoughQuestions] = useState(false);
  const [questionsToRender, setQuestionsToRender] = useState<Question[]>([]);

  const filteredQuestions = mockQuestions.filter(q => q.category.name === selectedCategory);
  const selectedQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, questionLimit || 0);
  
const handleFinish = ({
  correct,
  total,
  answers,
  questions,
}: {
  correct: number;
  total: number;
  answers: { [key: string]: string[] };
  questions: Question[];
}) => {
  const quizHistory = JSON.parse(localStorage.getItem('quiz_history') || '[]');

  quizHistory.push({
    id: `quiz-${Date.now()}`,
    date: new Date().toLocaleString(),
    category: questions[0]?.category.name || 'Sin categoría',
    score: `${correct} / ${total}`,
    questions,
    answers,
  });

  localStorage.setItem('quiz_history', JSON.stringify(quizHistory));
};

  const {
  answers,
  handleChange,
  handleSubmit,
  score,
  resetScore,
  setStartQuiz: setStart,
} = useQuizHandler(questionsToRender, handleFinish);


 useEffect(() => {
  if (score !== null || notEnoughQuestions) {
    const timeout = setTimeout(() => {
      setStartQuiz(false);
      setSelectedCategory('');
      setQuestionLimit(null);
      resetScore();
      setNotEnoughQuestions(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }
}, [score, notEnoughQuestions]);


  const handleGenerateQuiz = () => {
  const filtered = mockQuestions.filter(q => q.category.name === selectedCategory);
  if (!questionLimit || questionLimit < 1) {
    message.warning('Por favor ingrese una cantidad válida de preguntas.');
    return;
  }
  if (filtered.length < questionLimit) {
    setNotEnoughQuestions(true);
    setStartQuiz(false);
    return;
  }
setQuestionsToRender(
  filtered
    .sort(() => 0.5 - Math.random())
    .slice(0, questionLimit)
);
setStartQuiz(true);
};


  return (
    <div style={{ padding: '1rem 2rem', width: '100%' }}>
      {!startQuiz && !notEnoughQuestions && (
        <>
          <h1 style={{ textAlign: 'center' }}>Seleccione una Categoría</h1>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Select
              showSearch
              style={{ width: 300, marginRight: 12 }}
              placeholder="Buscar categoría..."
              optionFilterProp="children"
              onSelect={setSelectedCategory}
              value={selectedCategory || undefined}
              filterOption={(input, option) =>
                (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {allCategories.map((cat) => (
                <Select.Option key={cat} value={cat}>{cat}</Select.Option>
              ))}
            </Select>
            <InputNumber
              min={1}
              max={10}
              placeholder="Cantidad"
              value={questionLimit ?? undefined}
              onChange={(val) => setQuestionLimit(val || null)}
            />
            <Button
              type="primary"
              style={{ marginLeft: 12 }}
              disabled={!selectedCategory}
              onClick={handleGenerateQuiz}
            >
              Generar Quiz
            </Button>
          </div>

          <h2 style={{ textAlign: 'center' }}>Categorías recomendadas</h2>
          <Row gutter={[24, 24]} justify="center">
            {recommendedCategories.map((cat) => (
              <Col key={cat} xs={24} sm={12} md={8} lg={6}>
                <Card title={cat} bordered style={{ textAlign: 'center', height: '100%' }}>
                  <Button type="primary" onClick={() => setSelectedCategory(cat)}>
                    Seleccionar
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {notEnoughQuestions && (
        <Alert
          message="No hay suficientes preguntas para esa categoría."
          description="Serás redirigido al inicio en 5 segundos."
          type="warning"
          showIcon
          style={{ marginTop: 20 }}
        />
      )}

      {startQuiz && score === null && (
        <div style={{ marginTop: 40 }}>
          {questionsToRender.map((q) => (
            <div key={q.id} style={{ marginBottom: '1.5rem' }}>
              <h3>{q.text}</h3>
              {q.answer_options.map((opt) => (
                <label key={opt.id_answer_option} style={{ display: 'block' }}>
                  <input
                    type="checkbox"
                    checked={answers[q.id]?.includes(opt.id_answer_option) || false}
                    onChange={(e) => handleChange(q.id, opt.id_answer_option, e.target.checked)}
                  />
                  {' '}
                  {opt.text}
                </label>
              ))}
            </div>
          ))}
          <Button type="primary" onClick={handleSubmit}>Enviar</Button>
        </div>
      )}

      {score !== null && (
        <div style={{ marginTop: 40 }}>
          <h2>Resultado del Quiz</h2>
          <p>Obtuviste {score} de {selectedQuestions.length} respuestas correctas.</p>
          {startQuiz && (
            <p style={{ fontStyle: 'italic', color: '#888' }}>Redirigiendo al inicio en 5 segundos...</p>
          )}
        </div>
      )}
    </div>
  );
}
