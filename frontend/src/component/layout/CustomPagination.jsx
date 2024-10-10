import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import Pagination from "react-js-pagination";

const CustomPagination =({resPerPage ,  filterProductsCount}) =>{
    let [searchParams] = useSearchParams() // This extracts the current page number from the URL's query parameters
    const page = Number(searchParams.get('page')) || 1 //get pg from the query nh ho tw dfault is 1
    const [currentPage , setCurrentPage] = useState(page)
    const Navigate = useNavigate()
   console.log("filter" , filterProductsCount)
   console.log(resPerPage)
useEffect(()=>{
    setCurrentPage(page)
},[page])


// const setCurrentPageNo =(pageNumber)=>{
// setCurrentPage(pageNumber)
// if(serchParams.has("page")){
// serchParams.set("page" , pageNumber) //agr url me pgno  h tw update krdo 
// }else{
// serchParams.append("page" , pageNumber) //wrna add krdo
// }
// const path= window.location.pathname + "?" + serchParams.toString()
// Navigate(path) //it will show pg no on url

// } //provided by this package of reacjs paginationo //js pg no pe click kren g wo isko mile ga

const setCurrentPageNo = (pageNumber) => {
  setCurrentPage(pageNumber);
  if (searchParams.has("page")) {
    searchParams.set("page", pageNumber);
  } else {
    searchParams.append("page", pageNumber);
  }
  Navigate(`${window.location.pathname}?${searchParams.toString()}`);
};
     
  return (
    <div className='d-flex justify-content-center my-5'>
      {
        (filterProductsCount > resPerPage )? 
        
        <Pagination
        activePage={currentPage}
        itemsCountPerPage={resPerPage}
        totalItemsCount={filterProductsCount}
         onChange={setCurrentPageNo}
         nextPageText={"Next"} //we use next to go to next pg
         prevPageText={"prev"}
         firstPageText={"first"}
         lastPageText={"last"}
         itemClass='page-item' //css class
         linkClass='page-link'//css class
        /> :  ""

        
      }
    </div>

    //data fetch hoga home js k pg pe
  )
}

export default CustomPagination
