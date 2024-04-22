
import axios from 'axios';

const API_URL = "https://reqres.in/api";

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; 
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};

export const addUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data; 
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const updateUser = async (userId, updatedData) => {
    try {
        const response = await axios.patch(`${API_URL}/${userId}`, updatedData);
        return response.data; 
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
