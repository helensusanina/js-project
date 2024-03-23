// src/api.js
import axios from 'axios';

const API_URL = 'https://reqres.in/api/register';

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data; // Returning only the array of users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Throwing the error for handling in components
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data.data; // Returning data of the specific user
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};

export const addUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data; // Returning data of the new user
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const updateUser = async (userId, updatedData) => {
    try {
        const response = await axios.patch(`${API_URL}/${userId}`, updatedData);
        return response.data; // Returning data of the updated user
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data; // Returning data from registration response
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
