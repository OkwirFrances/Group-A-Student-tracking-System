import React, { useState } from 'react';
import './issueform.css';




const IssueForm = () => {
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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
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
                    <option vlaue='cedat'>CEDAT Registrar</option>
                    <option value='chuss'>CHUSS Registrar</option>
                </select>
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
            </div>
        </div>
    );
};

export default IssueForm;