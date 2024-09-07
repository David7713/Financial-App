import React from 'react';
import './SettingsMainPage.css';
import Sidebar from '../../../components/MainPage/Sidebar';
import Header from '../../../components/MainPage/Header';
import SettingsMainSubheader from '../../../components/UserSettings/SettingsMainSubheader';
import SettingsPersonalDataMainPanel from '../../../components/UserSettings/SettingsPersonalDataMainPanel';


const SettingsPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <SettingsMainSubheader />
                <SettingsPersonalDataMainPanel />
            </main>
        </div>
    );
};

export default SettingsPage;
