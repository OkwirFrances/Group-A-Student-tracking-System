import React, { useContext } from 'react';
import { AuthContext } from '../App';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password:'',
    });

    

    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        setIsTermsAccepted(e.target.checked);
    };

    const handleSignInClick = (e) => {
        console.log('Sign In:', formData);
        e.preventDefault();
        if (isFormValid) {
            const userRole = localStorage.getItem('userRole');

            if (userRole === 'registrar') {
                navigate('/registrar-dashboard');
            } else if (userRole === 'student') {
                navigate('/app');
            } else if (userRole === 'lecturer') {
                navigate('/lecturer-dashboard');
            } else {
                console.log('Invalid user role');
            }
        } else {
            console.log('Form is  not valid');
        }
    };

    const isFormValid = formData.email && formData.password.length >= 8 && isTermsAccepted;

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;