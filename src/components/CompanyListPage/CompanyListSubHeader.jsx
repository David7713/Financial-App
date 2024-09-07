import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './CompanyListSubHeader.css';
import ArrowRight from '../../assets/svg/ArrowRight';

const CompanyListSubHeader = () => {
    const location = useLocation();
    const { company } = location.state || {};

    return (
        <div className="company-list-sub-header">
            <Link to="/companyListPage" className="sub-header-back-button">
                Companies
            </Link>
            <span className="sub-header-arrow-right">
                <ArrowRight />
            </span>
            <span className="sub-header-company-name">
                {company ? company.companyName : 'Company data is not available'}
            </span>
        </div>
    );
};

export default CompanyListSubHeader;
