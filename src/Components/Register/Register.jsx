import React, { useState } from 'react';
import Style from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const apiName = process.env.REACT_APP_API;
  let navigate = useNavigate();
  const [error, setError] = useState(null)
  const [isLoading, setisLoading]= useState(false) 
  async function submitRegister(values){
    setisLoading(true);
    let {data} = await axios.post(`${apiName}auth/signup`, values)
    .catch((error)=> {
      setisLoading(false)
      setError(error.response.data.message)})
    if (data.message === "success"){
      setisLoading(false)
      navigate('/login')
    }
  }
  // ----------------- manual validation --------------------------------
  // function validate(values){
  //   let phoneRegex = /^01[0125][0-9]{8}$/
  //   let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  //   let errors={};
  //   if (!values.name){
  //     errors.name="name is required"
  //   }
  //   else if(values.name.length <3){
  //     errors.name="name min length is 3"
  //   }
    
  //   if (!values.phone){
  //     errors.phone="phone is required"
  //   }
  //   else if(!phoneRegex.test(values.phone)){
  //     errors.phone= "phone is invalid"
  //   }
  //   if (!values.email){
  //     errors.email="email is required"
  //   }
  //   else if(!emailRegex.test(values.email)){
  //     errors.email= "email is invalid"
  //   }
  //     return errors;
  //   }
  let phoneRegex = /^01[0125][0-9]{8}$/

  let validateSchema = Yup.object(
    {
      name:Yup.string().min(3, "name min lenght 3").max(10, "name max lenght 10").required("name is required"),
      email:Yup.string().email("email is invalid").required("email is required"),
      phone:Yup.string().matches(phoneRegex, "phone is invalid").required("phone is required"),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}/, "password start with UPPER Char").required("password is required"),
      rePassword:Yup.string().oneOf([Yup.ref("password"), "repassword must match password"]).required("repassword is required")
    }
  )
  let formik = useFormik({
      initialValues:{
        name:"",
        phone:"",
        email:"",
        password:"",
        rePassword:""
      },
      validationSchema:validateSchema,
      onSubmit:submitRegister

  })
  return (
    <>
    <div className="w-75 mx-auto py-5">
      {error != null?<div className="alert mt-2 p-2 alert-danger">{error}</div>:""}
      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} name="name" value={formik.values.name} className='form-control mb-2'/>
        {formik.errors.name && formik.touched.name?<div className="alert mt-2 p-2 alert-danger">{formik.errors.name}</div>:""}        
        <label htmlFor="phone">Phone: </label>
        <input id="phone" type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} name="phone" value={formik.values.phone} className='form-control mb-2'/>
        {formik.errors.phone && formik.touched.phone?<div className="alert mt-2 p-2 alert-danger">{formik.errors.phone}</div>:""}        

        <label htmlFor="email">Email: </label>
        <input id="email" type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} name="email" value={formik.values.email} className='form-control mb-2'/>
        {formik.errors.email && formik.touched.email?<div className="alert mt-2 p-2 alert-danger">{formik.errors.email}</div>:""}        

        <label htmlFor="password">Password: </label>
        <input id="password" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} name="password" value={formik.values.password} className='form-control mb-2'/>
        {formik.errors.password && formik.touched.password?<div className="alert mt-2 p-2 alert-danger">{formik.errors.password}</div>:""}        

        <label htmlFor="rePassword">Repassword: </label>
        <input id="rePassword" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} name="rePassword" value={formik.values.rePassword} className='form-control mb-2'/>
        {formik.errors.rePassword && formik.touched.rePassword?<div className="alert mt-2 p-2 alert-danger">{formik.errors.rePassword}</div>:""}        
        {isLoading?<button type="button" className="btn bg-main text-white mt-2">
          <i className='fas fa-spinner fa-spin'></i></button>:
          <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-2">Register</button>
        }
      
      </form>
    </div>
    </>
  )
}
