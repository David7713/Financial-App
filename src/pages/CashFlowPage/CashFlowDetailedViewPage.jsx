import React from 'react';

import Sidebar from '../../components/MainPage/Sidebar';
import Header from '../../components/MainPage/Header';
import CashFlowDetailedView from '../../components/CashFlowPage/CashFlowDetailedView';
import CashFlowSubHeader from '../../components/CashFlowPage/CashFlowSubHeader';



const CashFlowDetailedViewPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <CashFlowSubHeader></CashFlowSubHeader>
           <CashFlowDetailedView></CashFlowDetailedView>
         
            </main>
        </div>
    );
};

export default CashFlowDetailedViewPage;
