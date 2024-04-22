// UserProfilePage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { users } from '/project/my-app/src/components/data.js';
import { userPhotos } from '/project/my-app/src/components/userPhoto.js';
import './UserProfilePage.css';
import UserProfileInfo from './UserProfileInfo';
import UserProfileForm from './UserProfileForm';

function UserProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const userData = users.find((user) => user.id === +userId);
        setUser(userData);
    }, [userId]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://reqres.in/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
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
                <img src={userPhotos[user.id - 1]} alt="Пользователь" className="user-photo" />
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
