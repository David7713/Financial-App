import React from 'react';

import Sidebar from '../../components/MainPage/Sidebar';
import Header from '../../components/MainPage/Header';
import ClientsDetailedView from '../../components/ClientsPage/ClientsDetailedView'
// import ClientPageSubHeader from '../../components/ClientsPage/ClientPageSubHeader';

import ClientPageSubheader from '../../components/ClientsPage/ClientPageSubheader'


const ClientsDetailedViewPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <ClientPageSubheader></ClientPageSubheader>
                <ClientsDetailedView></ClientsDetailedView>
         
            </main>
        </div>
    );
};

export default ClientsDetailedViewPage;
