import React, { useState } from 'react';
import { Form, Input, Button, Radio, Typography } from 'antd';
import { useDependencies } from './hook';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import '../../components/styles/register.css';

// Definir el tipo para los valores del formulario
interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { handleSubmit, validatePassword } = useDependencies(); // Hook personalizado

  const [form] = Form.useForm(); // Referencia del formulario

  return (
    <div
      style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}
    >

      <Typography.Title style={{ textAlign: 'center' }} level={3}>
					Registro
			</Typography.Title>

      {/* Formulario */}
      <Form
        form={form} // Asociar el formulario con la referencia
        name="register"
        layout="vertical"
        onFinish={(values: FormValues) => {
          handleSubmit({ ...values}); // Llamar a la función de envío
          form.resetFields(); // Limpiar todos los campos después del envío
        }}
      >

        <Form.Item
          name="username"
          label="Nombre de Usuario"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa un nombre de usuario',
            },
          ]}
        >
          <Input placeholder="Nombre de Usuario" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa tu correo electrónico',
            },
            { type: 'email', message: 'Por favor ingresa un correo válido' },
          ]}
        >
          <Input placeholder="Correo Electrónico" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: true, message: 'Por favor ingresa tu contraseña' },
            {
              validator: (_, value) => validatePassword(value),
            },
          ]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirmar Contraseña"
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
          <Input.Password placeholder="Confirmar Contraseña" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <Button type="default" className='cancel-button' onClick={() => form.resetFields()} block>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit" block>
              Registrarse
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
