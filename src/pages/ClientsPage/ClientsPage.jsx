import React from 'react'
import Sidebar from '../../components/MainPage/Sidebar'
import Header from '../../components/MainPage/Header'
import ClientsTable from '../../components/ClientsPage/ClientsTable';
import { useNavigate } from 'react-router-dom';
import './ClientsPage.css'

const ClientsPage = () => {
  const navigate = useNavigate();

  const handleAddClientClick = () => {
      navigate('/createClient');
  };

  return (
    <div>

        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                
                <div className='clients-headline-part'>
            <h2 className="clients">Clients</h2>
            <button className='add-client-button' onClick={handleAddClientClick}>+ Add Client</button>
            </div>
                <ClientsTable></ClientsTable>
               
            </main>
        </div>
    </div>
  )
}

export default ClientsPage





