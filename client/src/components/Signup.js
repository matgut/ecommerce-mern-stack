import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isEqual from "validator/lib/equals";
import { errorMessage, successMessage } from '../Helpers/message';
import { showloading } from '../Helpers/loading';
import * as auth from '../Helpers/auth';
import * as authServices from '../Services/AuthServices';

const Signup = () => {


  const history = useHistory();//crearmos instancia del hook
  useEffect(() => {
    if(auth.isAuthenticated() && auth.isAuthenticated().role === 1 ){
        console.log('Redirecting to admin dashboard');
        history.push('/admin/dashboard');
    }else if(auth.isAuthenticated() && auth.isAuthenticated().role === 0) {
        history.push('/user/dashboard');
    }
  }, [history]);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    password2: '',
    successMsg: false,
    errorMsg: false,
    loading: false
  }
  
  const [formData, setFormData] = useState(initialValues);

  //Event Handlers
  const handleChangeInput = (e) => {
    setFormData({
      ...formData,[e.target.name]: e.target.value,successMsg: '', errorMsg: ''
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //client-side validation
    if(isEmpty(formData.username) ||  isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.password2)){
      setFormData({
        ...formData, errorMsg : 'all fields are required'
      });
    } else if(!isEmail(formData.email)){
      setFormData({
        ...formData, errorMsg : 'Invalid email'
      });
    } else if(!isEqual(formData.password, formData.password2)){
      setFormData({
        ...formData, errorMsg : 'Password do not martch'
      });
    } else {
      const { username, email, password} = formData;
      const data = { username, email, password};
      setFormData({...formData, loading: true});

      authServices.signup(data)
        .then((res) =>{
          console.log(res);
          setFormData({...formData, initialValues,  loading: false, successMsg: res.data.message});
        })
        .catch ((err) => {
          console.log('axios signup error: ', err);
          setFormData({...formData, loading: false , errorMsg: err.response.data.message});
        })


    }


    
    console.log(formData);
  }




  //views
  const showSignupForm = () => (
    <form className='signup-form' onSubmit={handleSubmit} noValidate>
            {/* username */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-user'></i>
                    </span>
                </div>
                <input
                    name='username'
                    className='form-control'
                    placeholder='Username'
                    type='text'
                    values={formData.username}
                    onChange={handleChangeInput}
                />
            </div>
            {/* email */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-envelope'></i>
                    </span>
                </div>
                <input
                    name='email'
                    className='form-control'
                    placeholder='Email address'
                    type='email'
                    values={formData.email}
                    onChange={handleChangeInput}
                />
            </div>
            {/* password */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    name='password'
                    className='form-control'
                    placeholder='Create password'
                    type='password'
                    value={formData.password}
                    onChange={handleChangeInput}
                />
            </div>
            {/* password2 */}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock'></i>
                    </span>
                </div>
                <input
                    name='password2'
                    className='form-control'
                    placeholder='Confirm password'
                    type='password'
                    value={formData.password2}
                    onChange={handleChangeInput}
                />
            </div>
            {/* signup button */}
            <div className='form-group'>
                <button type='submit' className='btn btn-primary btn-block'>
                    Signup
                </button>
            </div>
            {/* already have account */}
            <p className='text-center text-white'>
                Have an account? <Link to='/signin'>Log In</Link>
            </p>
        </form>
  );

  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
        {formData.errorMsg && errorMessage(formData.errorMsg)}
        {formData.successMsg && successMessage(formData.successMsg)}
        {formData.loading && <div className="text-center pb-4">{showloading()}</div>}
        {showSignupForm()}
        </div>
      </div>
    
    </div>
  );
};

export default Signup;
