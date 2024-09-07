import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyListPageHeader.css';

const CompanyListPageHeader = () => {
    const navigate = useNavigate();

    const handleAddCompanyClick = () => {
        navigate('/createCompany');
    };

    return (
        <div >
            <div className='companies-headline-part'>
            <h2 className="companies">Companies</h2>
            <button className='add-company-button' onClick={handleAddCompanyClick}>+ Add Company</button>
          </div>
        </div>
    );
};

export default CompanyListPageHeader;
