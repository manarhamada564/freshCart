import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();
const apiName = process.env.REACT_APP_API;
let userToken = localStorage.getItem('userToken')
let header= {
    token: userToken
}

function addToCart(productID) {
    return axios.post(`${apiName}cart`,{
        productId: productID
    }, {
        headers: header
    }).then((response) => response)
    .catch((error) =>  error)
}

function getCartItems(){
    return axios.get(`${apiName}cart`, {
        headers: header
    }).then((response) => response)
    .catch((error) =>  error)
}
function deleteCartItems(productID){
    return axios.delete(`${apiName}cart/${productID}`, {
        headers: header
    }).then((response) => response)
    .catch((error) =>  error)
}
function updateCartItems(productID, count){
    return axios.put(`${apiName}cart/${productID}`,{
        count: count}, 
        {headers: header})
    .then((response) => response)
    .catch((error) =>  error)
}
function clearCart(){
    return axios.delete(`${apiName}cart`, {
        headers: header
    }).then((response) => response)
    .catch((error) =>  error)
}
export default function CartContextProvider(props) {
    return <CartContext.Provider value={{addToCart,getCartItems, deleteCartItems, updateCartItems, clearCart}}>
        {props.children}
        </CartContext.Provider>;


}