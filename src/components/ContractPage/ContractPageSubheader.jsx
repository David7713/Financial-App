import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ContractPageSubheader.css';
import ArrowRight from '../../assets/svg/ArrowRight';


const ContractPageSubheader = () => {
    const location = useLocation();
    const { contract } = location.state || {};

    return (
        <div className="contract-page-sub-header">
            <Link to="/" className="sub-header-back-button">
                <p>Contracts</p>
            </Link>
            <span className="sub-header-arrow-right">
                <ArrowRight />
            </span>
            <p className="sub-header-contract-name">
                {contract ? contract.name : 'Contract data is not available'}
            </p>
        </div>
    );
};

export default ContractPageSubheader;