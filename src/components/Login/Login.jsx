import React, { useContext, useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AriLogo from '../../assets/png/AriLogo.png';
import CheckMark from '../../assets/svg/CheckMark.jsx';
import ShowPasswordIcon from '../../assets/svg/ShowPasswordIcon.jsx';
import HidePasswordIcon from '../../assets/svg/HidePasswordIcon.jsx';


const Login = ({ onLogout }) => {
    const { login, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [saveLogin, setSaveLogin] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);

    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    useEffect(() => {
        const valid = emailPattern.test(email);
        setIsEmailValid(valid);
        if (valid) {
            setShowEmailError(false);
        }
    }, [email]);

    useEffect(() => {
        if (isAuthenticated && onLogout) {
            onLogout();
        }
    }, [isAuthenticated, onLogout]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEmailValid) {
            setShowEmailError(true);
            setTimeout(() => setShowEmailError(false), 3000);
            return;
        }
        console.log(JSON.stringify({ email, password, saveLogin }));
        try {
            await login(email, password);
            navigate('/clients');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = () => {
        logout();
        setEmail('');
        setPassword('');
        setSaveLogin(false);
    };

    const handleCheckboxChange = () => {
        setSaveLogin(prev => !prev);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo">
                    {/* <img src={AriLogo} alt="ARI Logo" /> */}
                </div>
                <p>Welcome to Financial APP</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                                {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                            </button>
                        </div>
                    </div>
                    <div className="input-group checkbox">
                        <div className="checkbox-wrapper" onClick={handleCheckboxChange}>
                            <input
                                type="checkbox"
                                id="saveLogin"
                                name="saveLogin"
                                checked={saveLogin}
                                onChange={handleCheckboxChange}
                            />
                            <div className={`checkbox-icon ${saveLogin ? 'checked' : ''}`}>
                                <CheckMark />
                            </div>
                        </div>
                        <label htmlFor="saveLogin">Save log in</label>
                    </div>
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Log in
                    </button>
                </form>
                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
            </div>
            {showEmailError && (
                <div className="error-popup">
                    <p>Please provide a correct email</p>
                </div>
            )}
        </div>
    );
};

export default Login;