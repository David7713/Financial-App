import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CompanyDetailedView.css';
import trash from '../../assets/svg/trash.svg';
import edit from '../../assets/svg/edit.svg';
import { useCompanyContext } from '../../contexts/CompanyContext';
import close from '../../assets/png/close-circle.png';

const CompanyDetailedView = () => {
    const { deleteCompany, updateCompany } = useCompanyContext();
    const navigate = useNavigate();
    const location = useLocation();
    const company = location.state?.company || {};
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(company);
    const [entities, setEntities] = useState(company.entities || []);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        setFormData(company);
        setEntities(company.entities || []);
    }, [company]);

    const handleChange = (e, index, field, bankIndex = null) => {
        const { name, value } = e.target;

        if (name in formData) {
            setFormData({ ...formData, [name]: value });
        } else if (bankIndex === null) {
            const updatedEntities = entities.map((entity, i) =>
                i === index ? { ...entity, [name]: value } : entity
            );
            setEntities(updatedEntities);
        } else {
            const updatedEntities = entities.map((entity, i) =>
                i === index
                    ? {
                        ...entity,
                        bankDetails: entity.bankDetails.map((bank, bIndex) =>
                            bIndex === bankIndex ? { ...bank, [name]: value } : bank
                        ),
                    }
                    : entity
            );
            setEntities(updatedEntities);
        }
    };

    const handleEdit = (index) => {
        const updatedEntities = entities.map((entity, i) =>
            i === index ? { ...entity, isEditing: true } : entity
        );
        setEntities(updatedEntities);
    };

    const handleSave = (index) => {
        const updatedEntities = entities.map((entity, i) =>
            i === index ? { ...entity, isEditing: false } : entity
        );
        const updatedCompany = { ...formData, entities: updatedEntities };
        console.log('Updated Company Data:', updatedCompany);
        updateCompany(updatedCompany);
        setEntities(updatedEntities);
    };

    const handleCancel = (index) => {
        const updatedEntities = entities.map((entity, i) =>
            i === index ? { ...entity, isEditing: false } : entity
        );
        setEntities(updatedEntities);
    };

    const handleDelete = () => {
        setShowDeletePopup(true);
    };

    const confirmDelete = () => {
        console.log('Deleting company:', company);
        deleteCompany(company.companyId);
        navigate('/companyListPage');
    };

    const cancelDelete = () => {
        setShowDeletePopup(false);
    };

    const addEntity = () => {
        const newEntity = {
            legalName: '',
            companyType: '',
            tinNumber: '',
            legalAddress: '',
            actualAddress: '',
            deliveryAddress: '',
            directorFullName: '',
            accountantName: '',
            taxType: '',
            bankDetails: [
                {
                    bankName: '',
                    accountNumber: '',
                    branch: '',
                    swiftCode: ''
                }
            ]
        };
        setEntities([...entities, newEntity]);
    };

    const handleRemoveEntity = (index) => {
        const updatedEntities = entities.filter((_, i) => i !== index);
        setEntities(updatedEntities);

        const updatedCompany = { ...formData, entities: updatedEntities };
        updateCompany(updatedCompany);
    };

    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleEditDescription = () => {
        setIsEditingDescription(true);
    };

    const handleSaveDescription = () => {
        updateCompany(formData);
        setIsEditingDescription(false);
    };

    const handleCancelDescription = () => {
        setFormData(company);
        setIsEditingDescription(false);
    };
    
    return (
        <div>
            {showDeletePopup && (
    <div className="delete-popup">
        <div className="popup-content">
            <div className="popup-delete-part">
            <h4>Delete Company</h4>
            <img  onClick={cancelDelete} src={close}></img>
            </div>
<div className='popup-delete-text-part'>
<p>You are about to delete company <span id='italic' className='italic'>{company.companyName}</span>.</p>

<span>Please pay attention that once you delete the company, it can’t be restored.</span>
</div>
            <div className="popup-delete-actions-part">
                <button className="cancel-delete" onClick={cancelDelete}>Close</button>
                <button className="confirm-delete" onClick={confirmDelete}>Delete Company</button>
            </div>
        </div>
    </div>
)}
            <div className='company-management'>
                <div>
                    <h2>{company.companyName}</h2>
                    <span>{company.legalName}</span>
                </div>
                <div className='delete-button-part'>
                    <button className='delete-company-button' onClick={handleDelete}>
                        <img src={trash} alt="Delete" />
                        Delete Company
                    </button>
                </div>
            </div>
            <form className='company-details-form'>
                <div className='company-description-part'>
                    <p>Company Description</p>
                    <div className="form-row">
                  
                        <div>
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                disabled={!isEditingDescription}
                            />
                        </div>
                        <div>
                            <label htmlFor="country">Country</label>
                            {isEditingDescription ? (
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleDescriptionChange}
                                >
                                    <option value="">Select Country</option>
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                    <option value="UK">UK</option>
                                    {/* Add more countries as needed */}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleDescriptionChange}
                                    disabled={!isEditingDescription}
                                />
                            )}
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <label htmlFor="ownersFullName">Owner's Full Name</label>
                            <input
                                type="text"
                                id="ownersFullName"
                                name="ownersFullName"
                                value={formData.ownersFullName}
                                onChange={handleChange}
                                disabled={!isEditingDescription}
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
                                disabled={!isEditingDescription}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                disabled={!isEditingDescription}
                            />
                        </div>
                        <div>
                            <label htmlFor="numberOfLegalEntities">Number of Legal Entities</label>
                            <input
                                type="number"
                                id="numberOfLegalEntities"
                                name="numberOfLegalEntities"
                                value={formData.numberOfLegalEntities}
                                onChange={handleChange}
                                disabled={!isEditingDescription}
                            />
                        </div>
                    </div>
                    <div className="buttons-container">
    {!isEditingDescription ? (
        <>
           <button className='company-edit-button' type="button" onClick={handleEditDescription}>
    <img src={edit} alt="Edit" />
    Edit
</button>
           
        </>
    ) : (
        <>
              <button id="save-button" type="button" onClick={handleSaveDescription}>
                Save Changes
            </button>
            <button className='cancel-button' type="button" onClick={handleCancelDescription}>
                Cancel
            </button>
        </>
    )}
</div>
         
                </div>

                <div className='legal-entities-part'>
                <div className='entities-add-part'>
                    <p>Legal Entities</p>
                    <button type="button" className="add-entity-button" onClick={addEntity}>
                       + Add
                    </button>
                    </div>
                    {entities.map((entity, index) => (
                        <div key={index} className='legal-entity'>
                            <h3 className='entity-text-header'>Entity {index + 1}</h3>
                            <div className="form-row">
                                <div>
                                    <label htmlFor={`legalName-${index}`}>Legal Name of the Company</label>
                                    <input
                                        type="text"
                                        id={`legalName-${index}`}
                                        name="legalName"
                                        value={entity.legalName || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={!entity.isEditing}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`companyType-${index}`}>Company Type</label>
                                    <select
                                        id={`companyType-${index}`}
                                        name="companyType"
                                        value={entity.companyType || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        className="select-input"
                                        disabled={!entity.isEditing}
                                    >
                                        <option value="">Select Company Type</option>
                                        <option value="LLC">LLC</option>
                                        <option value="Corporation">Corporation</option>
                                        <option value="Partnership">Partnership</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div>
                                    <label htmlFor={`tinNumber-${index}`}>TIN Number</label>
                                    <input
                                        type="text"
                                        id={`tinNumber-${index}`}
                                        name="tinNumber"
                                        value={entity.tinNumber || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={!entity.isEditing}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`legalAddress-${index}`}>Legal Address</label>
                                    <input
                                        type="text"
                                        id={`legalAddress-${index}`}
                                        name="legalAddress"
                                        value={entity.legalAddress || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={!entity.isEditing}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div>
                                    <label htmlFor={`actualAddress-${index}`}>Actual Address</label>
                                    <input
                                        type="text"
                                        id={`actualAddress-${index}`}
                                        name="actualAddress"
                                        value={entity.actualAddress || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={!entity.isEditing}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`deliveryAddress-${index}`}>Delivery Address</label>
                                    <input
                                        type="text"
                                        id={`deliveryAddress-${index}`}
                                        name="deliveryAddress"
                                        value={entity.deliveryAddress || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={!entity.isEditing}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div>
                                    <label htmlFor={`directorFullName-${index}`}>Director's Full Name:</label>
                                    <input
                                        type="text"
                                        id={`directorFullName-${index}`}
                                        name="directorFullName"
                                        value={entity.directorFullName || ''}
                                        onChange={(e) => handleChange(e, index, 'directorFullName')}
                                        disabled={!entity.isEditing}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`accountantName-${index}`}>Accountant's Name:</label>
                                    <input
                                        type="text"
                                        id={`accountantName-${index}`}
                                        name="accountantName"
                                        value={entity.accountantName || ''}
                                        onChange={(e) => handleChange(e, index, 'accountantName')}
                                        disabled={!entity.isEditing}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row single-half">
                                <div>
                                    <label htmlFor={`taxType-${index}`}>Tax Type</label>
                                    <select
                                        id={`taxType-${index}`}
                                        name="taxType"
                                        value={entity.taxType || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        className="select-input"
                                        disabled={!entity.isEditing}
                                    >
                                        <option value="">Select Tax Type</option>
                                        <option value="Income Tax">Income Tax</option>
                                        <option value="Sales Tax">Sales Tax</option>
                                        <option value="VAT">VAT</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bank-details-part">
    <h4>Bank Details</h4>
    {entity.bankDetails && entity.bankDetails.map((bank, bankIndex) => (
        <div key={bankIndex} className="bank-details">
            <div className="form-row">
                <div>
                    <label htmlFor={`bankName-${index}-${bankIndex}`}>Bank Name</label>
                    <input
                        type="text"
                        id={`bankName-${index}-${bankIndex}`}
                        name="bankName"
                        value={bank.bankName || ''}
                        onChange={(e) => handleChange(e, index, 'bankDetails', bankIndex)}
                        disabled={!entity.isEditing}
                    />
                </div>
                <div>
                    <label htmlFor={`accountCurrency-${index}-${bankIndex}`}>Account Currency</label>
                    <select
                        id={`accountCurrency-${index}-${bankIndex}`}
                        name="accountCurrency"
                        value={bank.accountCurrency || ''}
                        onChange={(e) => handleChange(e, index, 'bankDetails', bankIndex)}
                        disabled={!entity.isEditing}
                        className="select-input"
                    >
                        <option value="">Select Currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        {/* Add more currency options as needed */}
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div>
                    <label htmlFor={`currentAccount-${index}-${bankIndex}`}>Current Account</label>
                    <input
                        type="text"
                        id={`currentAccount-${index}-${bankIndex}`}
                        name="currentAccount"
                        value={bank.currentAccount || ''}
                        onChange={(e) => handleChange(e, index, 'bankDetails', bankIndex)}
                        disabled={!entity.isEditing}
                    />
                </div>
                <div>
                    <label htmlFor={`correspondentAccount-${index}-${bankIndex}`}>Correspondent Account</label>
                    <input
                        type="text"
                        id={`correspondentAccount-${index}-${bankIndex}`}
                        name="correspondentAccount"
                        value={bank.correspondentAccount || ''}
                        onChange={(e) => handleChange(e, index, 'bankDetails', bankIndex)}
                        disabled={!entity.isEditing}
                    />
                </div>
            </div>
            <div className="form-row">
                <div>
                    <label htmlFor={`bicNumber-${index}-${bankIndex}`}>BIC Number</label>
                    <input
                        type="text"
                        id={`bicNumber-${index}-${bankIndex}`}
                        name="bicNumber"
                        value={bank.bicNumber || ''}
                        onChange={(e) => handleChange(e, index, 'bankDetails', bankIndex)}
                        disabled={!entity.isEditing}
                    />
                </div>
                <div>
                    <label htmlFor={`swiftNumber-${index}-${bankIndex}`}>SWIFT Number</label>
                    <input
                        type="text"
                        id={`swiftNumber-${index}-${bankIndex}`}
                        name="swiftNumber"
                        value={bank.swiftNumber || ''}
                        onChange={(e) => handleChange(e, index, 'bankDetails', bankIndex)}
                        disabled={!entity.isEditing}
                    />
                </div>
            </div>
        </div>
    ))}
</div>
<div className="buttons-container">
    {!entity.isEditing ? (
        <>
            <button className='company-edit-button' type="button" onClick={() => handleEdit(index)}>
                <img src={edit} alt="Edit" />
                Edit
            </button>
           
        </>
    ) : (
        <>
            <button id="save-button" type="button" onClick={() => handleSave(index)}>
                Save Changes
            </button>
            <button className='remove-entity-button-detailedView' type="button" onClick={() => handleRemoveEntity(index)}>
                Remove Entity
            </button>
            <button className='cancel-button' type="button" onClick={() => handleCancel(index)}>
                Cancel
            </button>
        </>
    )}
</div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default CompanyDetailedView;
