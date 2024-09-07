import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ContractPageHistoryPageAttachments.css';
import DocumentIcon from '../../assets/svg/DocumentIcon';
import DownloadIcon from '../../assets/svg/DownloadIcon';


const ContractPageHistoryPageAttachments = () => {
    const [activeTab, setActiveTab] = useState('report');
    const { contractId } = useParams();

    const attachments = [
        { contractId: 1, attachmentId: 1, name: 'REPORT.docx', type: 'report' },
        { contractId: 2, attachmentId: 2, name: 'Reports1.docx', type: 'report' },
        { contractId: 2, attachmentId: 3, name: 'reports23.pdf', type: 'report' },
        { contractId: 2, attachmentId: 4, name: 'Other file.docx', type: 'report' },
        { contractId: 3, attachmentId: 5, name: 'Doc name.docx', type: 'report' },
        { contractId: 2, attachmentId: 6, name: 'FILE 2.docx', type: 'report' },
        { contractId: 1, attachmentId: 7, name: 'Doc name.docx', type: 'invoice' },
        { contractId: 2, attachmentId: 8, name: 'Doc name.docx', type: 'report' },
        { contractId: 2, attachmentId: 9, name: 'Doc name pop.docx', type: 'invoice' },
        { contractId: 1, attachmentId: 10, name: 'Doc name.docx', type: 'report' },
        { contractId: 3, attachmentId: 11, name: 'Applicant Data.docx', type: 'invoice' },
        { contractId: 2, attachmentId: 12, name: 'Doc name.docx', type: 'invoice' },
    ];

    const filteredAttachments = attachments.filter(
        attachment => attachment.type === activeTab && attachment.contractId === parseInt(contractId)
    );

    const handleTabClick = (tabType) => {
        setActiveTab(tabType);
    };

    return (
        <>
            <div className="attachments-container">
                <h2>Attachments</h2>
                <div className="attachments-tabs">
                    <button
                        className={`reports-tab ${activeTab === 'report' ? 'active' : ''}`}
                        onClick={() => handleTabClick('report')}
                    >
                        Reports
                    </button>
                    <button
                        className={`invoices-tab ${activeTab === 'invoice' ? 'active' : ''}`}
                        onClick={() => handleTabClick('invoice')}
                    >
                        Invoices
                    </button>
                </div>
                <ul className="attachments-list">
                    {filteredAttachments.map((attachment) => (
                        <li key={attachment.attachmentId} className="attachment-item">
                            <DocumentIcon size={16} />
                            <span>{attachment.name}</span>
                            <button className="history-page-download-button">
                                <DownloadIcon size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="history-page-export-button-block">
                <button className="history-page-export-button">
                    <DownloadIcon size={16} />
                    Export data
                </button>
            </div>
        </>
    );
};

export default ContractPageHistoryPageAttachments;