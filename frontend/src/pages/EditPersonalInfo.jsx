import React from 'react';

const EditPersonalInfo = () => {
    return (
        <div>
            <h1>Edit Personal Information</h1>
            <form>
                <label>
                    Phone Number:
                    <input type="text" name="phoneNumber" />
                </label>
                <br />
                <label>
                    Gender:
                    <input type="text" name="gender" />
                </label>
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditPersonalInfo;