import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {
  let navigate = useNavigate();
  let {userToken, setUserToken} = useContext(UserContext);
  
  function logOut(){
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login')
  }
  return (
    <>
      <nav className ="navbar navbar-expand-lg bg-body-tertiary">
        <div className ="container-fluid">
          <Link className='nav-brand' to="/">
          <img src={logo} alt="logo" />
          </Link>
            <div className ="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className ="navbar-nav me-auto mb-2 mb-lg-0">
            {userToken != null?
            <>
                <li className ="nav-item">
                    <Link className ="nav-link active" to="/">Home</Link>
                </li>
                <li className ="nav-item">
                  <Link className ="nav-link active" aria-current="page" to="cart">Cart</Link>
                </li>
                <li className ="nav-item">
                  <Link className ="nav-link active" aria-current="page" to="products">Products</Link>
                </li>
                <li className ="nav-item">
                  <Link className ="nav-link active" aria-current="page" to="categories">Categories</Link>
                </li>                
                <li className ="nav-item">
                  <Link className ="nav-link active" aria-current="page" to="brands">Brands</Link>
                </li>
            </>:""}

            </ul>
            <ul className ="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className ="nav-item d-flex align-items-center">
                  <i className='fab fa-facebook mx-2'></i>
                  <i className='fab fa-instagram mx-2'></i>
                  <i className='fab fa-twitter mx-2'></i>
                  <i className='fab fa-tiktok mx-2'></i>
                </li>

            {userToken != null ? <>
                <li className ="nav-item">
                  <Link className ="nav-link cursor-pointer" aria-current="page" to="profile">Profile</Link>
                </li>  
                <li className ="nav-item">
                  <span onClick={()=> logOut()} className ="nav-link cursor-pointer" aria-current="page" to="">Logout</span>
                </li>   

            </>: <>
                <li className ="nav-item">
                  <Link className ="nav-link active" aria-current="page" to="login">Login</Link>
                </li>
                <li className ="nav-item">
                  <Link className ="nav-link active" aria-current="page" to="register">Register</Link>
                </li>
            </>}


             
            </ul>
            </div>
        </div>
    </nav>
    </>
  )
}
