import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SettingsMainPage from './SettingsMainPage/SettingsMainPage';
import SettingsChangePassword from './SettingsChangePassword/SettingsChangePassword';
import SettingsChangePasswordSuccess from './SettingsChangePasswordSuccess/SettingsChangePasswordSuccess';


const SettingsPage = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SettingsMainPage />} />
                <Route path="/change-password-set-email" element={<SettingsChangePassword />} />
                <Route path="/change-password-success" element={<SettingsChangePasswordSuccess />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default SettingsPage;