import React from 'react';

import Sidebar from '../../components/MainPage/Sidebar';
import Header from '../../components/MainPage/Header';
import CompanyDetailedView from '../../components/CompanyListPage/CompanyDetailedView';
import CompanyListSubHeader from '../../components/CompanyListPage/CompanyListSubHeader';


const CompanyDetailedViewPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
               <CompanyListSubHeader></CompanyListSubHeader>
               <CompanyDetailedView></CompanyDetailedView>
         
            </main>
        </div>
    );
};

export default CompanyDetailedViewPage;
