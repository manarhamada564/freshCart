import React, { useContext } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { MutatingDots } from 'react-loader-spinner';

export default function FeatureProducts() {
  const apiName = process.env.REACT_APP_API;
  // const [products, setProducts] = useState([]);
  // const [isLoading, setisLoading] = useState(false);

  //   async function getFeatureProducts(){
  //     setisLoading(true)
  //     let {data} = await axios.get(`${apiName}/products`)
  //     setProducts(data.data);
  //     setisLoading(false)
      
  //   }
  //   useEffect(()=>{
  //     getFeatureProducts();
  //   },[])
  
  let {addToCart} = useContext(CartContext);
  async function handleAddToCart(productID){
    let response = await addToCart(productID);
    console.log(response);
    if (response?.data?.status === "success"){
      toast.success('Product added to cart successfully', {duration: 3000, position: 'top-center' });
    } else {
      toast.error('Failed to add product to cart', {duration: 3000, position: 'top-center' });
    }
  }
  function getFeatureProducts(){
      return axios.get(`${apiName}products`) 
    }

  let { data, isLoading, isError, isFetching } = useQuery({
    queryKey: 'featureProducts',
    queryFn: getFeatureProducts,
    chacheTime: 3000,
    staleTime: 60000
  });
  return <>
      <div className="container py-2">
        <div className='row'>
          {!isLoading? <>
          {data?.data.data.map((product)=> 
          <div key={product.id} className='col-md-2'>
            <div className='product py-3 px-2 cursor-pointer'>
              <Link to={`/productdetails/${product.id}`}>
              <img className='w-100' src={product.imageCover} alt={product.title} />
              <span className='text-main font-sm py-2'>{product.category.name}</span>
              <h3 className='h6'>{product.title.split(" ").slice(0,2).join(' ')}</h3>
              <div className='d-flex justify-content-between mt-3'>
                <span>{product.price} EGP</span>
                <span>
                  <i className='fas fa-star rating-color'></i>
                  {product.ratingsAverage}
                  </span>
              </div>
              </Link>
              <button onClick={()=> handleAddToCart(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>add to cart</button>
            </div>
            </div>
          )}
          </>:<div className='loading'>      
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
                    </div>}

        </div>
      </div>
    </>

}
