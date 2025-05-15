import { Button, Card, Divider, Form, Input, Typography } from 'antd';
import useDependencies from './hooks';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const { handleLogin, rules } = useDependencies();
	const navigate = useNavigate();

	const goToRegister = () => navigate('/register');

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '90vh',
			}}
		>
			<Card
				title={
					<Typography.Title style={{ textAlign: 'center' }} level={3}>
						Iniciar Sesión
					</Typography.Title>
				}
				style={{
					maxWidth: '400px',
					width: '100%',
					borderRadius: '10px',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
				}}
			>
				<Form
					onFinish={handleLogin}
					autoComplete='off'
					layout='vertical'
					style={{ width: '100%' }}
				>
					<Form.Item
						label='Nombre de usuario'
						name='username'
						rules={rules.username}
					>
						<Input placeholder='Ingresa tu nombre de usuario' />
					</Form.Item>

					<Form.Item label='Contraseña' name='password' rules={rules.password}>
						<Input.Password placeholder='Ingresa tu contraseña' />
					</Form.Item>

					<Button
						type='primary'
						shape='round'
						size='large'
						htmlType='submit'
						block
						style={{ marginBottom: '15px' }}
					>
						Ingresar
					</Button>
				</Form>

				<Divider>O</Divider>

				<Button
					type='link'
					size='large'
					block
					onClick={goToRegister}
					style={{ fontSize: '16px' }}
				>
					Crea una nueva cuenta
				</Button>
			</Card>
		</div>
	);
};

export default Login;
