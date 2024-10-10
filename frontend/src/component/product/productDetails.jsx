import React, { useContext } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import ReactStars from "react-rating-stars-component";

import toast from 'react-hot-toast';


const ProductDetails =()=>
   
{
    const {id} = useParams()
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImg , setActiveImg] = useState("")
  
   


  //default image kliye use
   useEffect(()=>{
    setActiveImg(product.images?.[0] ? product?.images[0].url : "./images//default_product.png")
   },[product])

    useEffect(() => {
        const fetchProductDetails = async () => { 
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`, { withCredentials: true });
                setProduct(response.data.product);
                console.log(response.data.product.name , "name")
                console.log(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

  return (
    <div className="row d-flex justify-content-around">
    <div className="col-12 col-lg-5 img-fluid" id="product_image">
      <div className="p-3">
        <img
          className="d-block w-100"
          src={activeImg}
          alt={product.name}
          width="340"
          height="390"
        />
      </div>
      <div className="row justify-content-start mt-5">
        {product.images?.map((img)=>(
           <div className="col-2 ms-4 mt-2">
           <a role="button">
             <img
               className={`d-block border rounded p-3 cursor-pointer ${img.url === activeImg ? "border-warning" : ""}`}
               height="100"
               width="100"
               src={img?.url}
               alt=""
               onClick={(e)=>setActiveImg(img.url)} //click krne pe 0 wali hat k ye ajaye active img pe
             />
           </a>
         </div>
        ))}
       
      </div>
    </div>

    <div className="col-12 col-lg-5 mt-5">
      <h3>{product.name}</h3>
      <p id="product_id">Product # w43453456456756786</p>

      <hr />

      <div className="d-flex">
      {/* ye react star rating ki web se liya */}
      <ReactStars
    count={product.ratings}

    size={24}
    activeColor="#ffd700"
  />,

        <span id="no-of-reviews" className="pt-1 ps-2"> {product.numOfReviews} </span>
      </div>
      <hr />

      <p id="product_price">{product.price}</p>
      <div className="stockCounter d-inline">
        <span className="btn btn-danger minus">-</span>
        <input
          type="number"
          className="form-control count d-inline"
          value="1"
          readonly
        />
        <span className="btn btn-primary plus">+</span>
      </div>
      <button
        type="button"
        id="cart_btn"
        className="btn btn-primary d-inline ms-4"
        disabled=""
      >
        Add to Cart
      </button>

      <hr />

      <p>
        Status: <span id="stock_status" className={(product.stock > 0)? "greenColor" : "redColor" }>{(product.stock > 0)? "in Stock" : "out of stock"}</span>
      </p>

      <hr />

      <h4 className="mt-2">Description:</h4>
      <p>
       {product.description}
      </p>
      <hr />
      <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

      <div className="alert alert-danger my-5" type="alert">
        Login to post your review.
      </div>
    </div>
  </div>

  )
}

export default ProductDetails
