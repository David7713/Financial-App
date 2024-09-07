import React from 'react';
import './CompanyListPage.css';
import Sidebar from '../../components/MainPage/Sidebar';
import Header from '../../components/MainPage/Header';
import CompanyListPageHeader from '../../components/CompanyListPage/CompanyListPageHeader';
import CompanyListPageTable from '../../components/CompanyListPage/CompanyListPageTable';
import CompanyDetailedViewPage from './CompanyDetailedViewPage';
import { useNavigate } from 'react-router-dom';

const CompanyListPage = () => {
    const navigate = useNavigate();

    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <CompanyListPageHeader />
                <CompanyListPageTable />
               
            </main>
        </div>
    );
};

export default CompanyListPage;
