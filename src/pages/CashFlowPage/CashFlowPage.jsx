import React from 'react'
import Sidebar from '../../components/MainPage/Sidebar'
import Header from '../../components/MainPage/Header'
import { useNavigate } from 'react-router-dom';
import './CashFlowPage.css'
import CashFlowSubHeader from '../../components/CashFlowPage/CashFlowSubHeader';
import AddCashFlow from '../../components/CashFlowPage/AddCashFlow'
import CashFlowTable from '../../components/CashFlowPage/CashFlowTable';
const ClientsPage = () => {
  const navigate = useNavigate();

  const handleAddCashFlowClick = () => {
      navigate('/createCashFlow');
  };

  return (
    <div>

        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Header />
                
                <div className='cashflow-headline-part'>
            <h2 className="cashflow">Cash Flow</h2>
            <button className='add-cashflow-button' onClick={handleAddCashFlowClick}>+ Add Cash Flow</button>
            </div>
          
            {/* <CashFlowSubHeader></CashFlowSubHeader> */}
            <CashFlowTable></CashFlowTable>
       
            </main>
        </div>
    </div>
  )
}

export default ClientsPage





