import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ArrowRight from '../../assets/svg/ArrowRight'; // Assuming you have this SVG file
import './CashFlowSubHeader.css';

const CashFlowSubHeader = () => {
    const location = useLocation();
    const { cashFlow } = location.state || {}; // Access 'cashFlow' from location.state

    return (
        <div className="cash-flow-page-sub-header">
            <Link to="/cashflow" className="sub-header-back-button">
                Cash Flow
            </Link>
            <span className="sub-header-arrow-right">
                <ArrowRight />
            </span>
            <span className="sub-header-cash-flow-name">
                {cashFlow ? cashFlow.legalEntity : 'Cash Flow data is not available'}
            </span>
        </div>
    );
};

export default CashFlowSubHeader;
