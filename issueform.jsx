// import React, { useState, useRef, useContext } from 'react';
// import './issueform.css';
// import upload from '../../assets/upload.png';
// import { IssuesContext } from '../../context/IssueContext';
// import { issueAPI } from '../../services/api'; // Import the API function

// const IssueForm = () => {
//     const { setNotificationMessage } = useContext(IssuesContext);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         category: '',
//         registrar: '',
//         lecturer: '',
//         coursecode: '',
//         coursename: '',
//         attachment: null,
//     });

//     const fileInputRef = useRef(null);

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData({
//             ...formData,
//             [name]: files ? files[0] : value,
//         });
//     };

//     const handleFileClick = (e) => {
//         e.preventDefault();
//         fileInputRef.current.click();
//     };

//     const isFormComplete = () => {
//         return formData.title && formData.description && formData.category && formData.attachment;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formDataToSend = new FormData();
//         formDataToSend.append('title', formData.title);
//         formDataToSend.append('description', formData.description);
//         formDataToSend.append('issue_type', formData.category);
//         formDataToSend.append('registrar', formData.registrar);
//         formDataToSend.append('lecturer', formData.lecturer);
//         formDataToSend.append('course', formData.coursecode);
//         formDataToSend.append('semester', 'Semester 1'); // Example hardcoded value
//         formDataToSend.append('image', formData.attachment);

//         try {
//             const response = await issueAPI.createIssue(formDataToSend); // Use the API function
//             setNotificationMessage({
//                 message: 'Your issue has been submitted successfully!',
//                 date: new Date().toLocaleDateString(),
//                 time: new Date().toLocaleTimeString(),
//             });

//             alert('Issue submitted successfully!');
//             setFormData({
//                 title: '',
//                 description: '',
//                 category: '',
//                 registrar: '',
//                 lecturer: '',
//                 coursecode: '',
//                 coursename: '',
//                 attachment: null,
//             });
//         } catch (error) {
//             console.error('Error submitting the issue:', error);
//             alert('Failed to submit the issue. Please try again.');
//         }
//     };

//     return (
//         <div className="issue-form-container">
//             <div className="issue-form-header">
//                 <h1>Create a New Issue</h1>
//             </div>
//             <div className="issue-form-content">
//                 <label className="registrar-select-label">
//                     Registrar's Name
//                     <select
//                         name="registrar"
//                         value={formData.registrar}
//                         onChange={handleChange}
//                         className="registrar-select"
//                     >
//                         <option value="">Select Registrar</option>
//                         <option value="cocis">COCIS Registrar</option>
//                         <option value="cedat">CEDAT Registrar</option>
//                         <option value="chuss">CHUSS Registrar</option>
//                     </select>
//                 </label>
//                 <label className="course-code-label">
//                     Course Unit Code
//                     <input
//                         className="course-code-input"
//                         type="text"
//                         name="coursecode"
//                         placeholder="Enter The Course Code"
//                         value={formData.coursecode}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <label className="lecturer-label">
//                     Lecturer's Name
//                     <select
//                         name="lecturer"
//                         value={formData.lecturer}
//                         onChange={handleChange}
//                         className="lecturer-select"
//                     >
//                         <option value="">Select Lecturer</option>
//                         <option value="lule">Dr. Lule Bosco</option>
//                         <option value="waswa">Dr. Waswa Shafick</option>
//                         <option value="alvin">Dr. Alvin David</option>
//                     </select>
//                 </label>
//                 <label className="upload-label">
//                     Upload Photo
//                     <div className="upload-section">
//                         {formData.attachment ? (
//                             <img
//                                 src={URL.createObjectURL(formData.attachment)}
//                                 alt="selected"
//                                 className="selected-image"
//                             />
//                         ) : (
//                             <>
//                                 <img src={upload} alt="upload" className="upload-icon" />
//                                 <button onClick={handleFileClick} className="upload-link">
//                                     Upload a file
//                                 </button>{' '}
//                                 or drag and drop PNG, JPG
//                             </>
//                         )}
//                         <input
//                             type="file"
//                             ref={fileInputRef}
//                             style={{ display: 'none' }}
//                             accept="image/png, image/jpeg"
//                             name="attachment"
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </label>
//                 <label className="issue-label">
//                     Issue Title
//                     <input
//                         className="issue-title-input"
//                         type="text"
//                         name="title"
//                         placeholder="Enter Issue Title"
//                         value={formData.title}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <label className="issue-label">
//                     Issue Category
//                     <select
//                         className="issue-select"
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                     >
//                         <option value="">Select Category</option>
//                         <option value="missing_marks">Missing Marks</option>
//                         <option value="appeal">Appeal</option>
//                         <option value="correction">Correction</option>
//                     </select>
//                 </label>
//                 <label className="issue-label">
//                     Issue Description
//                     <input
//                         type="text"
//                         name="description"
//                         placeholder="Enter the issue description"
//                         className="issue-description-input"
//                         value={formData.description}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <label className="issue-label">
//                     Course Unit Name
//                     <input
//                         type="text"
//                         name="coursename"
//                         placeholder="Enter the Course Unit Name"
//                         className="course-name-input"
//                         value={formData.coursename}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <button
//                     className="issue-submit-button"
//                     onClick={handleSubmit}
//                     disabled={!isFormComplete()}
//                 >
//                     Submit
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default IssueForm;

// In issueform.jsx
import React, { useState, useRef, useContext, useEffect } from 'react';
import './issueform.css';
import upload from '../../assets/upload.png';
import { IssuesContext } from '../../context/IssueContext';
import { issueAPI } from '../../services/api';

const IssueForm = () => {
    const { setNotificationMessage } = useContext(IssuesContext);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        course: '',
        lecturer: '',
        attachment: null,
    });
    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Fetch student's enrolled courses
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await issueAPI.getStudentCourses();
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const fetchLecturersForCourse = async (courseId) => {
        try {
            setLoading(true);
            const response = await issueAPI.getCourseLecturers(courseId);
            setLecturers(response.data);
        } catch (error) {
            console.error('Error fetching lecturers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'course') {
            // When course changes, fetch lecturers for that course
            fetchLecturersForCourse(value);
            setFormData({
                ...formData,
                [name]: value,
                lecturer: '' // Reset lecturer when course changes
            });
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value,
            });
        }
    };

    const handleFileClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    const isFormComplete = () => {
        return formData.title && 
               formData.description && 
               formData.category && 
               formData.course && 
               formData.attachment;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('issue_type', formData.category);
        formDataToSend.append('course', formData.course);
        formDataToSend.append('image', formData.attachment);

        try {
            const response = await issueAPI.createIssue(formDataToSend);
            setNotificationMessage({
                message: 'Your issue has been submitted successfully!',
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            });

            alert('Issue submitted successfully!');
            setFormData({
                title: '',
                description: '',
                category: '',
                course: '',
                lecturer: '',
                attachment: null,
            });
        } catch (error) {
            console.error('Error submitting the issue:', error);
            alert('Failed to submit the issue. Please try again.');
        }
    };

    return (
        <div className="issue-form-container">
            <div className="issue-form-header">
                <h1>Create a New Issue</h1>
            </div>
            <div className="issue-form-content">
                <label className="course-label">
                    Course
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="course-select"
                        disabled={loading}
                    >
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.code} - {course.name}
                            </option>
                        ))}
                    </select>
                </label>
                
                <label className="lecturer-label">
                    Lecturer (Optional)
                    <select
                        name="lecturer"
                        value={formData.lecturer}
                        onChange={handleChange}
                        className="lecturer-select"
                        disabled={loading || !formData.course}
                    >
                        <option value="">Select Lecturer</option>
                        {lecturers.map(lecturer => (
                            <option key={lecturer.id} value={lecturer.id}>
                                {lecturer.fullname}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="upload-label">
                    Upload Photo
                    <div className="upload-section">
                        {formData.attachment ? (
                            <img
                                src={URL.createObjectURL(formData.attachment)}
                                alt="selected"
                                className="selected-image"
                            />
                        ) : (
                            <>
                                <img src={upload} alt="upload" className="upload-icon" />
                                <button onClick={handleFileClick} className="upload-link">
                                    Upload a file
                                </button>{' '}
                                or drag and drop PNG, JPG
                            </>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/png, image/jpeg"
                            name="attachment"
                            onChange={handleChange}
                        />
                    </div>
                </label>

                <label className="issue-label">
                    Issue Title
                    <input
                        className="issue-title-input"
                        type="text"
                        name="title"
                        placeholder="Enter Issue Title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>

                <label className="issue-label">
                    Issue Category
                    <select
                        className="issue-select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="missing_marks">Missing Marks</option>
                        <option value="appeal">Appeal</option>
                        <option value="correction">Correction</option>
                    </select>
                </label>

                <label className="issue-label">
                    Issue Description
                    <textarea
                        name="description"
                        placeholder="Enter the issue description"
                        className="issue-description-input"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                    />
                </label>

                <button
                    className="issue-submit-button"
                    onClick={handleSubmit}
                    disabled={!isFormComplete() || loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default IssueForm;