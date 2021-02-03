import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { showloading } from "../Helpers/loading";
import { errorMessage } from '../Helpers/message';
import * as auth from '../Helpers/auth';
import * as authServices from '../Services/AuthServices';

const Signin = () => {
  const initialValues = {
    email: "",
    password: "",
    errorMsg: false,
    loading: false
  };

  const [formData, setFormData] = useState(initialValues);

  const history = useHistory();//crearmos instancia del hook

  useEffect(() => {
    if(auth.isAuthenticated() && auth.isAuthenticated().role === 1 ){
        console.log('Redirecting to admin dashboard');
        history.push('/admin/dashboard');
    }else if(auth.isAuthenticated() && auth.isAuthenticated().role === 0) {
        history.push('/user/dashboard');
    }else {
        history.push('/signin');
    }
  }, [history]);

   //Event Handlers
   const handleChangeInput = (e) => {
    setFormData({
      ...formData,[e.target.name]: e.target.value, errorMsg: ''
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //client-side validation
    if(isEmpty(formData.email) || isEmpty(formData.password) ){
        setFormData({
          ...formData, errorMsg : 'all fields are required'
        });
      } else if(!isEmail(formData.email)){
        setFormData({
          ...formData, errorMsg : 'Invalid email'
        });
      } else {
        const { email, password} = formData;
        const data = { email, password};
        setFormData({...formData, loading: true});
  
        authServices.signin(data)
          .then((res) =>{
            auth.setAuthentication(res.data.result.token,res.data.result.user);
            if(auth.isAuthenticated() && auth.isAuthenticated().role === 1 ){
                console.log('Redirecting to admin dashboard');
                history.push('/admin/dashboard');
            }else{
                history.push('/user/dashboard');
            }
            //setFormData({...formData, initialValues,  loading: false});
          })
          .catch ((err) => {
            console.log('axios signup error: ', err);
            setFormData({...formData, loading: false , errorMsg: err.response.data.message});
          })
  
  
      }
  };


  //views
  const showSigninForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      {/* email */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <input
          name="email"
          className="form-control"
          placeholder="Email address"
          type="email"
          values={formData.email}
          onChange={handleChangeInput}
        />
      </div>
      {/* password */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          name="password"
          className="form-control"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChangeInput}
        />
      </div>
      {/* signup button */}
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Signin
        </button>
      </div>
      {/* already have account */}
      <p className="text-center text-white">
        Don´t Have an account? <Link to="/signup">Register Here</Link>
      </p>
    </form>
  );

  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {formData.errorMsg && errorMessage(formData.errorMsg)}
          {formData.loading && (
            <div className="text-center pb-4">{showloading()}</div>
          )}
          {showSigninForm()}
        </div>
      </div>
    </div>
  );
};

export default Signin;
