import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { NotificationsProvider } from './contexts/NotificationsBase';
import './styles/index.css';
import MainPage from './pages/MainPage/MainPage';
import HistoryContractPage from './pages/MainPage/HistoryContractPage/HistoryContractPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Login from './components/Login/Login';
import ForgotPassword from './components/Login/ForgotPassword';
import RecoverPassword from './components/Login/RecoverPassword';
import NotificationsPage from './pages/NotificationsPage/NotificationsPage';
import PublishersPage from './pages/PublishersPage/PublishersPage';
import AuthorsPage from './pages/AuthorsPage/AuthorsPage';
import Registration from './components/Registration/Registration';
import CompanyListPage from './pages/CompanyListPage/CompanyListPage';
import CreateCompany from './components/CompanyPage/CreateCompany';
import Company from './pages/CompanyPage/Company';
import ClientsPage from './pages/ClientsPage/ClientsPage';
// import AddClientPage from '../../ari-admin-panel/src/pages/ClientsPage/AddClientPage';
import AddClientPage from "../src/pages/ClientsPage/AddClientPage"

import ClientsDetailedViewPage from './pages/ClientsPage/ClientsDetailedViewPage';
import { CompanyProvider } from './contexts/CompanyContext';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import AddServicePage from './components/ServicesPage/AddServicePage';
import ServicesDetailedViewPage from '../src/pages/ServicesPage/ServicesDetailedViewPage'
import { ServiceProvider } from '../src/contexts/ServiceContext';
// import { ClientProvider } from '../../ari-admin-panel/src/contexts/ClientContext';
import { ClientProvider } from '../src/contexts/ClientContext'

// import { CashFlowProvider } from '../../ari-admin-panel/src/contexts/CashFlowContext';
import { CashFlowProvider } from  '../src/contexts/CashFlowContext'
import CompanyDetailedViewPage from '../src/pages/CompanyListPage/CompanyDetailedViewPage'
import CompanyDetailedView from './components/CompanyListPage/CompanyDetailedView';
import CashFlowPage from '../src/pages/CashFlowPage/CashFlowPage'
import AddCashFlow from './components/CashFlowPage/AddCashFlow';
import { CashFlowContext } from './contexts/CashFlowContext';
import CashFlowDetailedViewPage from '../src/pages/CashFlowPage/CashFlowDetailedViewPage'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NotificationsProvider>
      <CompanyProvider>
        <ServiceProvider>
          <ClientProvider>
            <CashFlowProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/contracts" />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/recover-password/:token" element={<RecoverPassword />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/cashflow" element={<CashFlowPage /> } />
                <Route path="/createCashFlow" element={<AddCashFlow /> } />


                {/* Protected routes */}
                <Route path="/contracts/*" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
                <Route path="/history/:contractId" element={<ProtectedRoute><HistoryContractPage /></ProtectedRoute>} />
                <Route path="/settings/*" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                <Route path="/publishers" element={<ProtectedRoute><PublishersPage /></ProtectedRoute>} />
                <Route path="/companyListPage" element={<ProtectedRoute><CompanyListPage /></ProtectedRoute>} />
                <Route path="/authors" element={<ProtectedRoute><AuthorsPage /></ProtectedRoute>} />
                <Route path="/notifications/*" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                <Route path="/createCompany" element={<Company />} />
                <Route path="/clients" element={<ProtectedRoute><ClientsPage /> </ProtectedRoute>} />
                <Route path="/createClient" element={<ProtectedRoute><AddClientPage /></ProtectedRoute>} />
                <Route path="/clients/view/:fullNameOfContactPerson" element={<ProtectedRoute><ClientsDetailedViewPage /></ProtectedRoute>} />
                <Route path="/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
                <Route path="/createService" element={<ProtectedRoute><AddServicePage /></ProtectedRoute>} />
                <Route path="/services/view/:name" element={<ProtectedRoute><ServicesDetailedViewPage /></ProtectedRoute>} />
                <Route path="/cashflow/view/:name" element={<ProtectedRoute><CashFlowDetailedViewPage /></ProtectedRoute>} />
                
                <Route path="/companyListPage/view/:companyName" element={<ProtectedRoute><CompanyDetailedViewPage /></ProtectedRoute>} />
                <Route path="/companyListPage/view/:companyName" element={<ProtectedRoute><CompanyDetailedView /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to={isAuthenticated ? "/clients" : "/login"} />} />
                <Route path="/cashflow" element={<ProtectedRoute><CashFlowPage /> </ProtectedRoute>} />
              </Routes>
            </Router>
            </CashFlowProvider>
          </ClientProvider>
        </ServiceProvider>
      </CompanyProvider>
    </NotificationsProvider>
  );
};

export default App;
