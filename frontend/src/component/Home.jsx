import React, { useContext, useEffect, useState } from 'react'
import MetaData from './layout/MetaData'

import ProductItem from './product/ProductItem'
import axios from 'axios'

import toast from 'react-hot-toast'
import CustomPagination from './layout/CustomPagination'
import { useParams, useSearchParams } from 'react-router-dom'
import Filters from './layout/filters'

function Home() {
 
  const [items , setItems] = useState([])
  const [data ,setData] = useState({})
  let [searchParams] = useSearchParams()
  const page = searchParams.get("page") ||1
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min")|| 0
  const max = searchParams.get("max") || 1000


const category = searchParams.get('category');
const ratings = searchParams.get("ratings")
 
 

  const columnSize = keyword ? 4 : 3

  console.log("Min:", min);  // Should print the min value from the URL or null if not present
  console.log("Max:", max); 
  console.log(category)


 
//import toast in app jsand tn use infectchproduc only
 



//   useEffect(()=>{

//  const fetchProducts=async()=>{
 
 
//         const categoryQuery = category ? `&category=${category}` : '';
//         const ratingQuery = ratings? `&ratings=${ratings}` : ''

//   try {
//     let response = await axios.get(`http://localhost:5000/api/products?page=${page}&keyword=${keyword}&min=${min}&max=${max}${categoryQuery}${ratingQuery}`);
   
//     console.log("Request URL:", response);
 
//     console.log(response.data.filterProductsCount)
//     setItems(response.data.products)
//     setData(response.data)
//     toast.success('Products fetched successfully!')

// } catch (error) {
  
//     console.log(error)
//    toast.error('Failed to fetch products')
// }
//  }
//  fetchProducts();

// },[page , keyword , min,max  , category  , ratings])

useEffect(() => {
  const fetchProducts = async () => {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    console.log(token)
    const categoryQuery = category ? `&category=${category}` : '';
    const ratingQuery = ratings ? `&ratings=${ratings}` : '';

    try {
      // Make the API request with the token included in the headers
      let response = await axios.get(
        `http://localhost:5000/api/products?page=${page}&keyword=${keyword}&min=${min}&max=${max}${categoryQuery}${ratingQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Add token to Authorization header
          },
        }
      );

      console.log("Request URL:", response);

      setItems(response.data.products);  // Set fetched products
      setData(response.data);  // Set other data if needed
      toast.success('Products fetched successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch products');
    }
  };

  fetchProducts();  // Call the fetch function on component mount
}, [page, keyword, min, max, category, ratings]);






  return (
<>

<MetaData title= "Buy Best Products Online"/>
<div className="row">
  {
    (keyword)? <div className='col-6 col-md-3 mt-5'>
  <Filters/>
    </div> : ""
  }

      <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
        <h1 id="products_heading" className="text-secondary">{(keyword)? `${items.length} Products found with keyword: ${keyword}` : "Latest Products"}</h1>

        <section id="products" className="mt-5">
          <div className="row">
            
          {items.length > 0 ? (
            items.map((product) => (
              <ProductItem key={product.id} product={product} columnSize={columnSize} />
            ))
          ) : (
            <div className='loader'></div> 
            //we aplied loader class here






            
          )}
            
      
         
         
          </div>
        </section>
        <CustomPagination resPerPage={data?.resPerPage}  filterProductsCount={data?.filterProductsCount}/>
       
      </div>
    </div>
</>
   
 
  )
}

export default Home

