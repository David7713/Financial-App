import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useServiceContext } from '../../contexts/ServiceContext';
import './ServicesDetailedView.css';
import trash from '../../assets/svg/trash.svg';
import edit from '../../assets/svg/edit.svg';
import close from '../../assets/png/close-circle.png'

const ServicesDetailedView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { deleteService, updateService } = useServiceContext();
  const [service, setService] = useState(location.state?.service || {});
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State for controlling pop-up visibility

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(service);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    console.log('Editing mode enabled');
    setIsEditing(true);
  };
  
  const handleSave = () => {
    console.log('Saving changes:', formData);
    updateService(formData);
    setService(formData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    console.log('Editing canceled. Reverting to original service data:', service);
    setFormData(service);
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    setShowDeletePopup(true); // Show the pop-up when delete is clicked
};

  const cancelDelete = () => {
    setShowDeletePopup(false); // Hide the pop-up if deletion is canceled
};

const confirmDelete = () => {
    console.log('Deleting Service:', service);
    deleteService(service);
    navigate('/services');
};

  

  return (
    <div>
      {showDeletePopup && (
    <div className="delete-popup">
        <div className="popup-content">
            <div className="popup-delete-part">
            <h4>Delete Service</h4>
            <img  onClick={cancelDelete} src={close}></img>
            </div>
<div className='popup-delete-text-part'>
<p>You are about to delete service <span id='italic' className='italic'>{service.name}</span>.</p>

<span>Please pay attention that once you delete the service, it can’t be restored.</span>
</div>
            <div className="popup-delete-actions-part">
                <button className="cancel-delete" onClick={cancelDelete}>Close</button>
                <button className="confirm-delete" onClick={confirmDelete}>Delete Service</button>
            </div>
        </div>
    </div>
)}
      <div className='service-management'>
        <div>
          <h2>{service.name}</h2>
          <span>{service.category}</span>
        </div>
        <div className='delete-button-part'>
          <button className='delete-service-button' onClick={handleDelete}>
            <img src={trash}></img>
            Delete Service
          </button>
        </div>
      </div>
      <form className='service-details-form'>
        <div className='service-information-part'>
          <p>Service Information</p>
          <div className="form-row">
            <div>
              <label htmlFor="name">Service Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="type">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="fromDate">From Date</label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="toDate">To Date</label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="form-row">
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
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="serviceDate">Date of Service Provision</label>
              <input
                type="date"
                id="serviceDate"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleChange}
                disabled={!isEditing}
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
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className='buttons-container'>
                    {isEditing ? (
                        <>
                            <button type="button" onClick={handleCancel} className='cancel-button'>Cancel</button>
                            <button type="button" onClick={handleSave} className='services-submit-button' id='save-button'> Save Changes</button>
                        </>
                    ) : (
                        <button type="button" onClick={handleEdit} className='services-submit-button'><img src={edit}></img>Edit Info</button>
                    )}
                </div>
      </form>
    </div>
  );
};

export default ServicesDetailedView;
