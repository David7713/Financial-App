import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SettingsPersonalDataMainPanel.css';
import ChangePasswordIcon from '../../assets/svg/ChangePasswordIcon';
import RemoveImageIcon from '../../assets/svg/RemoveImageIcon';
import UploadImageIcon from '../../assets/svg/UploadImageIcon.svg';


const PersonalDataMainPanel = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleRemoveImage = () => {
        setProfileImage('');
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        navigate('change-password-set-email');
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                if (file.size <= 5 * 1024 * 1024) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setProfileImage(e.target.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert('File size exceeds 5 MB limit');
                }
            } else {
                alert('Please upload JPEG or PNG file');
            }
        }
    };

    return (
        <div className="profile-block">
            <div className="profile-main-info">
                <div
                    className="profile-image-container"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="profile-image"
                        />
                    ) : (
                        <img
                            src={UploadImageIcon}
                            alt="Upload"
                            className="profile-image"
                            onClick={handleUploadClick}
                        />
                    )}
                    {isHovering && profileImage && (
                        <div className="remove-image-icon" onClick={handleRemoveImage}>
                            <RemoveImageIcon />
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png"
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="profile-info">
                    <div className="profile-name">Ann Smith</div>
                    <div className="profile-email">annsmith@example.com</div>
                    <div className="profile-image-info">
                        *Supported file types for profile image are: JPEG, PNG; Maximum file size: 5 MB
                    </div>
                </div>
            </div>
            <div className="profile-divider"></div>
            <div className="change-password-block">
                <button className="change-password-button" onClick={handleChangePassword}>
                    <ChangePasswordIcon />
                    <span>Change password</span>
                </button>
            </div>
        </div>
    );
};

export default PersonalDataMainPanel;