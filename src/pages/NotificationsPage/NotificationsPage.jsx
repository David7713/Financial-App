import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotificationsFullPage from './NotificationsFullPage/NotificationsFullPage';


const NotificationsPage = () => (
    <div>
        <Routes>
            <Route path="/" element={<NotificationsFullPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
);

export default NotificationsPage;