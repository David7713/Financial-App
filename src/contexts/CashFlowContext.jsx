// CashFlowContext.js
import React, { createContext, useState, useContext } from 'react';

export const CashFlowContext = createContext();

export const useCashFlowContext = () => useContext(CashFlowContext);

export const CashFlowProvider = ({ children }) => {
  const [cashFlows, setCashFlows] = useState([
    {
      id: 1, // Unique ID
      legalEntity: "Entity1",
      service: "Service1",
      from: "Oscar Smith",
      price: "1000",
      quantity: 10,
      dateOfAdmission: "2024-01-10",
      currency: "USD",
      sum: "10000"
    },
    {
      id: 2, // Unique ID
      legalEntity: "Entity2",
      service: "Service2",
      from: "John Wick",
      price: "1500",
      quantity: 20,
      dateOfAdmission: "2024-02-15",
      currency: "EUR",
      sum: "30000"
    }
  ]);

  const addCashFlow = (newCashFlow) => {
    const cashFlowWithId = {
      ...newCashFlow,
      id: Date.now() // Use timestamp as a simple unique ID
    };
    setCashFlows([...cashFlows, cashFlowWithId]);
  };

  const deleteCashFlow = (cashFlowToDelete) => {
    setCashFlows(cashFlows.filter(cashFlow => cashFlow.id !== cashFlowToDelete.id));
  };

  const updateCashFlow = (updatedCashFlow) => {
    setCashFlows(cashFlows.map(cashFlow =>
      cashFlow.id === updatedCashFlow.id ? updatedCashFlow : cashFlow
    ));
  };

  return (
    <CashFlowContext.Provider value={{ cashFlows, addCashFlow, deleteCashFlow, updateCashFlow }}>
      {children}
    </CashFlowContext.Provider>
  );
};
