
import React from 'react';

function UserProfileInfo({ user, onEdit }) {
    return (
        <div className="user-details">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Имя:</strong> {`${user.first_name} ${user?.last_name ?? ''}`}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.id === 0 &&
                <button className="edit-button" onClick={onEdit}>Редактировать</button>
            }
        </div>
    );
}

export default UserProfileInfo;
