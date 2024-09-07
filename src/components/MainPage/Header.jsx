import React, { useState, useRef, useEffect, useContext } from 'react';
import './Header.css';
import NotificationIcon from '../../assets/svg/NotificationIcon';
import NotificationIconOpen from '../../assets/svg/NotificationIconOpen';
import NotificationsPopout from './NotificationsPopout';
import { NotificationsBaseContext } from '../../contexts/NotificationsBase';


const Header = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const notificationRef = useRef(null);
    const { notifications } = useContext(NotificationsBaseContext);

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setIsNotificationOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="welcome-text">Welcome to Financial  Space</div>
            <div className="right-section">
                <div className="notification-wrapper" ref={notificationRef}>
                    <button
                        className={`notification-icon ${isNotificationOpen ? 'active' : ''}`}
                        onClick={toggleNotification}
                    >
                        {isNotificationOpen ? <NotificationIconOpen /> : <NotificationIcon />}
                    </button>
                    {isNotificationOpen && <NotificationsPopout />}
                </div>
                <div className="divider"></div>
                <div className="user-info">
                  <a className="user-avatar"></a>
                  <div className="user-name">Ann Smith</div>
                </div>
            </div>
        </header>
    );
};

export default Header;