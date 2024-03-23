import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { users } from './data'; // Импорт массива пользователей
import { userPhotos } from './userPhoto'; // Импорт массива фотографий пользователей
import './UserProfilePage.css';
function UserProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Имитируем запрос к API и получаем данные о пользователе из массива users
        const userData = users.find((user) => user.id === parseInt(userId));
        setUser(userData);
    }, [userId]);

    // Если данные пользователя еще не загружены, показываем загрузочный индикатор
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>User Profile Page</h1>
            <div className="user-profile">
                <img src={userPhotos[user.id - 1]} alt="User" className="user-photo" />
                <div className="user-details">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Другие детали пользователя */}
                </div>
            </div>
            <Link to="/" className="return-link">Вернуться на главную</Link>
        </div>
    );
}

export default UserProfilePage;
