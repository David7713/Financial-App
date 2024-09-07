import React, { createContext, useState, useContext } from 'react';

const CompanyContext = createContext();

export const useCompanyContext = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
    const [companies, setCompanies] = useState([
        {
            companyId: 1,
            companyName: 'Example Company',
            country: 'USA',
            ownersFullName: 'John Doe',
            email: 'john.doe@example.com',
            phoneNumber: '555-555-5555',
            numberOfLegalEntities: 1, // Initialize with one entity
            entities: [
                {
                    entityId: 1,
                    legalName: 'Example LLC',
                    companyType: 'LLC',
                    taxType: 'VAT',
                    legalDetailsName: 'Example Legal Details',
                    tinNumber: '123456789',
                    legalAddress: '123 Example St, Example City',
                    actualAddress: '123 Example St, Example City',
                    deliveryAddress: '123 Example St, Example City',
                    directorFullName: 'Jane Doe',
                    accountantName: 'Alice Smith',
                    bankDetails: [
                        {
                            bankName: 'Example Bank',
                            accountCurrency: 'USD',
                            currentAccount: '1234567890',
                            correspondentAccount: '0987654321',
                            bicNumber: 'EXAMUS33',
                            swiftNumber: 'EXAMUS33XXX'
                        }
                    ]
                },
                {
                    entityId: 2,
                    legalName: 'Bordano LLC',
                    companyType: 'LLC',
                    taxType: 'VAT',
                    legalDetailsName: 'Example Legal Details',
                    tinNumber: '3321312',
                    legalAddress: '33 Example St, Example City',
                    actualAddress: '33 Example St, Example City',
                    deliveryAddress: '33 Example St, Example City',
                    directorFullName: 'Jane Doe',
                    accountantName: 'Alice Smith',
                    bankDetails: [
                        {
                            bankName: 'Example Bank',
                            accountCurrency: 'USD',
                            currentAccount: '1234567890',
                            correspondentAccount: '0987654321',
                            bicNumber: 'EXAMUS33',
                            swiftNumber: 'EXAMUS33XXX'
                        }
                    ]
                }
            ]
        }
    ]);
    const [nextId, setNextId] = useState(2); // Initialize nextId here

    const addCompany = (newCompany) => {
        newCompany.companyId = nextId; // Assign id
        setCompanies(prevCompanies => [...prevCompanies, newCompany]);
        setNextId(prevId => prevId + 1); // Increment nextId
    };

    const deleteCompany = (id) => {
        console.log('Before deletion:', companies);
        setCompanies(prevCompanies => {
            const updatedCompanies = prevCompanies.filter(company => company.companyId !== id);
            console.log('After deletion:', updatedCompanies);
            return updatedCompanies;
        });
    };

    const updateCompany = (updatedCompany) => {
        setCompanies(prevCompanies =>
            prevCompanies.map(company =>
                company.companyId === updatedCompany.companyId ? updatedCompany : company
            )
        );
    };

    return (
        <CompanyContext.Provider value={{ companies, addCompany, deleteCompany, updateCompany, nextId }}>
            {children}
        </CompanyContext.Provider>
    );
};
