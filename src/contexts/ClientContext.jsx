import React, { createContext, useState, useContext } from 'react';

const ClientContext = createContext();

export const useClientContext = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([
    {
      id: 1,
      type: "supplier",
      companyName: "Global Supplies Inc",
      phoneNumber: "093313123",
      email: "info@globalsupplies.com",
      numberOfEmployees: 300,
      annualTurnover: "1003",
      duty: "50",
      details: "Leading supplier of office equipment.",
      fullNameOfContactPerson: "Jane Smith",
      positionClient: "Head of Sales",
      telephoneKL: "093313123"
    },
    {
      id: 2,
      type: "supplier",
      companyName: "Energy Supplies Inc",
      phoneNumber: "093313123",
      email: "info@globalsupplies.com",
      numberOfEmployees: 300,
      annualTurnover: "1003",
      duty: "50",
      details: "Leading supplier of office equipment.",
      fullNameOfContactPerson: "David Smith",
      positionClient: "Head of Sales",
      telephoneKL: "093313123"
    }
    
    
  ]);

  const addClient = (newClient) => {
    const clientWithId = { ...newClient, id: Date.now() }; // Assign a unique ID
    setClients(prevClients => [...prevClients, clientWithId]);
  };

  const deleteClient = (clientToDelete) => {
    setClients(prevClients => 
      prevClients.filter(client => client.id !== clientToDelete.id)
    );
  };

  const updateClient = (updatedClient) => {
    setClients(prevClients => 
      prevClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, deleteClient, updateClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;