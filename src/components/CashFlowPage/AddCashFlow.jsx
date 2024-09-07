// AddCashFlow.js
import React, { useState } from 'react';
import Sidebar from '../../components/MainPage/Sidebar';
import Header from '../../components/MainPage/Header';
import { useCashFlowContext } from '../../contexts/CashFlowContext'; // Adjust import path as needed
import './AddCashFlow.css';
import { useNavigate } from 'react-router-dom';
const AddCashFlow = () => {
  const navigate = useNavigate(); // Get navigate function
  const { addCashFlow } = useCashFlowContext(); // Destructure addCashFlow from the context

  const [formData, setFormData] = useState({
    legalEntity: '',
    account: '',
    from: '',
    service: '',
    price: '',
    quantity: '',
    dateOfAdmission: '',
    currency: ''
  });
  const [sum, setSum] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCalculateSum = () => {
    const total = parseFloat(formData.price) * parseFloat(formData.quantity) || 0;
    setSum(total.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the form data and sum before adding to the context
    console.log('Form Data:', formData);
    console.log('Calculated Sum:', sum);

    // Add the new cash flow to the context
    addCashFlow({ ...formData, sum });

    // Reset form and sum
    setFormData({
      legalEntity: '',
      account: '',
      from: '',
      service: '',
      price: '',
      quantity: '',
      dateOfAdmission: '',
      currency: ''
    });
    
    navigate('/cashflow');
};


  return (
    <div>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <div className="form-container">
            <form onSubmit={handleSubmit} className="cash-flow-form">
              {/* Form fields */}
              <div className="form-section">
                <p className="cash-flow-information">Cash Flow Information</p>
                <div className="form-row">
                  <div>
                    <label htmlFor="legalEntity">Legal Entity</label>
                    <select
                      id="legalEntity"
                      name="legalEntity"
                      value={formData.legalEntity}
                      onChange={handleChange}
                      required
                      className="select-input"
                    >
                      <option value="">Select Legal Entity</option>
                      <option value="Entity1">Entity 1</option>
                      <option value="Entity2">Entity 2</option>
                      <option value="Entity3">Entity 3</option>
                      <option value="Entity4">Entity 4</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="account">Account</label>
                    <select
                      id="account"
                      name="account"
                      value={formData.account}
                      onChange={handleChange}
                      required
                      className="select-input"
                    >
                      <option value="">Select Account</option>
                      <option value="Account1">Account 1</option>
                      <option value="Account2">Account 2</option>
                      <option value="Account3">Account 3</option>
                      <option value="Account4">Account 4</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label htmlFor="from">From</label>
                    <input
                      type="text"
                      id="from"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="service">Service</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="select-input"
                    >
                      <option value="">Select Service</option>
                      <option value="Service1">Service 1</option>
                      <option value="Service2">Service 2</option>
                      <option value="Service3">Service 3</option>
                      <option value="Service4">Service 4</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label htmlFor="price">Price</label>
                    <div className="price-currency-container">
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        onBlur={handleCalculateSum}
                        required
                      />
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        required
                        className="select-input currency-select"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      onBlur={handleCalculateSum}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <p className="cash-flow-information">Additional Details</p>
                <div className="form-row">
                  <div className="sum-date-container">
                    <div>
                      <label htmlFor="sum">Sum</label>
                      <input
                        type="text"
                        id="sum"
                        name="sum"
                        value={sum}
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="dateOfAdmission">Date of Admission</label>
                      <input
                        type="date"
                        id="dateOfAdmission"
                        name="dateOfAdmission"
                        value={formData.dateOfAdmission}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCashFlow;
