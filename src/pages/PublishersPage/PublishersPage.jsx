import React from 'react';
import './PublishersPage.css';
import Sidebar from '../../components/MainPage/Sidebar';
import Header from '../../components/MainPage/Header';
import PublishersSubheader from '../../components/PublishersPage/PublishersSubheader';
import PublishersTable from '../../components/PublishersPage/PublishersTable';


const PublishersPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <PublishersSubheader />
                <PublishersTable />
            </main>
        </div>
    );
};

export default PublishersPage;
