import React, { useState, useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Sidebar.css';
import AriLogo from '../../assets/png/AriLogo.png';
import ContractIcon from '../../assets/svg/ContractIcon';
import InvoicesIcon from '../../assets/svg/InvoicesIcon';
import SettingsIcon from '../../assets/svg/SettingsIcon';
import LogoutIcon from '../../assets/svg/LogoutIcon';
import ReportingIcon from '../../assets/svg/ReportingIcon';
import AuthorsIcon from '../../assets/svg/AuthorsIcon';
import PublishersIcon from '../../assets/svg/PublishersIcon';


const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('');
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };
    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setActiveLink(path);
    }, [location]);
    

    const handleLogout = () => {
        logout(); // Set isAuthenticated to false
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                  <h3>Financial App</h3>
                                  </div>
            </div>
            <div className="sidebar-panel">
                <div className="links-block">
                    {/* <Link
                        to="/contracts"
                        className={`contracts-link ${activeLink === 'contracts' ? 'active-link' : ''}`}
                        onClick={() => handleLinkClick('contracts')}
                    >
                        <ContractIcon className="contracts-icon" />
                        <span className="contracts-text">Contracts</span>
                    </Link> */}
                    <Link
    to="/clients"
    className={`clients-link ${activeLink === 'clients' ? 'active-link' : ''}`}
    onClick={() => handleLinkClick('clients')}>
       <AuthorsIcon className="payments-icon" />
    <span className="clients-text">Clients</span>
</Link>
                    {/* <a href="#"
                    className={
                        `payments-link ${activeLink === 'payments' ? 'active-link' : ''}`
                        }
                    onClick={() => handleLinkClick('payments')}>
                        <InvoicesIcon className="payments-icon" />
                        <span className="payments-text">Payments</span>
                    </a> */}
                    {/* <a href="#"
                    className={
                        `reporting-link ${activeLink === 'reporting' ? 'active-link' : ''}`
                        }
                    onClick={() => handleLinkClick('reporting')}>
                        <ReportingIcon className="reporting-icon" />
                        <span className="reporting-text">Reporting</span>
                    </a> */}
                    {/* <Link
                        to="/authors"
                        className={
                            `authors-link ${activeLink === 'authors' ? 'active-link' : ''}`
                            }
                        onClick={() => handleLinkClick('authors')}>
                            <AuthorsIcon className="authors-icon" />
                            <span className="authors-text">Authors</span>
                    </Link> */}
                    <Link
                        to="/companyListPage"
                        className={
                            `companyList-link ${activeLink === 'companyList' ? 'active-link' : ''}`
                            }
                        onClick={() => handleLinkClick('companyList')}>
                            <PublishersIcon className="companyList-icon" />
                            <span className="companyList-text">Companies</span>
                    </Link>
                    <Link
    to="/services"
    className={`services-link ${activeLink === 'services' ? 'active-link' : ''}`}
    onClick={() => handleLinkClick('services')}>
   <ContractIcon className="companyList-icon" />
    <span className="services-text">Services</span>
</Link>

<Link
                to="/cashflow"
                className={`cashflow-link ${activeLink === 'cashflow' ? 'active-link' : ''}`}
                onClick={() => handleLinkClick('cashflow')}>
                <InvoicesIcon className="companyList-icon" />
                <span className="cashflow-text">Cash Flow</span>
            </Link>



                </div>

                <div className="settings-block">
                    <Link
                        to="/settings"
                        className={`settings-link ${activeLink === 'settings' ? 'active-link' : ''}`}
                        onClick={() => handleLinkClick('settings')}
                    >
                        <SettingsIcon className="settings-icon" />
                        <span className="settings-text">Settings</span>
                    </Link>
                    <hr className="separator" />
                    <a
                        href="#"
                        className="logout-link"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                    >
                        <LogoutIcon className="logout-icon" />
                        <span className="logout-text">Log out</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;