import React from 'react';

const EditProfilePicture = () => {
    return (
        <div>
            <h1>Edit Profile Picture</h1>
            <form>
                <label>
                    Upload Profile Picture:
                    <input type="file" name="profilePic" />
                </label>
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProfilePicture;