// UserProfilePage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './UserProfilePage.css';
import UserProfileInfo from './UserProfileInfo';
import UserProfileForm from './UserProfileForm';
import { updateUser } from '../api';

function UserProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem(userId))
        setUser(userData);
    }, [userId]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newUserData = { ...user, [name]: value };
        localStorage.setItem(userId, JSON.stringify(newUserData))
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(userId, user)
            if (response.status === 200) {
                setEditing(false);
                console.log('Данные пользователя успешно обновлены.');
            } else {
                console.error('Ошибка при обновлении данных пользователя:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя:', error);
        }
    };

    if (!user) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="container">
            <h1>Страница профиля пользователя</h1>
            <div className="user-profile">
                <img src={user.avatarUrl} alt="Пользователь" className="user-photo" />
                {editing ? (
                    <UserProfileForm user={user} onChange={handleInputChange} onSubmit={handleSubmit} />
                ) : (
                    <UserProfileInfo user={user} onEdit={handleEdit} />
                )}
            </div>
            <Link to="/" className="return-link">Вернуться на главную</Link>
        </div>
    );
}

export default UserProfilePage;
