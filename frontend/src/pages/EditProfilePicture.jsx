import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePicture = () => {
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result); // Save the image as a base64 string
                localStorage.setItem('profilePic', reader.result); // Save to localStorage
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile picture updated successfully!');
        navigate('/profile'); 
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Edit Profile Picture</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload Profile Picture:
                    <input
                        type="file"
                        name="profilePic"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                <br />
                {profilePic && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Preview:</h3>
                        <img
                            src={profilePic}
                            alt="Profile Preview"
                            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                        />
                    </div>
                )}
                <br />
                <button type="submit" style={{ marginTop: '20px' }}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditProfilePicture;