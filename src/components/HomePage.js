// HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Pagination } from 'antd';
import './HomePage.css';
import { users } from './data'; // Импортируем массив пользователей
import { userPhotos } from './userPhoto'; // Импортируем массив фотографий пользователей

function HomePage() {
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState('all');

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const applyFilters = (filteredUsers) => {
        switch (filterType) {
            case 'even':
                return filteredUsers.filter((user) => user.id % 2 === 0);
            case 'odd':
                return filteredUsers.filter((user) => user.id % 2 !== 0);
            case 'startsWithA':
                return filteredUsers.filter((user) => /^А/.test(user.name));
            case 'startsWithB':
                return filteredUsers.filter((user) => /^B/i.test(user.name));
            default:
                return filteredUsers;
        }
    };

    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.email.toLowerCase().includes(searchValue.toLowerCase())
        );
    });

    const filteredUsersWithFilters = applyFilters(filteredUsers);

    const pageSize = 5;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const usersOnPage = filteredUsersWithFilters.slice(startIndex, endIndex);
    const path = "https://images.unsplash.com/photo-1712287633648-0c0f556d88ec?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <div className="container">
            <h1 className="title">Главная страница</h1>
            <div className="button-container">
                <Link to="/registration">
                    <Button type="primary">Регистрация</Button>
                </Link>
            </div>
            <Input
                className="search-input"
                placeholder="Поиск по имени или почте"
                value={searchValue}
                onChange={handleSearch}
            />
            <div className="filter-container">
                <Button onClick={() => setFilterType('all')}>Все</Button>
                <Button onClick={() => setFilterType('even')}>Четные ID</Button>
                <Button onClick={() => setFilterType('odd')}>Нечетные ID</Button>
                <Button onClick={() => setFilterType('startsWithA')}>Имена на А</Button>
                <Button onClick={() => setFilterType('startsWithB')}>Имена на B</Button>
            </div>
            {usersOnPage.map((user) => (
                <Card key={user.id} title="Карточка пользователя">
                    <Link to={`/user/${user.id}`} className="user-link">
                        <div className="user-info">
                            <img src={userPhotos[user.id - 1]} alt="path" className="user-photo" />
                            <div className="user-details">
                                <p><strong>Имя:</strong> {user.name}</p>
                                <p><strong>Почта:</strong> {user.email}</p>
                            </div>
                        </div>
                    </Link>
                </Card>
            ))}
            <Pagination
                className="pagination"
                current={currentPage}
                total={filteredUsers.length} // Общее количество пользователей
                pageSize={pageSize}
                onChange={handlePageChange}
            />
        </div>
    );
}

export default HomePage;