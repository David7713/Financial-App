import React from 'react';
import './HistoryContractPage.css';
import Sidebar from '../../../components/MainPage/Sidebar';
import Header from '../../../components/MainPage/Header';
import ContractPageSubheader from '../../../components/ContractPage/ContractPageSubheader';
import ContractPageContractManagement from '../../../components/ContractPage/ContractPageContractManagement';
import ContractPageNavigation from '../../../components/ContractPage/ContractPageNavigation';
import ContractPageHistoryTable from '../../../components/ContractPage/ContractPageHistoryTable';
import ContractPageHistoryPageAttachments from '../../../components/ContractPage/ContractPageHistoryPageAttachments';


const HistoryContractPage = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <ContractPageSubheader />
                <ContractPageContractManagement />
                <ContractPageNavigation />
                <div className="contract-page-history-table-and-attachments">
                    <div className="contract-page-history-table">
                        <ContractPageHistoryTable />
                    </div>
                    <div className="contract-page-history-attachments">
                        <ContractPageHistoryPageAttachments />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HistoryContractPage;