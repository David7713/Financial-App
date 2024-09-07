import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ClientsDetailedView.css';
import trash from '../../assets/svg/trash.svg';
import edit from '../../assets/svg/edit.svg';
import { useClientContext } from '../../contexts/ClientContext';
import close from '../../assets/png/close-circle.png'
const ClientsDetailedView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { deleteClient, updateClient, clients } = useClientContext();
  const [client, setClient] = useState(location.state?.client || {});
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State for controlling pop-up visibility

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(client);

  useEffect(() => {
    if (client.id) {
      const updatedClient = clients.find(c => c.id === client.id);
      if (updatedClient) {
        setClient(updatedClient);
        setFormData(updatedClient);
      }
    }
  }, [clients, client.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    console.log('Editing mode activated'); // Log when entering edit mode
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('Updated client data:', formData); // Log the new data to be saved
    updateClient(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    console.log('Edit cancelled, reverting to original client data'); // Log when edit is cancelled
    setFormData(client);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeletePopup(true); // Show the pop-up when delete is clicked
};

  const cancelDelete = () => {
    setShowDeletePopup(false); // Hide the pop-up if deletion is canceled
};

const confirmDelete = () => {
    console.log('Deleting Client:', clients);
    deleteClient(client);
    navigate('/clients');
};


    return (
        <div>
               {showDeletePopup && (
    <div className="delete-popup">
        <div className="popup-content">
            <div className="popup-delete-part">
            <h4>Delete Client</h4>
            <img  onClick={cancelDelete} src={close}></img>
            </div>
<div className='popup-delete-text-part'>
<p>You are about to delete client <span id='italic' className='italic'>{client.fullNameOfContactPerson}</span>.</p>

<span>Please pay attention that once you delete the client, it can’t be restored.</span>
</div>
            <div className="popup-delete-actions-part">
                <button className="cancel-delete" onClick={cancelDelete}>Close</button>
                <button className="confirm-delete" onClick={confirmDelete}>Delete Client</button>
            </div>
        </div>
    </div>
)}
            <div className='client-management'>
                <div>
                    <h2>{client.fullNameOfContactPerson}</h2>
                    <span>{client.companyName}</span>
                </div>
                <div className='delete-button-part'>
                    <button className='delete-client-button' onClick={handleDelete}> 
                        <img src={trash} alt="Delete" />
                        Delete Client
                    </button>
                </div>
            </div>
            <form className='client-details-form'>
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
                    disabled={!isEditing}
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
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                disabled={!isEditing}
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
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="form-row">
    <div>
        <label htmlFor="annualTurnover">Annual Turnover</label>
        <input
            type="text"
            id="annualTurnover"
            name="annualTurnover"
            value={formData.annualTurnover}
            onChange={handleChange}
            disabled={!isEditing}
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
            disabled={!isEditing}
        >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
        </select>
    </div>
    <div>
        <label htmlFor="duty">Duty</label>
        <input
            type="text"
            id="duty"
            name="duty"
            value={formData.duty}
            onChange={handleChange}
            disabled={!isEditing}
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
            disabled={!isEditing}
        >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
        </select>
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
                                disabled={!isEditing}
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
                                disabled={!isEditing}
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
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label htmlFor="positionClient">Position</label>
                            <select
                                id="positionClient"
                                name="positionClient"
                                value={formData.positionClient}
                                onChange={handleChange}
                             className="select-input"
                                disabled={!isEditing}
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
                                type="text"
                                id="telephoneKL"
                                name="telephoneKL"
                                value={formData.telephoneKL}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>

                <div className='buttons-container'>
                    {isEditing ? (
                        <>
                            <button type="button" onClick={handleCancel} className='cancel-button'>Cancel</button>
                            <button type="button" onClick={handleSave} className='client-submit-button' id='save-button'> Save Changes</button>
                        </>
                    ) : (
                        <button type="button" onClick={handleEdit} className='client-submit-button'><img src={edit}></img>Edit Info</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ClientsDetailedView;
