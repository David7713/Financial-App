import React, { useState, useEffect } from 'react';
import './ForgotPassword.css';
import AriLogo from '../../assets/png/AriLogo.png';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    useEffect(() => {
        const valid = emailPattern.test(email);
        setIsEmailValid(valid);
        if (valid) {
            setShowEmailError(false);
        }
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEmailValid) {
            setShowEmailError(true);
            setTimeout(() => setShowEmailError(false), 3000);
            return;
        }
        console.log(JSON.stringify({ email }));
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setShowSuccessMessage(true);
            setEmail('');
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 8000);
        } catch (error) {
            console.error('Failed to send reset email:', error);
        }
    };

    return (
        <div className="recover-password-container">
            <div className="recover-password-box">
                <div className="logo">
                    <img src={AriLogo} alt="ARI Logo" />
                </div>
                <h2>Recover password</h2>
                <p>We will send you a link to your email to recover your password</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Get email
                    </button>
                </form>
            </div>
            {showEmailError && (
                <div className="error-popup">
                    <p>Please provide a correct email</p>
                </div>
            )}
            {showSuccessMessage && (
                <div className="success-popup">
                    <p>You will receive a password reset link to an email shortly</p>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;