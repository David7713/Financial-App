import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsChangePasswordSuccessPanel.css';


const SettingsChangePasswordSuccessPanel = () => {
    const navigate = useNavigate();

    const handleOpenSettings = () => {
        navigate('/settings');
    };

    return (
        <div className="change-password-success-container">
            <div className="change-password-success-container-box">
                <h2>You're all set!</h2>
                <p>Your password has successfully been changed</p>
                <button
                    type="button"
                    className="submit-button"
                    onClick={handleOpenSettings}
                >
                    Open Settings page
                </button>
            </div>
        </div>
    );
};

export default SettingsChangePasswordSuccessPanel;
