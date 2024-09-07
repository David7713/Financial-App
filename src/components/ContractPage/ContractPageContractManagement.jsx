import React from 'react';
import './ContractPageContractManagement.css';
import { useLocation, Link } from 'react-router-dom';
import ProlongContractButton from '../../assets/svg/ProlongContractButton';
import CancelContractButton from '../../assets/svg/CancelContractButton';
import DeleteContractButton from '../../assets/svg/DeleteContractButton';


const ContractPageContractManagement = () => {
    const location = useLocation();
    const { contract } = location.state || {};

    return (
        <div className="contract-management">
            <div className="contract-info">
                <h2>{contract.name}</h2>
                 <p className="contract-number">
                     Contract number: <span className="contract-number-black"> {contract.contractId}</span></p>
            </div>
            <span className="status">{contract.status}</span>
            <div className="contract-actions">
                <button className="prolong-contract-button">
                    <ProlongContractButton />
                    Prolong Contract
                </button>
                <button className="cancel-contract-button">
                    <CancelContractButton />
                    Cancel Contract
                </button>
                <button className="delete-contract-button">
                    <DeleteContractButton />
                    Delete Contract
                </button>
            </div>
        </div>
    );
};

export default ContractPageContractManagement;
