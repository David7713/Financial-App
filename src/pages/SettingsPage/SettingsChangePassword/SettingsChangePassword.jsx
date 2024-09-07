import React from 'react';
import './SettingsChangePassword.css';
import Sidebar from '../../../components/MainPage/Sidebar';
import Header from '../../../components/MainPage/Header';
import SettingsChangePasswordSubheader from '../../../components/UserSettings/SettingsChangePasswordSubheader';
import SettingsChangePasswordPanel from '../../../components/UserSettings/SettingsChangePasswordPanel';


const SettingsChangePassword = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <SettingsChangePasswordSubheader />
                <SettingsChangePasswordPanel />
            </main>
        </div>
    );
};

export default SettingsChangePassword;