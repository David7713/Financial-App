import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ClientsAddForm.css';
import { useClientContext } from '../../contexts/ClientContext';

const ClientsAddForm = () => {
    const { addClient } = useClientContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: '',
        companyName: '',
        phoneNumber: '',
        email: '',
        numberOfEmployees: '',
        annualTurnover: '',
        annualCurrency: '',
        duty: '',
        dutyCurrency: '',
        details: '',
        fullNameOfContactPerson: '',
        positionClient: '',
        position: '',
        telephoneKL: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Client Data:', formData);
        addClient(formData);
        setFormData({
            type: '',
            companyName: '',
            phoneNumber: '',
            email: '',
            numberOfEmployees: '',
            annualTurnover: '',
            annualCurrency: '',
            duty: '',
            dutyCurrency: '',
            details: '',
            fullNameOfContactPerson: '',
            positionClient: '',
            position: '',
            telephoneKL: ''
        });
        navigate('/clients');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='createClientForm'>
                <div className='client-information-part'>
                    <p>Client Information</p>
                    <div className="form-row">
                        <div>
                            <label htmlFor="type">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="select-input"
                            >
                                <option value="">Select Type</option>
                                <option value="Type1">Supplier</option>
                                <option value="Type2">Partner</option>
                                <option value="Type3">Receiver</option>
                                <option value="Type4">Shipper</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="double-field">
                            <div>
                                <label htmlFor="annualTurnover">Annual Turnover</label>
                                <input
                                    type="text"
                                    id="annualTurnover"
                                    name="annualTurnover"
                                    value={formData.annualTurnover}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="annualCurrency">Currency</label>
                                <select
                                    id="annualCurrency"
                                    name="annualCurrency"
                                    value={formData.annualCurrency}
                                    onChange={handleChange}
                                    className="select-input"
                                    required
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="JPY">JPY</option>
                                </select>
                            </div>
                        </div>
                        <div className="double-field">
                            <div>
                                <label htmlFor="duty">Duty</label>
                                <input
                                    type="text"
                                    id="duty"
                                    name="duty"
                                    value={formData.duty}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="dutyCurrency">Currency</label>
                                <select
                                    id="dutyCurrency"
                                    name="dutyCurrency"
                                    value={formData.dutyCurrency}
                                    onChange={handleChange}
                                    className="select-input"
                                    required
                                >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                    <option value="JPY">JPY</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <label htmlFor="numberOfEmployees">Number of Employees</label>
                            <input
                                type="number"
                                id="numberOfEmployees"
                                name="numberOfEmployees"
                                value={formData.numberOfEmployees}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="details">Details</label>
                            <input
                                type="text"
                                id="details"
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='contact-person-part'>
                    <p>Contact Person</p>
                    <div className="form-row">
                        <div>
                            <label htmlFor="fullNameOfContactPerson">Full Name of Contact Person</label>
                            <input
                                type="text"
                                id="fullNameOfContactPerson"
                                name="fullNameOfContactPerson"
                                value={formData.fullNameOfContactPerson}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="positionClient">Position</label>
                            <select
                                id="positionClient"
                                name="positionClient"
                                value={formData.positionClient}
                                onChange={handleChange}
                                className="position-select"
                                required
                            >
                                <option value="">Select Position</option>
                                <option value="Manager">Manager</option>
                                <option value="Coordinator">Coordinator</option>
                                <option value="Assistant">Assistant</option>
                                <option value="Director">Director</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row single-half">
    <div>
        <label htmlFor="telephoneKL">Telephone</label>
        <input
            type="tel"
            id="telephoneKL"
            name="telephoneKL"
            value={formData.telephoneKL}
            onChange={handleChange}
            required
        />
    </div>
</div>
                </div>

                <button type="submit" className='submit-button'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ClientsAddForm;
