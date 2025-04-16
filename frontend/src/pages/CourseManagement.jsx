import React, { useState } from 'react';
import './CourseManagement.css';
import { toast } from 'react-toastify';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([
        { id: 1, name: 'Computer Science' },
        { id: 2, name: 'Information Technology' },
        { id: 3, name: 'Software Engineering' },
    ]);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        department_id: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const newCourse = {
                id: courses.length + 1, // Generate a unique ID
                name: formData.name,
                code: formData.code,
                department: departments.find(dept => dept.id === parseInt(formData.department_id)),
            };
            setCourses([...courses, newCourse]);
            toast.success('Course created successfully');
            setFormData({ name: '', code: '', department_id: '' });
        } catch (error) {
            console.error('Error creating course:', error);
            toast.error('Failed to create course. Please check your inputs.');
        }
    };

    const handleDelete = (courseId) => {
        try {
            setCourses(courses.filter(course => course.id !== courseId));
            toast.success('Course deleted successfully');
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Failed to delete course');
        }
    };

    return (
        <div className="course-content">
            <h1>Course Management</h1>

            <div className="course-management-container">
                <div className="course-form-section">
                    <h2>Create New Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="course-form-group">
                            <label>Course Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="E.g. Data Structures"
                            />
                        </div>
                        <div className="course-form-group">
                            <label>Course Code</label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                required
                                placeholder="E.g. CS201"
                            />
                        </div>
                        <div className="course-form-group">
                            <label>Department</label>
                            <select
                                name="department_id"
                                value={formData.department_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="course-submit-button">
                            Create Course
                        </button>
                    </form>
                </div>

                <div className="course-list-section">
                    <h2>Existing Courses</h2>
                    {courses.length > 0 ? (
                        <div className="course-table-container">
                            <table className="course-management-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Department</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course.id}>
                                            <td>{course.name}</td>
                                            <td>{course.code}</td>
                                            <td>{course.department?.name || 'N/A'}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDelete(course.id)}
                                                    className="course-delete-button"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="course-no-data">No courses found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseManagement;



