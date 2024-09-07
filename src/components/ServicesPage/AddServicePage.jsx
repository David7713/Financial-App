import React, { useState, useContext } from 'react';
import { ServiceContext } from '../../contexts/ServiceContext';
import Sidebar from '../../components/MainPage/Sidebar';
import Header from '../../components/MainPage/Header';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AddServicePage.css';
import Calendar from '../../../src/assets/svg/Calendar.svg'
const AddServicePage = () => {
  const { addService } = useContext(ServiceContext); // Use the context
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    type: '',
    from: '',
    service: '',
    price: '',
    quantity: '',
    amount: '',
    serviceDate: '',
    estimatedPaymentDate: ''
  });
  const navigate = useNavigate(); // Get navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addService(formData); // Add service to context
    console.log('New service added:', formData); // Log the form data to the console
    setFormData({
      name: '',
      category: '',
      type: '',
      from: '',
      service: '',
      price: '',
      quantity: '',
      amount: '',
      serviceDate: '',
      estimatedPaymentDate: ''
    });
    navigate('/services'); // Redirect to services page
  };

  return (
    <div>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <div className="form-container">
            <form onSubmit={handleSubmit} className="service-form">
              {/* Form fields */}
              <div className="form-section">
                <p className="service-information">Service Information</p>
                <div className="form-row">
                  <div>
                    <label htmlFor="name">Service Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="select-input"
                    >
                      <option value="">Select Category</option>
                      <option value="Category1">Category 1</option>
                      <option value="Category2">Category 2</option>
                      {/* Add more categories as needed */}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <p className="service-information">Service Details</p>
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
                      <option value="Rendering">Rendering</option>
                      <option value="Acceptance">Acceptance</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="from">From Who</label>
                    <input
                      type="text"
                      id="from"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
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
                      <option value="Version1">Version 1</option>
                      <option value="Version2">Version 2</option>
                      <option value="Version3">Version 3</option>
                      <option value="Version4">Version 4</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row single-half">
                  <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <p className="service-information">Additional Details</p>
                <div className="form-row">
                  <div>
                    <label htmlFor="serviceDate">Date of Service Provision</label>
                    <input
                      type="date"
                      id="serviceDate"
                      name="serviceDate"
                      value={formData.serviceDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="estimatedPaymentDate">Estimated Payment Date</label>
                    <input
                      type="date"
                      id="estimatedPaymentDate"
                      name="estimatedPaymentDate"
                      value={formData.estimatedPaymentDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                    />
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

export default AddServicePage;
