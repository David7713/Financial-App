import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthorsTable.css';
import PaginationContainer from '../MainPage/PaginationContainer';
import authorsFields from '../../assets/data/authorsFields.json';


const AuthorsTable = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const keyLabelMap = useMemo(() => {
        return authorsFields.reduce((acc, item) => {
            acc[item.key] = item.title;
            return acc;
        }, {});
    }, []);

    const authorsData = [
        { authorId: 1, name: "Alice", surname: "Walker", amountPaid: 1123400, amountPending: 144400 },
        { authorId: 2, name: "John", surname: "Doe", amountPaid: 1123400, amountPending: 122345 },
        { authorId: 3, name: "Jane", surname: "Smith", amountPaid: 1123400, amountPending: 1223450 },
        { authorId: 4, name: "Bob", surname: "Johnson", amountPaid: 1123400, amountPending: 12234533 },
        { authorId: 5, name: "Mike", surname: "Jones", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 6, name: "Sarah", surname: "Lee", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 7, name: "Tom", surname: "Brown", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 8, name: "Emily", surname: "Davis", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 9, name: "Jack", surname: "Smith", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 10, name: "John", surname: "Doe", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 11, name: "Jane", surname: "Smith", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 12, name: "Bob", surname: "Johnson", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 13, name: "Mike", surname: "Jones", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 14, name: "Sarah", surname: "Lee", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 15, name: "Tom", surname: "Brown", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 16, name: "Emily", surname: "Davis", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 17, name: "Jack", surname: "Smith", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 18, name: "John", surname: "Doe", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 19, name: "Jane", surname: "Smith", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 20, name: "Bob", surname: "Johnson", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 21, name: "Mike", surname: "Jones", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 22, name: "Sarah", surname: "Lee", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 23, name: "Tom", surname: "Brown", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 24, name: "Emily", surname: "Davis", amountPaid: 1123400, amountPending: 1223523 },
        { authorId: 25, name: "Jack", surname: "Smith", amountPaid: 1123400, amountPending: 1223523 },
    ];

    const totalRows = authorsData.length;

    const startIndex = useMemo(() => (currentPage - 1) * rowsPerPage, [currentPage, rowsPerPage]);
    const endIndex = useMemo(() => Math.min(startIndex + rowsPerPage, totalRows), [startIndex, rowsPerPage, totalRows]);
    const displayedData = useMemo(() => authorsData.slice(startIndex, endIndex), [startIndex, endIndex, authorsData]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100);
    };

    return (
        <div className="authors-page">
            <div className="authors-table">
                <table>
                    <thead>
                        <tr>
                            {authorsFields.map((field) => (
                                <th key={field.key}>{field.title.toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((author) => (
                            <tr key={author.authorId}>
                                {authorsFields.map((field) => (
                                    <td key={field.key}>
                                        {field.type === 'float'
                                            ? formatCurrency(author[field.key])
                                            : author[field.key]}
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

export default AuthorsTable;
