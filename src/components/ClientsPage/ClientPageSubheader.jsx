import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ClientPageSubheader.css';
import ArrowRight from '../../assets/svg/ArrowRight';

const ClientPageSubHeader = () => {
    const location = useLocation();
    const { client } = location.state || {};

    return (
        <div className="client-page-sub-header">
            <Link to="/Clients" className="sub-header-back-button">
                Clients
            </Link>
            <span className="sub-header-arrow-right">
                <ArrowRight />
            </span>
            <span className="sub-header-client-name">
                {client ? client.fullNameOfContactPerson : 'Client data is not available'}
            </span>
        </div>
    );
};

export default ClientPageSubHeader;