import React, { useContext, useEffect } from 'react';
import Style from './Profile.module.css';
import { jwtDecode } from "jwt-decode";
import { UserContext } from '../../Context/UserContext';

export default function Profile() {
  const encodedToken = localStorage.getItem('userToken');
  const decodedToken = jwtDecode(encodedToken);
  let {userData} = useContext(UserContext);
  console.log("userData",userData);

  return (
    <>
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>  
          <div className='p-4 text-center'>
            <h3 className='mb-4'>User Profile</h3>
            <ul className='list-unstyled'>
              <li className='mb-3'><strong>Name:</strong> {userData.name}</li>
              <li className='mb-3'><strong>Email:</strong> {userData.email}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>  
    </>
  )
}
