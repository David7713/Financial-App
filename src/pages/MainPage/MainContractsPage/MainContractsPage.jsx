import React from 'react';
import './MainContractsPage.css';
import Sidebar from '../../../components/MainPage/Sidebar';
import Header from '../../../components/MainPage/Header';
import SubHeader from '../../../components/MainPage/SubHeader';
import FilterPanel from '../../../components/MainPage/FilterPanel';
import ContractsTable from '../../../components/MainPage/ContractsTable';


const MainPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <SubHeader />
                <FilterPanel />
                <ContractsTable />
            </main>
        </div>
    );
};

export default MainPage;
