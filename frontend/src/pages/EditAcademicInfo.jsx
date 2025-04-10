import React from 'react';

const EditAcademicInfo = () => {
    return (
        <div>
            <h1>Edit Academic Information</h1>
            <form>
                <label>
                    Registration Number:
                    <input type="text" name="registrationNumber" />
                </label>
                <br />
                <label>
                    Student Number:
                    <input type="text" name="studentNumber" />
                </label>
                <br />
                <label>
                    Course:
                    <input type="text" name="course" />
                </label>
                <br />
                <label>
                    Semester:
                    <input type="text" name="semester" />
                </label>
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditAcademicInfo;