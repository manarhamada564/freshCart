import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products"
import Cart from "./Components/Cart/Cart"
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import Categories from "./Components/Categories/Categories"
import NotFound from "./Components/NotFound/NotFound"
import Brands from "./Components/Brands/Brands"
import  { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile/Profile';

let routers = createBrowserRouter([
  {path:"/", element:<Layout/>, children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"login", element:<Login/>},
    {path:"register", element:<Register/>},
    {path:"profile", element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:"products", element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"categories", element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"cart", element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"brands", element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"productdetails/:id", element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:"*", element:<NotFound/>},
  ]}
])

export default function App() {
    let {setUserToken} = useContext(UserContext)
    useEffect(()=> {
      if (localStorage.getItem('userToken') !== null){
        setUserToken(localStorage.getItem('userToken'))
      }

  }, [])

  return  <CartContextProvider>
    <RouterProvider router = {routers}>
      </RouterProvider> 
    <Toaster/>
  </CartContextProvider>
}