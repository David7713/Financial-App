import React from 'react';
import Sidebar from '../../../components/MainPage/Sidebar';
import Header from '../../../components/MainPage/Header';
import NotificationsFullPageSubHeader from '../../../components/NotificationsPage/NotificationsFullPageSubHeader';
import NotificationsFullPage from '../../../components/NotificationsPage/NotificationsFullPage';


const NotificationsPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <NotificationsFullPageSubHeader />
                <NotificationsFullPage />
            </main>
        </div>
    );
};

export default NotificationsPage;