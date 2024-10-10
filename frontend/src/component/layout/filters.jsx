import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getPriceQueryParams } from '../../helpers/helpers'
import { PRODUCT_CATEGORIES } from '../constant/constant'
import ReactStars from 'react-rating-stars-component';


function Filters() {
    const[min,setMin] = useState(0)
    const [max, setMax ] = useState(0) 
    let [searchParams] = useSearchParams()
    const Navigate = useNavigate()

    // reload pe valuebaki rhy box pe
    useEffect(()=>{
     searchParams.has("min") && setMin(searchParams.get("min"))   //here and means agr aesah tw ye krdo
    searchParams.has("max") &&  setMax(searchParams.get("max")) 
    },[])
 
//for category and ratings
const handleClick =(checkbox)=>{ //check box carry all e.target
  const checkboxes = document.getElementsByName(checkbox.name)
checkboxes.forEach((item)=>{
  //This condition checks whether the current checkbox (item) in the iteration is 
  //the same as the checkbox that was clicked by user(checkbox).
if(item !== checkbox)  item.checked = false

if(checkbox.checked === false){
  //delete filter from query
  if(searchParams.has(checkbox.name)){
    searchParams.delete(checkbox.name)
  }
  //redirect to updated path
  const path = window.location.pathname + "?" + searchParams.toString();
  Navigate(path);
}else{
  //set new filter value if already there
  if(searchParams.has(checkbox.name)){
    searchParams.set(checkbox.name , checkbox.value)
  }else{
    searchParams.append(checkbox.name , checkbox.value)
  }
  const path = window.location.pathname + "?" + searchParams.toString();
  Navigate(path);
}
})

}

//reload k bad bh checked rhy
const defaultCheckHandler = (checkboxType, checkboxValue) => {
  // Get the current value from the URL search parameters
  const value = searchParams.get(checkboxType);

  // If the current value matches the checkbox value, return true (checkbox should be checked)
  if (checkboxValue === value) return true;

  // Otherwise, return false (checkbox should not be checked)
  return false;
};


//for price
    const handleButtonClick = (e) => {
        e.preventDefault();
    
        // Update searchParams with price filters
        searchParams = getPriceQueryParams(searchParams, "min", min);
        searchParams = getPriceQueryParams(searchParams, "max", max);
    
        const path = window.location.pathname + "?" + searchParams.toString();
        Navigate(path);
      };
  return (

          <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
        className="px-2"
        action="your_action_url_here"
        method="get"
        onSubmit={handleButtonClick}
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name={min}
              value={min}
              onChange={(e)=> setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name={max}
              value={max}
            
              onChange={(e)=> setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>
{PRODUCT_CATEGORIES.map((item)=>(
    <div className="form-check">
    <input
      className="form-check-input"
      type="checkbox"
      name="category"
      id="check4"
      value={item}
      onClick={(e)=>handleClick(e.target)}
  
      defaultChecked = {defaultCheckHandler("category" , item)}
    />
    <label className="form-check-label" for="check4">{item} </label>
  </div>
 

))}


    
      <hr />
      <h5 className="mb-3">Ratings</h5>

{
  [5,4,3,2,1].map((ratings)=>(
    <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value={ratings}
          onClick={(e)=>handleClick(e.target)}
  
          defaultChecked = {defaultCheckHandler("rating" ,ratings?.toString() )}

        />
        <label className="form-check-label" for="check7">
           {/* ye react star rating ki web se liya */}
           <ReactStars
              value={ratings}
               count= {5}
              size={22}
              activeColor="#ffb829"
            />
        </label>
      </div>
  ))
}
  
     
    </div>

  )
}

export default Filters
