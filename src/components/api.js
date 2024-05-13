import axios from 'axios';

const API_URL = 'https://reqres.in/api';

const getAllUsers = async () => {
    try {
        let isLastPage = false;
        let currentPage = 1;
        const users = [];
        while (!isLastPage) {
            const { data } = await axios.get(`${API_URL}/users?page=${currentPage++}`);
            isLastPage = data.page === data['total_pages'];
            users.push(...data.data);
        }
        return users; // Returning only the array of users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Throwing the error for handling in components
    }
};

const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data.data; // Returning data of the specific user
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};

const updateUser = async (userId, updatedData) => {
    try {
        const response = await axios.patch(`${API_URL}/users/${userId}`, updatedData);
        const oldProfileData = JSON.parse(localStorage.getItem("my_profile_data"))
        localStorage.setItem("my_profile_data", JSON.stringify({ ...oldProfileData, ...updatedData }))
        return response; // Returning data of the updated user
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
};

const register = async (userData) => {
    try {
        const userEmail = userData.email;
        userData.email = 'george.bluth@reqres.in'
        const response = await axios.post(`${API_URL}/register`, userData);
        const { token } = response.data;

        const userDataWithoutPassword = { ...userData, email: userEmail, id: 0 };
        delete userDataWithoutPassword.password;

        if (!userDataWithoutPassword.avatar) {
            userDataWithoutPassword.avatar = '/default.png';
        }

        localStorage.setItem('my_profile_data', JSON.stringify({ ...userDataWithoutPassword, token }));
        return token;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};


export { getAllUsers, getUserById, updateUser, register }