import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './PublishersTable.css';
import PaginationContainer from '../MainPage/PaginationContainer';
import publisherFields from '../../assets/data/publisherFields.json';

const PublishersTable = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const keyLabelMap = useMemo(() => {
        return publisherFields.reduce((acc, item) => {
            acc[item.key] = item.title;
            return acc;
        }, {});
    }, []);

    const publishersData = [
        { publisherId: 1, publisher: "ABC Publishing House", amountPaid: 13440000, amountPending: 144400 },
        { publisherId: 2, publisher: "XYZ Publishing House", amountPaid: 1123400, amountPending: 122345 },
        { publisherId: 3, publisher: "DEF Publishing House", amountPaid: 11234, amountPending: 1223450 },
        { publisherId: 4, publisher: "GHI Publishing House", amountPaid: 1123430, amountPending: 12234533 },
        { publisherId: 5, publisher: "JKL Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 6, publisher: "MNO Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 7, publisher: "PQR Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 8, publisher: "STU Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 9, publisher: "VWX Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 10, publisher: "XYZ Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 11, publisher: "PBS Publishing House", amountPaid: 13440000, amountPending: 144400 },
        { publisherId: 12, publisher: "TOF Publishing House", amountPaid: 1123400, amountPending: 122345 },
        { publisherId: 13, publisher: "DEF Publishing House", amountPaid: 11234, amountPending: 1223450 },
        { publisherId: 14, publisher: "GHI Publishing House", amountPaid: 1123430, amountPending: 12234533 },
        { publisherId: 15, publisher: "JKL Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 16, publisher: "MNO Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 17, publisher: "PQR Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 18, publisher: "STU Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 19, publisher: "VWX Publishing House", amountPaid: 1123400, amountPending: 1223523 },
        { publisherId: 20, publisher: "XYZ Publishing House", amountPaid: 1123400, amountPending: 1223523 },
    ];

    const totalRows = publishersData.length;

    const startIndex = useMemo(() => (currentPage - 1) * rowsPerPage, [currentPage, rowsPerPage]);
    const endIndex = useMemo(() => Math.min(startIndex + rowsPerPage, totalRows), [startIndex, rowsPerPage, totalRows]);
    const displayedData = useMemo(() => publishersData.slice(startIndex, endIndex), [startIndex, endIndex, publishersData]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100);
    };

    return (
        <div className="publishers-page">
            <div className="publishers-table">
                <table>
                    <thead>
                        <tr>
                            {publisherFields.map((field) => (
                                <th key={field.key}>{field.title.toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((publisher) => (
                            <tr key={publisher.publisherId}>
                                {publisherFields.map((field) => (
                                    <td key={field.key}>
                                        {field.type === 'float'
                                            ? formatCurrency(publisher[field.key])
                                            : publisher[field.key]}
                                    </td>
                                ))}
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

export default PublishersTable;