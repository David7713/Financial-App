import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ArrowRight from '../../assets/svg/ArrowRight';
import './ServicesSubHeader.css'
const ServicesSubHeader = () => {
    const location = useLocation();
    const { service } = location.state || {}; // Updated to access 'service'

    return (
        <div className="services-page-sub-header">
            <Link to="/services" className="sub-header-back-button">
                Services
            </Link>
            <span className="sub-header-arrow-right">
                <ArrowRight />
            </span>
            <span className="sub-header-service-name">
                {service ? service.name : 'Service data is not available'}
            </span>
        </div>
    );
};

export default ServicesSubHeader;
