import React from 'react';
import './SettingsChangePasswordSuccess.css';
import Sidebar from '../../../components/MainPage/Sidebar';
import Header from '../../../components/MainPage/Header';
import SettingsChangePasswordSuccessPanel from '../../../components/UserSettings/SettingsChangePasswordSuccessPanel';
import SettingsChangePasswordSubheader from '../../../components/UserSettings/SettingsChangePasswordSubheader';


const SettingsChangePasswordSuccess = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <SettingsChangePasswordSubheader />
                <SettingsChangePasswordSuccessPanel />
            </main>
        </div>
    );
};

export default SettingsChangePasswordSuccess;
