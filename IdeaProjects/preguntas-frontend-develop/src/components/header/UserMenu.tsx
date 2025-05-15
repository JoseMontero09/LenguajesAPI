import { Dropdown, Avatar, Badge } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useSessionHandler } from '../../hooks/useSessionHandler';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const { clearSession, sessionContext } = useSessionHandler();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    clearSession();
  };

  // Opciones del menú
  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Perfil',
    },
    {
      key: 'changePassword',
      icon: <SettingOutlined />,
      label: 'Cambiar Contraseña',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Cerrar sesión',
      onClick: handleLogout,
    },
  ];

  // Crear el menú con los ítems
  const menu = {
    items: menuItems,
  };

  return (
    <Dropdown menu={menu} trigger={['click']}>
      <Badge count={0}>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row',
            fontFamily: 'sans-serif',
            gap: 10,
            cursor: 'pointer',
          }}
        >
          <p style={{ opacity: '0.5' }}>
            <b>{sessionContext?.username}</b>
          </p>
          <Avatar
            shape='circle'
            size={50}
            icon={<UserOutlined />}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </Badge>
    </Dropdown>
  );
};

export default UserMenu;
