import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAcademicInfo = () => {
    const navigate = useNavigate();

    
    const [academicInfo, setAcademicInfo] = useState({
        registrationNumber: localStorage.getItem('registrationNumber') || '',
        studentNumber: localStorage.getItem('studentNumber') || '',
        course: localStorage.getItem('course') || '',
        semester: localStorage.getItem('semester') || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAcademicInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSave = () => {
        
        localStorage.setItem('registrationNumber', academicInfo.registrationNumber);
        localStorage.setItem('studentNumber', academicInfo.studentNumber);
        localStorage.setItem('course', academicInfo.course);
        localStorage.setItem('semester', academicInfo.semester);

        alert('Academic information updated successfully!');
        navigate('/profile'); 
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Edit Academic Information</h1>
            <form>
                <label>
                    Registration Number:
                    <input
                        type="text"
                        name="registrationNumber"
                        value={academicInfo.registrationNumber}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Student Number:
                    <input
                        type="text"
                        name="studentNumber"
                        value={academicInfo.studentNumber}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Course:
                    <input
                        type="text"
                        name="course"
                        value={academicInfo.course}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Semester:
                    <input
                        type="text"
                        name="semester"
                        value={academicInfo.semester}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="button" onClick={handleSave}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditAcademicInfo;