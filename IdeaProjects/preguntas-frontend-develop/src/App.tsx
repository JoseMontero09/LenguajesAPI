import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import Login from './pages/login';
import Home from './pages/home';
import Header from './components/header/Header';
import Quiz from './pages/quiz'; // ya importado
import QuizHistory from './pages/history';
import ResolvedQuizView from './pages/history/ResolvedQuizView';
import Register from './pages/register/index';
import { useSessionHandler } from './hooks/useSessionHandler';

const App: React.FC = () => {
  const { sessionContext, loadSessionFromStorage, getRoleFromToken } = useSessionHandler();
  const [hasHeader, setHasHeader] = useState(false);

  useMemo(() => {
    if (sessionContext === null) {
      loadSessionFromStorage();
    }
  }, [sessionContext, loadSessionFromStorage]);

  useEffect(() => {
    setHasHeader(!!sessionContext);
  }, [sessionContext]);

  const role = sessionContext?.token ? getRoleFromToken(sessionContext.token) : null;

  return (
    <ErrorBoundary
      description="Something went wrong, please contact an administrator"
      message="An unknown error occurred"
    >
      <Router>
        {!sessionContext ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />}>
              <Route path="quiz" element={<Quiz />} />
              <Route path="history" element={<QuizHistory />} />
              <Route path="history/:id" element={<ResolvedQuizView />} />
            </Route>
          </Routes>
        ) : (
          <div style={{ marginTop: hasHeader ? '120px' : '0' }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="quiz" element={<Quiz />} />
              </Route>

              {/* Rutas solo para admin */}
              {role === 'admin' && (
                <Route path="/admin" element={<Home />} />
              )}

              {/* Rutas solo para colaborador */}
              {role === 'collaborator' && (
                <Route path="/collaborator" element={<Home />} />
              )}

              {/* Redirigir si el usuario no tiene el rol adecuado */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )}
      </Router>
    </ErrorBoundary>
  );
};

export default App;
