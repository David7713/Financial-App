import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ContractPageNavigation.css';

const ContractPageNavigation = () => {
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();
    const { contract } = location.state || {};

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    const navigationLinks = [
        { id: 1, name: 'main-info', text: 'Main Information' },
        { id: 2, name: 'reporting', text: 'Reporting' },
        { id: 3, name: 'payments', text: 'Payments' },
        { id: 4, name: 'history', text: 'History' },
        { id: 5, name: 'commission-rates', text: 'Commission Rates' },
    ];

    return (
        <div className="contract-page-navigation-block">
            {navigationLinks.map((link) => (
                <Link
                    key={link.id}
                    to={`/${link.name}/${contract?.contractId || ':contractId'}`}
                    state={{ contract }}
                    className={`navigation-link ${activeLink === link.name ? 'active-link' : ''}`}
                    onClick={() => handleLinkClick(link.name)}
                >
                    <span className={`${link.name}-text`}>{link.text}</span>
                </Link>
            ))}
        </div>
    );
};

export default ContractPageNavigation;