// UserProfileForm.js
import React from 'react';

function UserProfileForm({ user, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <p><strong>ID:</strong> {user.id}</p>
            <input type="text" name="name" value={user.name || ''} onChange={onChange} />
            <input type="text" name="email" value={user.email || ''} onChange={onChange} />
            <button type="submit">Сохранить</button>
        </form>
    );
}

export default UserProfileForm;
