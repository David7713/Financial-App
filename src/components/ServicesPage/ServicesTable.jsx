import React, { useMemo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesTable.css';
import { useServiceContext } from '../../contexts/ServiceContext'; // Make sure this hook is correctly defined
import PaginationContainer from '../MainPage/PaginationContainer';

const ServicesTable = () => {
  
  const { services } = useServiceContext(); // Use the custom hook
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);



  const totalRows = services.length;

  const startIndex = useMemo(() => (currentPage - 1) * rowsPerPage, [currentPage, rowsPerPage]);
  const endIndex = useMemo(() => Math.min(startIndex + rowsPerPage, totalRows), [startIndex, rowsPerPage, totalRows]);
  


  const handleServiceClick = useCallback((service) => {
    navigate(`/services/view/${service.id}`, { state: { service } });
  }, [navigate]);

  return (
    <div className="services-table-container">
      <table>
        <thead>
          <tr>
            <th>SERVICE NAME</th>
            <th>CATEGORY</th>
            <th>TYPE</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
  {services.slice(startIndex, endIndex).map((service) => (
    <tr
      key={service.id} // Consider using a unique identifier like `service.id`
      onClick={() => handleServiceClick(service)}
      style={{ cursor: 'pointer' }}
    >
      <td>{service.name}</td>
      <td>{service.category}</td>
      <td>{service.type}</td>
      <td>{service.price}</td>
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

export default ServicesTable;
