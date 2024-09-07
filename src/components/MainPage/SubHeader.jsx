import React from 'react';
import './SubHeader.css';
import AddContract from '../../assets/svg/AddContract';


const SubHeader = () => {
    return (
        <div className="sub-header">
            <h2 className="contracts">Contracts</h2>
            <a href="#" className="add-contract">
                <AddContract />
            </a>
        </div>
    );
};

export default SubHeader;