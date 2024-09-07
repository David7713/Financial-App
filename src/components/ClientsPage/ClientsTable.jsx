import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClientsTable.css';
import PaginationContainer from '../MainPage/PaginationContainer';
import { useClientContext } from '../../contexts/ClientContext';

const typeMappings = {
  Type1: 'Supplier',
  Type2: 'Partner',
  Type3: 'Receiver',
  Type4: 'Shipper'
};

const ClientsTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { clients } = useClientContext();
  const navigate = useNavigate();

  const totalRows = clients.length;
  const startIndex = useMemo(() => (currentPage - 1) * rowsPerPage, [currentPage, rowsPerPage]);
  const endIndex = useMemo(() => Math.min(startIndex + rowsPerPage, totalRows), [startIndex, rowsPerPage, totalRows]);
  const displayedData = useMemo(() => clients.slice(startIndex, endIndex), [startIndex, endIndex, clients]);

  const handleClientClick = useCallback((client) => {
    navigate(`/clients/view/${client.id}`, { state: { client } });
  }, [navigate]);

  return (
    <div className="clients-page">
      <div className="clients-table">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>TYPE</th>
              <th>COMPANY NAME</th>
              <th>PHONE NUMBER</th>
              <th>DUTY</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((client) => (
              <tr
                key={client.id}
                onClick={() => handleClientClick(client)}
                style={{ cursor: 'pointer' }}
              >
                <td>{client.fullNameOfContactPerson}</td>
                <td>{typeMappings[client.type] || client.type}</td> {/* Display mapped type */}
                <td>{client.companyName}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.duty}</td>
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

export default ClientsTable;
