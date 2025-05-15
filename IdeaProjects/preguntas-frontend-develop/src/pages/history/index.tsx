import React from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function QuizHistory() {
  const navigate = useNavigate();

  // 🔁 Leer historial real desde localStorage
  const raw = localStorage.getItem('quiz_history');
  const history = raw ? JSON.parse(raw) : [];

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Puntaje',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_: any, record: { id: string }) => (
        <Button type="link" onClick={() => navigate(`/home/history/${record.id}`)}>
          Ver resultados
        </Button>
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{ textAlign: 'center' }}>Historial de Tests</h1>
      <Table
        columns={columns}
        dataSource={history.map((item: any, index: number) => ({ ...item, key: index.toString() }))}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />
    </div>
  );
}
