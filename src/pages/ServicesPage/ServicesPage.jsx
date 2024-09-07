import React from 'react';
import Sidebar from '../../components/MainPage/Sidebar';
import Header from '../../components/MainPage/Header';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';
import ServicesTable from '../../components/ServicesPage/ServicesTable';

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleAddServiceClick = () => {
    navigate('/createService'); // Adjust route if needed
  };

  return (
    <div>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          <div className='services-headline-part'>
            <h2 className="services">Services</h2>
            <button className='add-service-button' onClick={handleAddServiceClick}>+ Add Service</button>
          </div>
   <ServicesTable></ServicesTable>
        </main>
      </div>
    </div>
  );
};

export default ServicesPage;
