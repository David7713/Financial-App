import React from 'react';
import './SettingsChangePasswordSubheader.css';
import ArrowLeft2 from '../../assets/svg/ArrowLeft2';
import { Link, useNavigate } from 'react-router-dom';


const SettingsChangePasswordSubheader = () => {
    const navigate = useNavigate();

    const handleBackButton = (e) => {
        e.preventDefault();
        navigate('..');
    };

    return (
        <div className="sub-header">
            <button className="back-button" onClick={handleBackButton}>
                <ArrowLeft2 />
                <span>Back to Settings</span>
            </button>
        </div>
    );
};

export default SettingsChangePasswordSubheader;