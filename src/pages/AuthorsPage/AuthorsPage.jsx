import React from 'react';
import './AuthorsPage.css';
import Header from '../../components/MainPage/Header';
import Sidebar from '../../components/MainPage/Sidebar';
import AuthorsSubheader from '../../components/AuthorsPage/AuthorsSubheader';
import AuthorsTable from '../../components/AuthorsPage/AuthorsTable';


const AuthorsPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <AuthorsSubheader />
                <AuthorsTable />
            </main>
        </div>
    );
};

export default AuthorsPage;
