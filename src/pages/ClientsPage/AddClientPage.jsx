import React from 'react'
import Sidebar from '../../components/MainPage/Sidebar'
import Header from '../../components/MainPage/Header'
import ClientsTable from '../../components/ClientsPage/ClientsTable';
import './AddClientPage.css'
import ClientsAddForm from '../../components/ClientsPage/ClientsAddForm';
const AddClientPage = () => {
  return (
    <div>

        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                <ClientsAddForm></ClientsAddForm>
               
            </main>
        </div>
    </div>
  )
}

export default AddClientPage