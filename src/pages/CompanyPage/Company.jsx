import React from 'react';
import './Company.css';
import Sidebar from '../../components/MainPage/Sidebar'
import Header from '../../components/MainPage/Header'
import SubHeader from '../../components/MainPage/SubHeader'
import CreateCompany from '../../components/CompanyPage/CreateCompany';


const Company = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <CreateCompany />
            </main>
        </div>
    );
};

export default Company;
