import React, { createContext, useState, useContext } from 'react';

export const ServiceContext = createContext();

export const useServiceContext = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([
    {
      id: 1, // Unique ID
      name: "Service A",
      category: "Category1",
      type: "Rendering",
      fromDate: "2024-01-01",
      toDate: "2024-01-31",
      price: "1000",
      quantity: 10,
      amount: "10000",
      serviceDate: "2024-01-15",
      estimatedPaymentDate: "2024-02-01"
    },
    {
      id: 2, // Unique ID
      name: "Service B",
      category: "Category2",
      type: "Acceptance",
      fromDate: "2024-02-01",
      toDate: "2024-02-28",
      price: "1500",
      quantity: 20,
      amount: "30000",
      serviceDate: "2024-02-15",
      estimatedPaymentDate: "2024-03-01"
    }
  
    
  ]);

  const addService = (newService) => {
    const serviceWithId = {
      ...newService,
      id: Date.now() // Use timestamp as a simple unique ID
    };
    setServices([...services, serviceWithId]);
  };
  const deleteService = (serviceToDelete) => {
    setServices(services.filter(service => service.id !== serviceToDelete.id));
  };

  const updateService = (updatedService) => {
    setServices(services.map(service =>
      service.id === updatedService.id ? updatedService : service
    ));
  };

  return (
    <ServiceContext.Provider value={{ services, addService, deleteService, updateService }}>
      {children}
    </ServiceContext.Provider>
  );
};
