import React, { useState, useEffect } from 'react';
import './SettingsChangePasswordPanel.css';
import { useNavigate } from 'react-router-dom';
import ShowPasswordIcon from '../../assets/svg/ShowPasswordIcon.jsx';
import HidePasswordIcon from '../../assets/svg/HidePasswordIcon.jsx';


const SettingsChangePasswordPanel = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isValid = password.length >= 8 && password === confirmPassword;
        setIsPasswordValid(isValid);
        if (isValid) {
            setShowError(false);
        }
    }, [password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isPasswordValid) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        try {
            const userId = "22"; // Change this to the user's ID fetch logic from the API
            console.log(JSON.stringify({ userId, password }));
            await new Promise(resolve => setTimeout(resolve, 500)); // API call simulation
            navigate('/settings/change-password-success');
        } catch (error) {
            console.error('Failed to reset password:', error);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="change-password-container">
            <div className="change-password-box">
                <h2>New password</h2>
                <p>Set a new password</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter a new password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                                {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                            </button>
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Repeat password..."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button type="button" className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="submit-button">
                        Save new password
                    </button>
                </form>
            </div>
            {showError && (
                <div className="error-popup">
                    <p>Passwords must match and be at least 8 characters long</p>
                </div>
            )}
        </div>
    );
};

export default SettingsChangePasswordPanel;