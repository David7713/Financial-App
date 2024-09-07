import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContractsTable.css';
import PaginationContainer from './PaginationContainer';


const ContractsTable = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const contractsData = [
        { contractId: 1, name: "John Doe - The Lost World", author: "John Doe", originalTitle: "The Lost World", proprietor: "Tom Anderson", signedAt: "15/01/2022", expiryDate: "15/01/2024", status: "Expired", assignee: "Jane Smith", publisher: "ABC Publishing House" },
        { contractId: 2, name: "Witold Gombrowicz - Ferdydurke", author: "Witold Gombrowicz", originalTitle: "Ferdydurke", proprietor: "Tom Anderson", signedAt: "15/01/2022", expiryDate: "15/01/2024", status: "Signed", assignee: "Jane Smith", publisher: "ABC Publishing House" },
        { contractId: 3, name: "Richard Bachman - The Long Walk", author: "Richard Bachman", originalTitle: "The Long Walk", proprietor: "Tom Anderson", signedAt: "15/01/2022", expiryDate: "26/08/2024", status: "Signed", assignee: "Jane Smith", publisher: "ABC Publishing House" },
    ];

    const totalRows = contractsData.length;

    const startIndex = useMemo(() => (currentPage - 1) * rowsPerPage, [currentPage, rowsPerPage]);
    const endIndex = useMemo(() => Math.min(startIndex + rowsPerPage, totalRows), [startIndex, rowsPerPage, totalRows]);
    const displayedData = useMemo(() => contractsData.slice(startIndex, endIndex), [startIndex, endIndex, contractsData]);

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    };

    const isWithinOneMonth = (expiryDate) => {
        const today = new Date();
        const expiry = parseDate(expiryDate);
        const oneMonthFromNow = new Date(today);
        oneMonthFromNow.setMonth(today.getMonth() + 1);
        const differenceInMilliseconds = oneMonthFromNow - expiry;
        const differenceInDays = differenceInMilliseconds / 86400000;
        return differenceInDays <= 30 && differenceInDays > 0;
    };

    const handleContractClick = useCallback((contract) => {
        navigate(`/history/${contract.contractId}`, { state: { contract } });
    }, [navigate]);

    return (
        <div className="contracts-page">
            <div className="contracts-table">
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>AUTHOR</th>
                            <th>ORIGINAL TITLE</th>
                            <th>PROPRIETOR</th>
                            <th>SIGNED AT</th>
                            <th>EXPIRY DATE</th>
                            <th>STATUS</th>
                            <th>ASSIGNEE</th>
                            <th>PUBLISHER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((contract, index) => (
                            <tr
                                key={contract.contractId}
                                className={isWithinOneMonth(contract.expiryDate) ? 'expiring-soon' : ''}
                                onClick={() => handleContractClick(contract)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{contract.name}</td>
                                <td>{contract.author}</td>
                                <td>{contract.originalTitle}</td>
                                <td>{contract.proprietor}</td>
                                <td>{contract.signedAt}</td>
                                <td>{contract.expiryDate}</td>
                                <td className={contract.status.toLowerCase()}>{contract.status}</td>
                                <td>{contract.assignee}</td>
                                <td>{contract.publisher}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationContainer
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalRows={totalRows}
            />
        </div>
    );
};

export default ContractsTable;