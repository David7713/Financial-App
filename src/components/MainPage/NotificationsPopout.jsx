import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationsBaseContext } from '../../contexts/NotificationsBase';
import ArrowRight from '../../assets/svg/ArrowRight';


const NotificationsPopout = () => {
    const navigate = useNavigate();
    const { notifications } = useContext(NotificationsBaseContext);

    const handleSeeAllNotifications = () => {
        navigate('/notifications');
    };

    const limitedNotifications = notifications.slice(0, 5);

    return (
        <div className="notifications-popout">
            <h2>Notifications</h2>
            <div className="popout-divider"></div>
            {limitedNotifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                    <div className="notification-content">
                        <p>{notification.text}</p>
                        {notification.link && (
                            <a href={notification.link} className="action-link">
                                {notification.link}
                                <ArrowRight />
                            </a>
                        )}
                    </div>
                    <span className="timestamp">{notification.timestamp}</span>
                </div>
            ))}
            <button className="see-all-notifications" onClick={handleSeeAllNotifications}>
                See all notifications
            </button>
        </div>
    );
};

export default NotificationsPopout;
