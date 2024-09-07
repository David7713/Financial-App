import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyListPageTable.css';
import PaginationContainer from '../MainPage/PaginationContainer';
import { useCompanyContext } from '../../contexts/CompanyContext';

const CompanyListPageTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { companies } = useCompanyContext();

  const totalRows = companies.length;

  const startIndex = useMemo(() => (currentPage - 1) * rowsPerPage, [currentPage, rowsPerPage]);
  const endIndex = useMemo(() => Math.min(startIndex + rowsPerPage, totalRows), [startIndex, rowsPerPage, totalRows]);
  const displayedData = useMemo(() => companies.slice(startIndex, endIndex), [startIndex, endIndex, companies]);

  const handleRowClick = (company) => {
    navigate(`/companyListPage/view/${company.companyId}`, { state: { company } });
    console.log('company:', company);
  };

  return (
    <div className="clients-page">
      <div className="clients-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>EMAIL</th>
              <th>OWNER NAME</th>
              <th>ENTITIES NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((company) => (
              <tr
                key={company.companyId}
                onClick={() => handleRowClick(company)}
                style={{ cursor: 'pointer' }}
              >
                <td>{company.companyId}</td>
                <td>{company.companyName}</td>
                <td>{company.email}</td>
                <td>{company.ownersFullName}</td>
                <td>{company.entities.length}</td> 
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

export default CompanyListPageTable;
