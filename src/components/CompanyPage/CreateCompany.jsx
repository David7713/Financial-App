import React, { useState } from 'react';
import './CreateCompany.css';
import { useCompanyContext } from '../../contexts/CompanyContext';
import { useNavigate } from 'react-router-dom';

const CreateCompany = () => {
  const { addCompany, nextId } = useCompanyContext();
  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState({
    companyId: nextId,
    companyName: '',
    country: '',
    ownersFullName: '',
    email: '',
    phoneNumber: '',
    numberOfLegalEntities: 1,
    entities: [{
      entityId: 1,
      legalName: '',
      companyType: '',
      taxType: '',
      legalDetailsName: '',
      tinNumber: '',
      legalAddress: '',
      actualAddress: '',
      deliveryAddress: '',
      directorFullName: '',
      accountantName: '',
      bankDetails: [{
        bankName: '',
        accountCurrency: '',
        currentAccount: '',
        correspondentAccount: '',
        bicNumber: '',
        swiftNumber: ''
      }]
    }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleEntityChange = (index, field, value) => {
    const newEntities = [...companyData.entities];
    newEntities[index] = { ...newEntities[index], [field]: value };
    setCompanyData({ ...companyData, entities: newEntities });
  };


  const handleBankDetailChange = (entityIndex, bankIndex, field, value) => {
    const newEntities = [...companyData.entities];
    const newBankDetails = [...newEntities[entityIndex].bankDetails];
    newBankDetails[bankIndex] = { ...newBankDetails[bankIndex], [field]: value };
    newEntities[entityIndex] = { ...newEntities[entityIndex], bankDetails: newBankDetails };
    setCompanyData({ ...companyData, entities: newEntities });
  };

  const addBankDetail = (entityIndex) => {
    const newEntities = [...companyData.entities];
    newEntities[entityIndex].bankDetails.push({
      bankName: '',
      accountCurrency: '',
      currentAccount: '',
      correspondentAccount: '',
      bicNumber: '',
      swiftNumber: ''
    });
    setCompanyData({ ...companyData, entities: newEntities });
  };

  const removeBankDetail = (entityIndex, bankIndex) => {
    const newEntities = [...companyData.entities];
    newEntities[entityIndex].bankDetails = newEntities[entityIndex].bankDetails.filter((_, i) => i !== bankIndex);
    setCompanyData({ ...companyData, entities: newEntities });
  };

  const addEntity = () => {
    setCompanyData(prevData => ({
      ...prevData,
      numberOfLegalEntities: prevData.numberOfLegalEntities + 1,
      entities: [...prevData.entities, {
        entityId: prevData.numberOfLegalEntities + 1,
        legalName: '',
        companyType: '',
        taxType: '',
        legalDetailsName: '',
        tinNumber: '',
        legalAddress: '',
        actualAddress: '',
        deliveryAddress: '',
        directorFullName: '',
        accountantName: '',
        bankDetails: [{
          bankName: '',
          accountCurrency: '',
          currentAccount: '',
          correspondentAccount: '',
          bicNumber: '',
          swiftNumber: ''
        }]
      }]
    }));
  };

  const handleRemoveEntity = (index) => {
    const newEntities = companyData.entities.filter((_, i) => i !== index);
    setCompanyData({
      ...companyData,
      numberOfLegalEntities: newEntities.length,
      entities: newEntities
    });
  };

  const validateForm = () => {
    for (const key in companyData) {
      if (Array.isArray(companyData[key])) {
        for (const entity of companyData[key]) {
          for (const field in entity) {
            if (Array.isArray(entity[field])) {
              for (const bankDetail of entity[field]) {
                for (const fieldKey in bankDetail) {
                  if (!bankDetail[fieldKey]) return false;
                }
              }
            } else if (!entity[field]) {
              return false;
            }
          }
        }
      } else if (!companyData[key]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Company data submitted:', {
        companyId: nextId,
        ...companyData
      });

      addCompany({
        companyId: nextId,
        ...companyData
      });

      setCompanyData({
        companyId: nextId,
        companyName: '',
        country: '',
        ownersFullName: '',
        email: '',
        phoneNumber: '',
        numberOfLegalEntities: 1,
        entities: [{
          entityId: 1,
          legalName: '',
          companyType: '',
          taxType: '',
          legalDetailsName: '',
          tinNumber: '',
          legalAddress: '',
          actualAddress: '',
          deliveryAddress: '',
          directorFullName: '',
          accountantName: '',
          bankDetails: [{
            bankName: '',
            accountCurrency: '',
            currentAccount: '',
            correspondentAccount: '',
            bicNumber: '',
            swiftNumber: ''
          }]
        }]
      });

      navigate('/companyListPage');
    } else {
      alert('Please fill out all required fields');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='createCompanyForm'>
        {/* Company Description Section */}
        <div className='company-description-part'>
          <p>Description</p>
          <div className="form-row">
            <div>
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={companyData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Country:</label>
              <select
                name="country"
                value={companyData.country}
                onChange={handleChange}
                className='select-input'
                required
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Owners Full Name:</label>
              <input
                type="text"
                name="ownersFullName"
                value={companyData.ownersFullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={companyData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={companyData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Number of Legal Entities:</label>
              <input
                type="number"
                name="numberOfLegalEntities"
                value={companyData.numberOfLegalEntities}
                onChange={(e) => setCompanyData({
                  ...companyData,
                  numberOfLegalEntities: parseInt(e.target.value, 10)
                })}
                required
              />
            </div>
          </div>
        </div>

        {/* Legal Entities Section */}
        <div className='entity-container'>
          <div className='entities-add-part'>
            <p>Legal Entities</p>
            {/* Add Entity Button */}
            <button
              type="button"
              onClick={addEntity}
              className='add-entity-button'
            >
              +  Add
            </button>
          </div>

          {companyData.entities.map((entity, entityIndex) => (
            <div key={entityIndex} className='legal-entities-part'>
              <p>Entity {entity.entityId}</p>

              <div className="form-row">
                <div>
                  <label>Legal Name of the Company:</label>
                  <input
                    type="text"
                    name="legalName"
                    value={entity.legalName}
                    onChange={(e) => handleEntityChange(entityIndex, 'legalName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Company Type:</label>
                  <select
                    name="companyType"
                    value={entity.companyType}
                    onChange={(e) => handleEntityChange(entityIndex, 'companyType', e.target.value)}
                    className='select-input'
                    required
                  >
                    <option value="">Select Company Type</option>
                    <option value="LLC">LLC</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
              </div>

              <div className="form-row single-half">
                <div >
                  <label>Tax Type:</label>
                  <select
                    name="taxType"
                    value={entity.taxType}
                    onChange={(e) => handleEntityChange(entityIndex, 'taxType', e.target.value)}
                    className='select-input'
                    required
                  >
                    <option value="">Select Tax Type</option>
                    <option value="Income Tax">Income Tax</option>
                    <option value="Sales Tax">Sales Tax</option>
                    <option value="Property Tax">Property Tax</option>
                  </select>
                </div>
                <div>
                  <label>Legal Details Name:</label>
                  <input
                    type="text"
                    name="legalDetailsName"
                    value={entity.legalDetailsName}
                    onChange={(e) => handleEntityChange(entityIndex, 'legalDetailsName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label>TIN Number:</label>
                  <input
                    type="text"
                    name="tinNumber"
                    value={entity.tinNumber}
                    onChange={(e) => handleEntityChange(entityIndex, 'tinNumber', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Legal Address:</label>
                  <input
                    type="text"
                    name="legalAddress"
                    value={entity.legalAddress}
                    onChange={(e) => handleEntityChange(entityIndex, 'legalAddress', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label>Actual Address:</label>
                  <input
                    type="text"
                    name="actualAddress"
                    value={entity.actualAddress}
                    onChange={(e) => handleEntityChange(entityIndex, 'actualAddress', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Delivery Address:</label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={entity.deliveryAddress}
                    onChange={(e) => handleEntityChange(entityIndex, 'deliveryAddress', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label>Director's Full Name:</label>
                  <input
                    type="text"
                    name="directorFullName"
                    value={entity.directorFullName}
                    onChange={(e) => handleEntityChange(entityIndex, 'directorFullName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Accountant's Name:</label>
                  <input
                    type="text"
                    name="accountantName"
                    value={entity.accountantName}
                    onChange={(e) => handleEntityChange(entityIndex, 'accountantName', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Bank Details Section */}
              <div className='bank-details-section'>
                <p>Bank Details</p>
                {entity.bankDetails.map((bankDetail, bankIndex) => (
                  <div key={bankIndex} className='bank-detail'>
                    <div className="form-row">
                      <div>
                        <label>Bank Name:</label>
                        <input
                          type="text"
                          name="bankName"
                          value={bankDetail.bankName}
                          onChange={(e) => handleBankDetailChange(entityIndex, bankIndex, 'bankName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
  <label>Account Currency:</label>
  <select
    name="accountCurrency"
    value={bankDetail.accountCurrency}
    onChange={(e) => handleBankDetailChange(entityIndex, bankIndex, 'accountCurrency', e.target.value)}
    required
  >
    <option value="">Select Currency</option>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="GBP">GBP</option>
    <option value="JPY">JPY</option>
    <option value="CAD">CAD </option>
  
    {/* Add more options as needed */}
  </select>
</div>
                    </div>

                    <div className="form-row">
                      <div>
                        <label>Current Account:</label>
                        <input
                          type="text"
                          name="currentAccount"
                          value={bankDetail.currentAccount}
                          onChange={(e) => handleBankDetailChange(entityIndex, bankIndex, 'currentAccount', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label>Correspondent Account:</label>
                        <input
                          type="text"
                          name="correspondentAccount"
                          value={bankDetail.correspondentAccount}
                          onChange={(e) => handleBankDetailChange(entityIndex, bankIndex, 'correspondentAccount', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div>
                        <label>BIC Number:</label>
                        <input
                          type="text"
                          name="bicNumber"
                          value={bankDetail.bicNumber}
                          onChange={(e) => handleBankDetailChange(entityIndex, bankIndex, 'bicNumber', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label>SWIFT Number:</label>
                        <input
                          type="text"
                          name="swiftNumber"
                          value={bankDetail.swiftNumber}
                          onChange={(e) => handleBankDetailChange(entityIndex, bankIndex, 'swiftNumber', e.target.value)}
                          required
                        />
                      </div>
                    </div>



                    {/* Remove Bank Detail Button */}

                    {entity.bankDetails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBankDetail(entityIndex, bankIndex)}
                        className='remove-bank-detail-button'
                      >
                        Remove Bank Detail
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Bank Detail Button */}
                <button
                  type="button"
                  onClick={() => addBankDetail(entityIndex)}
                  className='add-bank-detail-button'
                >
                  Add Bank Detail
                </button>
              </div>

              {/* Remove Entity Button */}
              {companyData.entities.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveEntity(entityIndex)}
                  className='remove-entity-button'
                >
                  Remove Entity
                </button>
              )}
            </div>
          ))}


        </div>

        <button type="submit" className='submit-button'>Submit</button>
      </form>
    </div>
  );
};

export default CreateCompany;
