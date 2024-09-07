import React, { useMemo, useCallback, useState } from 'react';
import PaginationContainer from '../MainPage/PaginationContainer';
import { useNavigate } from 'react-router-dom';
import { useCashFlowContext } from '../../contexts/CashFlowContext';
import './CashFlowTable.css';

const CashFlowTable = () => {
  // Fetch data from context
  const { cashFlows } = useCashFlowContext();
  
  // Initialize state for pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Compute total rows based on cashFlows
  const totalRows = cashFlows.length;

  // Calculate start and end indices for pagination
  const startIndex = useMemo(() => (currentPage - 1) * rowsPerPage, [currentPage, rowsPerPage]);
  const endIndex = useMemo(() => Math.min(startIndex + rowsPerPage, totalRows), [startIndex, rowsPerPage, totalRows]);
  
  // Slice cashFlows array to get the current page's data
  const currentCashFlows = cashFlows.slice(startIndex, endIndex);

  const navigate = useNavigate();

  // Handle row click to navigate to detailed view
  const handleRowClick = useCallback((cashFlow) => {
    navigate(`/cashflow/view/${cashFlow.id}`, { state: { cashFlow } });
  }, [navigate]);

  return (
    <div className="cash-flow-table-container">
      <table>
        <thead>
          <tr>
            <th>LEGAL ENTITY</th>
            <th>SERVICE</th>
            <th>FROM</th>
            <th>DATE OF ADMISSION</th>
            <th>SUM</th>
          </tr>
        </thead>
        <tbody>
          {currentCashFlows.map((cashFlow) => (
            <tr
              key={cashFlow.id}
              onClick={() => handleRowClick(cashFlow)}
              style={{ cursor: 'pointer' }}
            >
              <td>{cashFlow.legalEntity}</td>
              <td>{cashFlow.service}</td>
              <td>{cashFlow.from}</td>
              <td>{cashFlow.dateOfAdmission}</td>
              <td>{cashFlow.sum}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
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

export default CashFlowTable;
