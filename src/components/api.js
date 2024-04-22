import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUsers, getUserById, updateUser } from '/project/my-app/src/components/api.js';
import { userPhotos } from '/project/my-app/src/components/userPhoto.js';
import './UserProfilePage.css';
import UserProfileInfo from './UserProfileInfo';
import UserProfileForm from './UserProfileForm';

function UserProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(userId);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
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
            const response = await updateUser(userId, user);
            setUser(response);
            setEditing(false);
            console.log('Данные пользователя успешно обновлены.');
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
