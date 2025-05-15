import React from 'react';
import { Form, Input, Button, message } from 'antd';

const Register: React.FC = () => {
	const onFinish = (values: string) => {
		console.log('Valores del formulario:', values);
		message.success(
			'Registro completado, revisa tu correo para verificar la cuenta.'
		);
	};

	const validatePassword = (value: string) => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!value || passwordRegex.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(
			new Error(
				'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
			)
		);
	};

	return (
		<div
			style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}
		>
			{/* Título de la página */}
			<h1 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>
				Registro Comprador
			</h1>

			<Form name='register' layout='vertical' onFinish={onFinish}>
				<Form.Item
					name='cedula'
					label='Cédula'
					rules={[{ required: true, message: 'Por favor ingresa tu cédula' }]}
				>
					<Input placeholder='Cédula' />
				</Form.Item>
				<Form.Item
					name='nombreCompleto'
					label='Nombre Completo'
					rules={[
						{ required: true, message: 'Por favor ingresa tu nombre completo' },
					]}
				>
					<Input placeholder='Nombre Completo' />
				</Form.Item>
				<Form.Item
					name='correo'
					label='Correo Electrónico'
					rules={[
						{
							required: true,
							message: 'Por favor ingresa tu correo electrónico',
						},
						{ type: 'email', message: 'Por favor ingresa un correo válido' },
					]}
				>
					<Input placeholder='Correo Electrónico' />
				</Form.Item>
				<Form.Item
					name='password'
					label='Contraseña'
					rules={[
						{ required: true, message: 'Por favor ingresa tu contraseña' },
						{ validator: validatePassword },
					]}
				>
					<Input.Password placeholder='Contraseña' />
				</Form.Item>
				<Form.Item
					name='confirmPassword'
					label='Confirmar Contraseña'
					dependencies={['password']}
					rules={[
						{ required: true, message: 'Por favor confirma tu contraseña' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error('Las contraseñas no coinciden.')
								);
							},
						}),
					]}
				>
					<Input.Password placeholder='Confirmar Contraseña' />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit' block>
						Registrarse
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Register;
