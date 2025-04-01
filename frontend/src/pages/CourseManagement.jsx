import React, { useState, useEffect, use } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ManagementStyles.css';
import { courseAPI, departmentAPI, userAPI} from '../services/api';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const[formData, setFormData] = useState({
        name: '',
        code: '',
        department_id: '' //changed from department to match the model
});
const navigate = useNavigate();

useEffect(() => {
    const verifyAccess = async () => {
        try {
            const userInfo = await userAPI.getUserInfo();
            if (userInfo.role !== 'registrar') {
                toast.error('Unauthorized access');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Role verification failed:', error);
        }
    };
    verifyAccess();
        fetchData();
    }, [navigate]);

    