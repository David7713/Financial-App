import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecoverPassword.css';
import AriLogo from '../../assets/png/AriLogo.png';
import ShowPasswordIcon from '../../assets/svg/ShowPasswordIcon.jsx';
import HidePasswordIcon from '../../assets/svg/HidePasswordIcon.jsx';


const RecoverPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(true);
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const verifyToken = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const isValid = Math.random() > 0.5;
                if (isMounted) {
                    setIsTokenValid(isValid);
                    if (!isValid) {
                        setShowError(true);
                        setTimeout(() => setShowError(false), 3000);
                    }
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                if (isMounted) {
                    setIsTokenValid(false);
                    setShowError(true);
                    setTimeout(() => setShowError(false), 3000);
                }
            }
        };

        verifyToken();

        return () => {
            isMounted = false;
        };
    }, [token]);

    useEffect(() => {
        const isValid = password.length >= 8 && password === confirmPassword;
        setIsPasswordValid(isValid);
        if (isValid) {
            setShowError(false);
        }
    }, [password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isTokenValid) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        if (!isPasswordValid) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        try {
            console.log(JSON.stringify({ token, password }));
            await new Promise(resolve => setTimeout(resolve, 500));

            if (Math.random() > 0.8) {
                throw new Error('Server error: Unable to reset password');
            }

            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Failed to reset password:', error);
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    if (!isTokenValid) {
        return (
            <div className="recover-password-container">
                <div className="recover-password-box">
                    <div className="logo">
                        <img src={AriLogo} alt="ARI Logo" />
                    </div>
                    <h2>Invalid Token</h2>
                    <p>Invalid or expired token. Please request a new password reset</p>
                    <button onClick={() => navigate('/forgot-password')} className="submit-button">
                        Request New Reset
                    </button>
                </div>
                {showError && (
                    <div className="error-popup">
                        <p>Invalid or expired token. Please request a new password reset</p>
                    </div>
                )}
            </div>
        );
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="recover-password-container">
            <div className="recover-password-box">
                <div className="logo">
                    <img src={AriLogo} alt="ARI Logo" />
                </div>
                <h2>Recover Password</h2>
                <p>Set a new password to log in</p>
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
                        <label htmlFor="confirmPassword">Confirm Password</label>
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
            {showSuccessMessage && (
                <div className="success-popup">
                    <p>Password reset successful. Redirecting to login...</p>
                </div>
            )}
        </div>
    );
};

export default RecoverPassword;
