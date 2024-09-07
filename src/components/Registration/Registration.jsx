import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AriLogo from '../../assets/png/AriLogo.png';
import CheckMark from '../../assets/svg/CheckMark.jsx';
import ShowPasswordIcon from '../../assets/svg/ShowPasswordIcon.jsx';
import HidePasswordIcon from '../../assets/svg/HidePasswordIcon.jsx';
import './Registration.css'

const Registration = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEmailValid) {
            setShowEmailError(true);
            setTimeout(() => setShowEmailError(false), 3000);
            return;
        }
        console.log(JSON.stringify({ name, surname, email, password }));
        try {
            await register(name, surname, email, password);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <div className="logo">
                    <img src={AriLogo} alt="ARI Logo" />
                </div>
                <p>Create your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            placeholder="Enter your surname..."
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>
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
                    <button
                        type="submit"
                        className="registration-button"
                    >
                        Register
                    </button>
                </form>
                <Link to="/login" className="forgot-password">Already have an account? Log in</Link>
            </div>
            {showEmailError && (
                <div className="error-popup">
                    <p>Please provide a correct email</p>
                </div>
            )}
        </div>
    );
};

export default Registration;
