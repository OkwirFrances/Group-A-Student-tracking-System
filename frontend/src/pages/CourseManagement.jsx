import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ManagementStyles.css';
import { courseAPI, departmentAPI, userAPI} from '../services/api';

