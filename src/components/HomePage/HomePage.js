import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Input, Pagination } from 'antd';
import './HomePage.css';
import { getAllUsers } from '../api';

const initialFilters = {
    searchValue: '',
    currentPage: 1,
    filterType: 'all'
};

const HomePage = () => {
    const [filters, setFilters] = useState(initialFilters);
    const [users, setUsers] = useState([]);
    const myProfileData = JSON.parse(localStorage.getItem("my_profile_data"));

    const fetchUsers = async () => {
        const usersData = await getAllUsers();
        setUsers(usersData);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
            'startsWithG': user => /^G/i.test(user.first_name),
            'startsWithE': user => /^E/i.test(user.first_name),
            'all': user => true
        };
        return users.filter(filterMap[type]);
    };

    const filteredUsers = useMemo(() => {
        const lowerSearchValue = filters.searchValue.toLowerCase();
        return users.filter(user =>
            user.first_name.toLowerCase().includes(lowerSearchValue) ||
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
    const filterTypes = [
        { label: 'Все', value: 'all' },
        { label: 'Четные ID', value: 'even' },
        { label: 'Нечетные ID', value: 'odd' },
        { label: 'Имена на G', value: 'startsWithG' },
        { label: 'Имена на E', value: 'startsWithE' },
    ];

    return (
        <>
            <h1 className="title">Главная страница</h1>
            {!localStorage.getItem("my_profile_data") &&
                < div className="button-container">
                    <Link to="/registration">
                        <Button type="primary">Регистрация</Button>
                    </Link>
                </div >
            }
            <Input
                className="search-input"
                placeholder="Поиск по имени или почте"
                value={filters.searchValue}
                onChange={handleSearch}
            />
            {myProfileData &&
                <Card title="Мой профиль">
                    <Link to={`/user/profile`} className="user-link">
                        <div className="user-info">
                            <img src={myProfileData.avatar} alt="avatar" className="user-photo" />
                            <div className="user-details">
                                <p><strong>Имя:</strong> {`${myProfileData.first_name}`}</p>
                                <p><strong>Почта:</strong> {myProfileData.email}</p>
                            </div>
                        </div>
                    </Link>
                </Card >
            }
            {filterTypes.map((filterType) => (
                <Button
                    key={filterType.value}
                    onClick={() => setFilters((prev) =>
                        ({ ...prev, currentPage: 1, filterType: filterType.value }))}
                >
                    {filterType.label}
                </Button>
            ))}
            {
                usersOnPage.map(user => (
                    <Card key={user.id} title="Карточка пользователя">
                        <Link to={`/user/${user.id}`} className="user-link">
                            <div className="user-info">
                                <img src={user.avatar} alt="avatar" className="user-photo" />
                                <div className="user-details">
                                    <p><strong>Имя:</strong> {`${user.first_name} ${user?.last_name || ''}`}</p>
                                    <p><strong>Почта:</strong> {user.email}</p>
                                </div>
                            </div>
                        </Link>
                    </Card>
                ))
            }
            <Pagination
                className="pagination"
                current={currentPage}
                total={filteredUsersWithFilters.length}
                pageSize={pageSize}
                onChange={handlePageChange}
            />
        </>
    );
};

export default HomePage;
