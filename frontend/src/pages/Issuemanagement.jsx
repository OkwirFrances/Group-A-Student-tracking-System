import React, { useState } from 'react';
import './Issuemanagement.css';
import { FiPlus } from 'react-icons/fi';

const Issuemanagement = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    registrar: '',
    lecturer: '',
    coursecode: '',
    coursename: '',
    attachment: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="issue-management-container">
      <div className="header">
        <h1>New Issue</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="issue-form">
        <div className="form-group">
          <label htmlFor="title">Issue Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter issue title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your issue"
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="academic">Academic</option>
              <option value="technical">Technical</option>
              <option value="administrative">Administrative</option>
            </select>
          </div>

          <div className="form-group half-width">
            <label htmlFor="registrar">Registrar</label>
            <select
              id="registrar"
              name="registrar"
              value={formData.registrar}
              onChange={handleChange}
            >
              <option value="">Select registrar</option>
              {/* Add registrar options */}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel">Cancel</button>
          <button type="submit" className="btn-submit">Submit Issue</button>
        </div>
      </form>
    </div>
  );
};

export default Issuemanagement;