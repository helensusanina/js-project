import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { users } from './data';
import { userPhotos } from './userPhoto';
import './UserProfilePage.css';

function UserProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null); // Изменено: Начальное значение null

    useEffect(() => {
        const userData = users.find((user) => user.id === parseInt(userId));
        setUser(userData);
        setEditedUser(userData); // Изменено: Установка начального значения для editedUser
    }, [userId]);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://reqres.in/api/users/${userId}`, { // Изменено: Исправлен URL для PATCH запроса
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUser),
            });
            if (response.ok) {
                setUser({ ...editedUser });
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
                <div className="user-details">
                    {editing ? (
                        <form onSubmit={handleSubmit}>
                            <p><strong>ID:</strong> {user.id}</p>
                            <input type="text" name="name" value={editedUser.name || ''} onChange={handleInputChange} />
                            <input type="text" name="email" value={editedUser.email || ''} onChange={handleInputChange} />
                            <button type="submit">Сохранить</button>
                        </form>
                    ) : (
                        <>
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Имя:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button className="edit-button" onClick={handleEdit}>Редактировать</button>
                        </>
                    )}
                </div>
            </div>
            <Link to="/" className="return-link">Вернуться на главную</Link>
        </div>
    );
}
export default UserProfilePage;
