import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CashFlowContext } from '../../contexts/CashFlowContext';
import './CashFlowDetailedView.css';
import trash from '../../assets/svg/trash.svg';
import edit from '../../assets/svg/edit.svg';
import close from '../../assets/png/close-circle.png'

const CashFlowDetailedView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { deleteCashFlow, updateCashFlow } = useContext(CashFlowContext);
  const [cashFlow, setCashFlow] = useState(location.state?.cashFlow || {});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(cashFlow);
  const [accountOptions] = useState(['Account 1', 'Account 2', 'Account 3']); // Replace with actual data source
  const [serviceOptions] = useState(['Service 1', 'Service 2', 'Service 3']); // Replace with actual data source
  const [legalEntityOptions] = useState(['Entity 1', 'Entity 2', 'Entity 3']); // Replace with actual data source
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State for controlling pop-up visibility

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Save changes
  const handleSave = () => {
    updateCashFlow(formData);
    setCashFlow(formData);
    setIsEditing(false);
  };

  // Cancel edits
  const handleCancel = () => {
    setFormData(cashFlow);
    setIsEditing(false);
  };

  // Delete cash flow
  const handleDelete = () => {
    setShowDeletePopup(true); // Show the pop-up when delete is clicked
};

  const cancelDelete = () => {
    setShowDeletePopup(false); // Hide the pop-up if deletion is canceled
};

const confirmDelete = () => {
    console.log('Deleting CashFlow:', cashFlow);
    deleteCashFlow(cashFlow);
    navigate('/cashflow');
};

  return (
    <div>
       {showDeletePopup && (
    <div className="delete-popup">
        <div className="popup-content">
            <div className="popup-delete-part">
            <h4>Delete CashFlow</h4>
            <img  onClick={cancelDelete} src={close}></img>
            </div>
<div className='popup-delete-text-part'>
<p>You are about to delete CashFlow <span id='italic' className='italic'>{cashFlow.legalEntity}</span>.</p>

<span>Please pay attention that once you delete the CashFlow, it can’t be restored.</span>
</div>
            <div className="popup-delete-actions-part">
                <button className="cancel-delete" onClick={cancelDelete}>Close</button>
                <button className="confirm-delete" onClick={confirmDelete}>Delete CashFlow</button>
            </div>
        </div>
    </div>
)}
      <div className='cash-flow-management'>
        <div>
          <h2>{cashFlow.legalEntity}</h2>
          <span>{cashFlow.service}</span>
        </div>
        <div className='delete-button-part'>
          <button className='delete-cashflow-button' onClick={handleDelete}>
            <img src={trash} alt="Delete" />
            Delete Cash Flow
          </button>
        </div>
      </div>
      <form className='cash-flow-details-form'>
        <div className='cash-flow-information-part'>
          <p>Cash Flow Information</p>
          <div className="form-row">
            <div>
              <label htmlFor="legalEntity">Legal Entity</label>
              <select
                id="legalEntity"
                name="legalEntity"
                value={formData.legalEntity}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="">Select Legal Entity</option>
                {legalEntityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="account">Account</label>
              <select
                id="account"
                name="account"
                value={formData.account}
                onChange={handleChange}
                disabled={!isEditing}
              >
                {accountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
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
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                disabled={!isEditing}
              >
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="currency">Currency</label>
              <input
                type="text"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="form-row single-half">
            <div>
              <label htmlFor="sum">Sum</label>
              <input
                type="text"
                id="sum"
                name="sum"
                value={(formData.price * formData.quantity).toFixed(2)}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className='buttons-container'>
          {isEditing ? (
            <>
              <button type="button" onClick={handleCancel} className='cancel-button'>Cancel</button>
              <button type="button" onClick={handleSave} className='cashflow-submit-button' id='save-button'>Save Changes</button>
            </>
          ) : (
            <button type="button" onClick={handleEdit} className='cashflow-submit-button'><img src={edit} alt="Edit" />Edit Info</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CashFlowDetailedView;
