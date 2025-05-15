import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import { UserOutlined, FileAddOutlined, HistoryOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;
const { Title } = Typography;

const GenericPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ backgroundColor: '#f0f2f5' }}>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <Title level={4} style={{ marginTop: 10 }}>
            Bienvenido Usuario
          </Title>
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<FileAddOutlined />} onClick={() => navigate('/home/quiz')}>
            Crear Quiz
            <span className="ant-menu-item-description">Menu description</span>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileAddOutlined />}>
            Crear Pregunta
            <span className="ant-menu-item-description">Menu description</span>
          </Menu.Item>
          <Menu.Item key="3" icon={<HistoryOutlined />} onClick={() => navigate('/home/history')}>
            Historial de Tests
            <span className="ant-menu-item-description">Menu description</span>
          </Menu.Item>
          <Menu.Item key="4" icon={<FileSearchOutlined />}>
            Mis Preguntas
            <span className="ant-menu-item-description">Menu description</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default GenericPage;
