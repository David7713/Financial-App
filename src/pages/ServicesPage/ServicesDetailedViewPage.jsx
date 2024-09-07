import React from 'react';

import Sidebar from '../../components/MainPage/Sidebar';
import Header from '../../components/MainPage/Header';
import ServicesSubHeader from '../../components/ServicesPage/ServicesSubHeader';
import ServicesDetailedView from '../../components/ServicesPage/ServicesDetailedView';



const ServicesDetailedViewPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
            <ServicesSubHeader></ServicesSubHeader>
            <ServicesDetailedView></ServicesDetailedView>
         
            </main>
        </div>
    );
};

export default ServicesDetailedViewPage;
