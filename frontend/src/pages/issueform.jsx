import React, { useState, useRef, useContext } from 'react';
import './issueform.css';
import upload from '../assets/upload.png';
import { IssuesContext } from '../context/IssueContext';

const IssueForm = () => {
    const { addIssue } = useContext(IssuesContext);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        registrar: '',
        lecturer: '',
        coursecode: '',
        coursename: '',
        attachment: null,
    });

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleFileClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const isFormComplete = () => {
        return Object.values(formData).every(value => value !== '' && value !== null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newIssue = {
            ...formData,
            status: 'pending',
            date: new Date().toLocaleDateString(),
        };
        addIssue(newIssue);
        console.log('Form submitted successfully', formData);
        alert("Issue submitted successfully!");
        setFormData({
            title: '',
            description: '',
            category: '',
            registrar: '',
            lecturer: '',
            coursecode: '',
            coursename: '',
            attachment: null,
        });
    };

    return (
        <div className='issue-form-container'>
            <div className='issue-form-header'>
                <h1>Create a new isssue</h1>
            </div>
        <div className='issue-form-content'>
            <label className='registrar-select-label'>
                Registrar's Name
                <select
                    name='registrar'
                    value={formData.registrar}
                    onChange={handleChange}
                    className='registrar-select'>
                    <option value=''>Select Registrar</option>
                    <option value='cocis'>COCIS Registrar</option>
                    <option vue='cedat'>CEDAT Registrar</option>
                    <option value='chuss'>CHUSS Registrar</option>
                </select>
            </label>
            <label className='course-code-label'>
                Course Unit Code
                <input 
                className='course-code-input'
                type='text'
                name='coursecode'
                placeholder='Enter The Course Code'
                value={formData.coursecode}
                onChange={handleChange} />
            </label>
            <label className='lecturer-label'>
                Lecturer's Name
                <select
                name='lecturer'
                value={formData.lecturer}
                onChange={handleChange}
                className='lecturer-select'>
                    <option value=''>Select Lecturer</option>
                    <option value='lule'>Dr. Lule Bosco</option>
                    <option value='waswa'>Dr. Waswa Shafick</option>
                    <option value='alvin'>Dr. Alvin David</option>
                </select>
            </label>
            <label className='upload-label'>
                Upload Photo
                <div className='upload-section'>
                    {formData.attachment ? (
                        <img src={URL.createObjectURL(formData.attachment)} alt='selected' className='selected-image' />
                    ) : (
                        <>
                            <img src={upload} alt='upload' className='upload-icon' />
                            <button  onClick={handleFileClick} className='upload-link'>Upload a file</button> or drag and drop PNG, JPG
                        </>
                    )}
                    <input
                        type='file'
                        ref={fileInputRef}
                        style={{ display: 'none'}}
                        accept='image/png, image/jpeg'
                        name='attachment'
                        onChange={handleChange} />
                </div>
            </label>
            <label className='issue-label'>
                Issue Title
                <input
                className='issue-title-input'
                type='text'
                name='title'
                placeholder='Enter Issue Title'
                value={formData.title}
                onChange={handleChange}/>
            </label>
            <label className='issue-label'> 
                Issue Category
                <select
                className='issue-select'
                name='category'
                value={formData.category}
                onChange={handleChange}>
                    <option value=''>Select Category</option>
                    <option value='missingmarks'>Missing Marks</option>
                    <option value='appeal'>Appeal</option>
                    <option value='correction'>Correction</option>
                </select>
            </label>
            <label className='issue-label'>
                Issue Description
                <input
                type='text'
                name='description'
                placeholder='Enter the issue description'
                className='issue-description-input'
                value={formData.description}
                onChange={handleChange} />
            </label>
            <label className='issue-label'>
                Course Unit Name
                <input
                type='text'
                name='coursename'
                placeholder='Enter the Course Unit Name'
                className='course-name-input'
                value={formData.coursename}
                onChange={handleChange} />
            </label>
            <button
                className='issue-submit-button'
                onClick={handleSubmit}
                disabled={!isFormComplete()}>
                    Submit
            </button>
            </div>
        </div>
    );
};

export default IssueForm;