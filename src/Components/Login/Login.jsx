import React, { useContext, useState } from 'react';
import Style from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  let {setUserToken, setUserData} = useContext(UserContext);
  let navigate = useNavigate();
  const [error, setError] = useState(null)
  const [isLoading, setisLoading]= useState(false) 
  
  async function LoginSubmit(values){
    const apiName = process.env.REACT_APP_API;
    setisLoading(true);
    let {data} = await axios.post(`${apiName}auth/signin`, values)
    .catch((error)=> {
      setisLoading(false)
      setError(error.response.data.message)})
    if (data.message === "success"){
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      setUserData(data.user)
      setisLoading(false)
      navigate('/')
    }
  }
  

  let validateSchema = Yup.object(
    {
      email:Yup.string().email("email is invalid").required("email is required"),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/, "password start with UPPER Char").required("password is required"),
    }
  )
  let formik = useFormik({
      initialValues:{
        email:"",
        password:"",
      },
      validationSchema:validateSchema,
      onSubmit:LoginSubmit

  })
  return (
    <>
    <div className="w-75 mx-auto py-5">
      {error != null?<div className="alert mt-2 p-2 alert-danger">{error}</div>:""}
      <h3>Login Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} name="email" value={formik.values.email} className='form-control mb-2'/>
        {formik.errors.email && formik.touched.email?<div className="alert mt-2 p-2 alert-danger">{formik.errors.email}</div>:""}        

        <label htmlFor="password">Password: </label>
        <input id="password" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} name="password" value={formik.values.password} className='form-control mb-2'/>
        {formik.errors.password && formik.touched.password?<div className="alert mt-2 p-2 alert-danger">{formik.errors.password}</div>:""}        

        {isLoading?<button type="button" className="btn bg-main text-white mt-2">
          <i className='fas fa-spinner fa-spin'></i></button>:
          <>
            <div className='d-flex align-items-center'>
              <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn mx-2 bg-main text-white mt-2">Login</button> 
              <Link className='text-main btn mt-3' to="/register">Register Now</Link>
            </div>          
          </>
        }
      
      </form>
    </div>
    </>
  )
}
