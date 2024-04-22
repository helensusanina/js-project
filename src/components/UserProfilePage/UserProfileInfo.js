
import React from 'react';

function UserProfileInfo({ user, onEdit }) {
    return (
        <div className="user-details">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="edit-button" onClick={onEdit}>Редактировать</button>
        </div>
    );
}

export default UserProfileInfo;
