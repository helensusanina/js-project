// UserProfileForm.js
import React from 'react';

function UserProfileForm({ user, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <p><strong>ID:</strong> {user.id}</p>
            <input type="text" name="avatar" value={user.avatar ?? ''} onChange={onChange} />
            <input type="text" name="first_name" value={user.first_name ?? ''} onChange={onChange} />
            <button type="submit">Сохранить</button>
        </form>
    );
}

export default UserProfileForm;
