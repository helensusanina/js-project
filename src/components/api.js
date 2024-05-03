import axios from 'axios';

const API_URL = 'https://reqres.in/api';

const getAllUsersEmails = async () => {
    try {
        let isLastPage = false;
        let currentPage = 1;
        const users = [];
        while (!isLastPage) {
            const { data } = await axios.get(`${API_URL}/users?page=${currentPage++}`);
            isLastPage = data.page === data['total_pages'];
            users.push(...data.data.map(user => user.email));
        }
        return users; // Returning only the array of users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Throwing the error for handling in components
    }
};

const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data.data; // Returning data of the specific user
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};

const updateUser = async (userId, updatedData) => {
    try {
        const response = await axios.patch(`${API_URL}/users/${userId}`, updatedData);
        return response; // Returning data of the updated user
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
};

const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        const { token, id } = response.data;
        const existingTokens = JSON.parse(localStorage.getItem('tokens')) || [];

        if (existingTokens.includes(token)) {
            throw new Error('Пользователь уже зарегестрирован');
        }

        existingTokens.push(token);
        localStorage.setItem('tokens', JSON.stringify(existingTokens));

        const userDataWithoutPassword = { ...userData };
        delete userDataWithoutPassword.password;

        if (!userDataWithoutPassword.avatarUrl) {
            userDataWithoutPassword.avatarUrl = '/default.png';
        }

        localStorage.setItem(id, JSON.stringify({ ...userDataWithoutPassword, token, id }));
        return token;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};


export { getAllUsersEmails, getUserById, updateUser, register }