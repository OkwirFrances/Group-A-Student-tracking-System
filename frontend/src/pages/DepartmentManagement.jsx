import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { departmentAPI, userAPI} from '../services/api';

const DepartmentManagement = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        code: ''
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

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await departmentAPI.getDepartments();
            setDepartments(data);
        } catch (error) {
            toast.error(error.message || 'Failed to load departments');
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await departmentAPI.createDepartment(formData);
            toast.success('Department created successfully');
            setFormData({ name: '', code: '' });
            await fetchData();
        } catch (error) {
            toast.error(error.message || 'Failed to create department. Please check your inputs.');
        }
    };


