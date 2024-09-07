import React, { createContext, useState } from 'react';

export const NotificationsBaseContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Hi! 1 month left by the end of the contract 'Contract name'", timestamp: "20:50", link: "Check Contract" },
        { id: 2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed", timestamp: "yesterday", link: "Check Contract" },
        { id: 3, text: "Ut enim ad minima veniam, quis nostrum exercitationem sadaf fdafsdfa dasdasd", timestamp: "20/07/2024", link: "Check Contract" },
        { id: 4, text: "Short text", timestamp: "18/07/2024" },
        { id: 5, text: "Hi! 1 month left by the end of the contract 'Contract name'", timestamp: "last month", link: "Check Contract" },
        { id: 6, text: "safdefsdfdfuwb fdfhksbdhfs dkfnjsdjflf", timestamp: "last month", link: "Check Contract" },
        { id: 7, text: "Hi! 1 month left by the end of the contract 'Contract name'", timestamp: "last month", link: "Check Contract" },
        { id: 8, text: "safdefsdfdfuwb fdfhksbdhfs dkfnjsdjflf", timestamp: "last month", link: "Check Contract" },
        { id: 9, text: "Hi! 1 month left by the end of the contract 'Contract name'", timestamp: "last month" },
        { id: 10, text: "safdefsdfdfuwb fdfhksbdhfs dkfnjsdjflf", timestamp: "last month", link: "Check Contract" },
    ]);

    return (
        <NotificationsBaseContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationsBaseContext.Provider>
    );
};