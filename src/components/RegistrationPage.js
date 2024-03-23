import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { register } from './api'; 
import './RegistrationPage.css';

function RegistrationPage() {
    const navigate = useNavigate(); // Get the navigate function

    const onFinish = async (values) => {
        try {
            await register(values); // Call the register function
            message.success('Регистрация успешна');
            navigate('/'); // Redirect to the homepage after successful registration
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            message.error('Ошибка регистрации');
        }
    };

    return (
        <div className="registration-container">
            <h1 className="registration-title">Страница регистрации</h1>
            <Form name="registration_form" onFinish={onFinish} className="registration-form">
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Почта"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите вашу почту!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
            <Link to="/" className="registration-link">На главную</Link>
        </div>
    );
}

export default RegistrationPage;
