// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Validation from './SignupValidation';
// import axios from 'axios';

// function Signup() {
//     const [values, setValues] = useState({
//         idLogin: '',
//         Name: '',
//         email: '',
//         DOB: '',
//         Password: ''
//     });

//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});

//     const handleInput = (event) => {
//         setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const err = Validation(values);
//         setErrors(err);
//         if (err.Name === "" && err.email === "" && err.Password === "") {
//             axios.post('http://localhost:8082/signup', values)
//                 .then(res => {
//                     navigate('/');
//                 })
//                 .catch(err => console.log(err));
//         }
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
//             <div className='bg-white p-3 rounded w-25'>
//                 <h2>Sign-Up</h2>
//                 <form action="" onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor="Name">Name</label>
//                         <input type="text" placeholder='Enter Name' name='Name' onChange={handleInput} className='form-control rounded-0' />
//                         {errors.Name && <span className='text-danger'> {errors.Name}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor="email">Email</label>
//                         <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0' />
//                         {errors.email && <span className='text-danger'> {errors.email}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor="DOB">Date of Birth</label>
//                         <input type="date" name="DOB" onChange={handleInput} className='form-control rounded-0' />
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor="Password">Password</label>
//                         <input type="password" placeholder="Enter Password" name="Password" className="form-control rounded-0" />

//                         {errors.Password && <span className='text-danger'> {errors.Password}</span>}
//                     </div>
//                     <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
//                     <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Signup;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Validation from './SignupValidation';
// import axios from 'axios';

// function Signup() {
//     const [values, setValues] = useState({
//         idLogin: '',
//         Name: '',
//         email: '',
//         DOB: '',
//         Password: ''
//     });

//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});

//     const handleInput = (event) => {
//         setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const err = Validation(values);
//         setErrors(err);
//         if (Object.values(err).every(error => error === "")) {
//             axios.post('http://localhost:8082/signup', values)
//                 .then(res => {
//                     navigate('/');
//                 })
//                 .catch(err => console.log(err));
//         }
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
//             <div className='bg-white p-3 rounded w-25'>
//                 <h2>Sign-Up</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor="Name">Name</label>
//                         <input type="text" placeholder='Enter Name' name='Name'
//                             value={values.Name} onChange={handleInput} className='form-control rounded-0' />
//                         {errors.Name && <span className='text-danger'> {errors.Name}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor="email">Email</label>
//                         <input type="email" placeholder='Enter Email' name='email'
//                             value={values.email} onChange={handleInput} className='form-control rounded-0' />
//                         {errors.email && <span className='text-danger'> {errors.email}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor="DOB">Date of Birth</label>
//                         <input type="date" name="DOB" value={values.DOB} onChange={handleInput} className='form-control rounded-0' />
//                         {errors.DOB && <span className='text-danger'> {errors.DOB}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor="Password">Password</label>
//                         <input type="password" placeholder="Enter Password" name="Password" value={values.Password} onChange={handleInput} className="form-control rounded-0" />
//                         {errors.Password && <span className='text-danger'> {errors.Password}</span>}
//                     </div>
//                     <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
//                     <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        DOB: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:8082/signup', values);
                setSuccessMessage(response.data.message);
                setErrorMessage('');
                setValues({ name: '', email: '', DOB: '', password: '' });
                navigate('/');
            } catch (error) {
                setErrorMessage('An error occurred. Please try again.');
                setSuccessMessage('');
                console.error(error);
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange} className='form-control rounded-0' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={values.email} onChange={handleInputChange} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="DOB">Date of Birth:</label>
                        <input type="date" id="DOB" name="DOB" value={values.DOB} onChange={handleInputChange} className='form-control rounded-0' />
                        {errors.DOB && <span className='text-danger'>{errors.DOB}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={values.password} onChange={handleInputChange} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
    );
}

export default Signup;
