import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Pagination } from 'antd';
import './HomePage.css';

const initialFilters = {
    searchValue: '',
    currentPage: 1,
    filterType: 'all'
};

const getAllUsers = () => {
    const keys = Object.keys(localStorage).filter((current) => current !== 'tokens');
    return keys.map(key => JSON.parse(localStorage.getItem(key)));
}

const HomePage = () => {
    const [filters, setFilters] = useState(initialFilters);
    const users = getAllUsers();

    const handlePageChange = (page) => {
        setFilters({ ...filters, currentPage: page });
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setFilters({ ...filters, searchValue: value });
    };

    const applyFilters = (users, type) => {
        const filterMap = {
            'even': user => user.id % 2 === 0,
            'odd': user => user.id % 2 !== 0,
            'startsWithA': user => /^А/i.test(user.name),
            'startsWithB': user => /^B/i.test(user.name),
            'all': user => true
        };
        return users.filter(filterMap[type]);
    };

    const filteredUsers = useMemo(() => {
        const lowerSearchValue = filters.searchValue.toLowerCase();
        return users.filter(user =>
            user.name.toLowerCase().includes(lowerSearchValue) ||
            user.email.toLowerCase().includes(lowerSearchValue)
        );
    }, [filters.searchValue, users]);

    const filteredUsersWithFilters = useMemo(() => {
        return applyFilters(filteredUsers, filters.filterType);
    }, [filteredUsers, filters.filterType])

    const pageSize = 5;
    const { currentPage } = filters;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const usersOnPage = filteredUsersWithFilters.slice(startIndex, endIndex);

    return (
        <>
            <h1 className="title">Главная страница</h1>
            <div className="button-container">
                <Link to="/registration">
                    <Button type="primary">Регистрация</Button>
                </Link>
            </div>
            <Input
                className="search-input"
                placeholder="Поиск по имени или почте"
                value={filters.searchValue}
                onChange={handleSearch}
            />
            <div className="filter-container">
                <Button onClick={() => setFilters(prev => ({ ...prev, currentPage: 1, filterType: 'all' }))}>Все</Button>
                <Button onClick={() => setFilters(prev => ({ ...prev, currentPage: 1, filterType: 'even' }))}>Четные ID</Button>
                <Button onClick={() => setFilters(prev => ({ ...prev, currentPage: 1, filterType: 'odd' }))}>Нечетные ID</Button>
                <Button onClick={() => setFilters(prev => ({ ...prev, currentPage: 1, filterType: 'startsWithA' }))}>Имена на А</Button>
                <Button onClick={() => setFilters(prev => ({ ...prev, currentPage: 1, filterType: 'startsWithB' }))}>Имена на B</Button>
            </div>
            {usersOnPage.map(user => (
                <Card key={user.id} title="Карточка пользователя">
                    <Link to={`/user/${user.id}`} className="user-link">
                        <div className="user-info">
                            <img src={user.avatarUrl} alt="avatar" className="user-photo" />
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
                total={filteredUsers.length}
                pageSize={pageSize}
                onChange={handlePageChange}
            />
        </>
    );
};

export default HomePage;
