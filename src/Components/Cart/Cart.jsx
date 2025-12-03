import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { MutatingDots } from 'react-loader-spinner';
export default function Cart() {
  let {getCartItems, deleteCartItems, updateCartItems, clearCart} = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  
  async function updateCart(id, count){
    let {data} = await updateCartItems(id, count);
    setCartDetails(data);
  }
  async function clearCartItems(){
    let {data} = await clearCart();
    console.log(data);
    setCartDetails(data);
  }

  async function deleteCartItem(id) {
    let {data} = await deleteCartItems(id);
    setCartDetails(data);
  }
  async function CartItems(){
    let {data} = await getCartItems();

    if (data?.status === "success"){
      setCartDetails(data);
      console.log(data);
    } else {
      console.log('Failed to fetch cart items');
    }
  }

  useEffect(()=>
    {
      CartItems();
    }
  ,[]);

  return <>
    {cartDetails?<div className='w-75 mx-auto bg-main-light my-3 p-3 rounded-3'>  
      <h3>Shopping Cart</h3>
      <h4 className="h6 text-main">Cart Items: {cartDetails?.numOfCartItems}</h4>
      <h4 className="h6 text-main">Total Cart Price: {cartDetails.data.totalCartPrice? cartDetails.data.totalCartPrice:"0"}</h4>
      <button onClick={()=> clearCartItems()} className='btn text-light bg-main'>Clear</button>
      {cartDetails.data.products.map((product) => 
      <div key={product.product.id} className='row my-4'>
        <div className="col-md-1">
          <img className='w-100' src={product.product.imageCover} alt="" />
        </div>
        <div className="col-md-11">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className='h6'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
                <h6 className='text-main'>Price: {product.price} EGP</h6>
              </div>
              <div>
                <button onClick={()=> updateCart(product.product.id, product.count+1)} className='btn brdr-main p-1'>+</button>
                <span className='h6 mx-2'>{product.count}</span>
                <button onClick={()=> updateCart(product.product.id, product.count-1)} className='btn brdr-main p-1'>-</button>

              </div>
          </div>
          <button onClick={()=>deleteCartItem(product.product.id)} className='btn p-0'><i className='fas fa-trash-can font-sm text-danger'></i></button>
      </div>
    </div>)}
    </div>
    :<section id='loading' className='d-flex justify-content-center align-items-center'>
      <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
      
      </section>}

    </>
}
