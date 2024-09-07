import React, { useState, useContext } from 'react';
import './NotificationsFullPage.css';
import ArrowRight from '../../assets/svg/ArrowRight';
import CloseNotificationIcon from '../../assets/svg/CloseNotificationIcon';
import { NotificationsBaseContext } from '../../contexts/NotificationsBase';


const NotificationItem = ({ id, text, timestamp, link, onRemove }) => (
    <div className="notification-block">
        <div className="notification-content-full">
            <p>{text}</p>
            {link && (
                <a href={link} className="notification-link">
                    {'Check Contract'}
                    <ArrowRight />
                </a>
            )}
        </div>
        <div className="notification-right">
            <span className="notification-time">{timestamp}</span>
            <button className="close-notification-button" onClick={() => onRemove(id)}>
                <CloseNotificationIcon />
            </button>
        </div>
    </div>
);

const NotificationsFullPage = () => {
    const { notifications, setNotifications } = useContext(NotificationsBaseContext);

    const removeNotification = (id) => {
        setNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== id));
    };

    return (
        <div className="notifications-container">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        {...notification}
                        onRemove={removeNotification}
                    />
                ))
            ) : (
                <p>You have no notifications yet</p>
            )}
        </div>
    );
};

export default NotificationsFullPage;