import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainContractsPage from './MainContractsPage/MainContractsPage';
import HistoryContractPage from './HistoryContractPage/HistoryContractPage';


const MainPage = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainContractsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default MainPage;