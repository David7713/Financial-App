import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './ContractPageHistoryTable.css';
import PaginationContainer from '../MainPage/PaginationContainer';
import filterFields from '../../assets/data/filterFields.json';


const ContractPageHistoryTable = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { contractId } = useParams();

    const keyLabelMap = useMemo(() => {
        return filterFields.reduce((acc, item) => {
            acc[item.key] = item.title;
            return acc;
        }, {});
    }, []);

    const contractsChangesData = [
        { changeId: 1, contractId: 1, dateOfChange: "15/01/2022", initialInformation: { languageOfTheTranslation: "Spanish" }, changedInformation: { languageOfTheTranslation: "German" }, doneBy: "Tom Anderson" },
        { changeId: 2, contractId: 1, dateOfChange: "02/01/2023", initialInformation: { contractRetailPrice: "$25.00" }, changedInformation: { contractRetailPrice: "$28.00" }, doneBy: "Tom Anderson" },
        { changeId: 3, contractId: 1, dateOfChange: "12/07/2024", initialInformation: { regularPaper: "Yes" }, changedInformation: { regularPaper: "No" }, doneBy: "David Johnson" },
        { changeId: 4, contractId: 2, dateOfChange: "24/02/2021", initialInformation: { advancedPaymentsCurrency: "USD" }, changedInformation: { advancedPaymentsCurrency: "EUR" }, doneBy: "Emily White" },
        { changeId: 5, contractId: 2, dateOfChange: "12/01/2020", initialInformation: { downloadPercent: "10" }, changedInformation: { downloadPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 6, contractId: 1, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 7, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 8, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 9, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 10, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 11, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 12, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 13, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 14, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 15, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 16, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 17, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 18, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 19, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
        { changeId: 20, contractId: 2, dateOfChange: "25/03/2024", initialInformation: { streamingPercent: "10" }, changedInformation: { streamingPercent: "20" }, doneBy: "Tom Anderson" },
    ];

    const filteredData = useMemo(() =>
        contractsChangesData.filter(change => change.contractId === parseInt(contractId)),
        [contractId, contractsChangesData]
    );

    const totalRows = contractsChangesData.length;

    const startIndex = useMemo(() => (currentPage - 1) * rowsPerPage, [currentPage, rowsPerPage]);
    const endIndex = useMemo(() => Math.min(startIndex + rowsPerPage, totalRows), [startIndex, rowsPerPage, totalRows]);
    const displayedData = useMemo(() => filteredData.slice(startIndex, endIndex), [startIndex, endIndex, filteredData]);

    const formatChanges = (changes) => {
        return Object.entries(changes).map(([key, value]) => (
            <div key={key} className="change-item">
                <span className="change-label">{keyLabelMap[key] || key}</span>
                <span className="change-value">{value}</span>
            </div>
        ));
    };

    return (
        <div className="contract-page-history">
            <span className="contract-history-table-description">
                Here are all changes done to this contract
            </span>
            <div className="contract-history-table">
                <table>
                    <thead>
                        <tr>
                            <th>DATE OF CHANGE</th>
                            <th>INITIAL INFORMATION</th>
                            <th>CHANGED INFORMATION</th>
                            <th>DONE BY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((change) => (
                            <tr key={change.changeId}>
                                <td>{change.dateOfChange}</td>
                                <td className="initial-information">
                                    {formatChanges(change.initialInformation)}
                                </td>
                                <td className="changed-information">
                                    {formatChanges(change.changedInformation)}
                                </td>
                                <td>{change.doneBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="history-table-pagination-container">
                <PaginationContainer
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalRows={totalRows}
                />
            </div>
        </div>
    );
};

export default ContractPageHistoryTable;
