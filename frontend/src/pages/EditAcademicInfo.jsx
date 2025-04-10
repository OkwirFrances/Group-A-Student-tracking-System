import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditAcademicInfo.css';

const EditAcademicInfo = () => {
    const navigate = useNavigate();

    // Initialize state for academic information
    const [formData, setFormData] = useState({
        registrationNumber: localStorage.getItem('userRegistrationNumber') || '',
        studentNumber: localStorage.getItem('userStudentNumber') || '',
        semester: localStorage.getItem('userSemester') || '',
        course: localStorage.getItem('userCourse') || '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Save updated academic information to local storage
        localStorage.setItem('userRegistrationNumber', formData.registrationNumber);
        localStorage.setItem('userStudentNumber', formData.studentNumber);
        localStorage.setItem('userSemester', formData.semester);
        localStorage.setItem('userCourse', formData.course);
        // Navigate back to the profile page
        navigate('/profile');
    };

    return (
        <div className="edit-academic-info-container">
            <h1>Profile &gt; Academic Information</h1>
            <form className="edit-academic-info-form" onSubmit={handleSubmit}>
                <h2>Academic Information</h2>
                <label>
                    Registration Number
                    <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        placeholder="Enter your registration number"
                        required
                    />
                </label>
                <label>
                    Student Number
                    <input
                        type="text"
                        name="studentNumber"
                        value={formData.studentNumber}
                        onChange={handleChange}
                        placeholder="Enter your student number"
                        required
                    />
                </label>
                <label>
                    Semester
                    <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                    >
                        <option value="">Select your semester</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                        <option value="8th">8th</option>
                    </select>
                </label>
                <label>
                    Course
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                    >
                        <option value="">Select your course</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                    </select>
                </label>
                <button type="submit" className="save-changes-button">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditAcademicInfo;