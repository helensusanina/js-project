import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd';
import { register } from '../api.js';
import './RegistrationPage.css';


function RegistrationPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await register(values);
            message.success('Регистрация успешна');
            navigate('/');
        } catch (error) {
            console.error('Ошибка регистрации:', error.message);
            message.error('Ошибка регистрации: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registration-container">
            <h1 className="registration-title">Страница регистрации</h1>
            <Spin spinning={loading}> {/* Индикатор загрузки */}
                <Form name="registration_form" onFinish={onFinish} className="registration-form">
                    <Form.Item
                        label="Имя"
                        name="first_name"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ссылка на аватар"
                        name="avatar"
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
            </Spin>
        </div>
    );
}

export default RegistrationPage;
