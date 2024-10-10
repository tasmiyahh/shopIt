import React, { useContext } from 'react'
import Search from './Search'
import { GlobalContext } from '../../context/context'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


function Header() {
  const {state ,dispatch} = useContext(GlobalContext)
  const navigate =useNavigate()

  
  console.log(state)

  const logout = async () => {
    try {
      // Call the backend logout API
      await axios.get('http://localhost:5000/api/logout'); // Adjust the endpoint if needed

      // Optionally clear localStorage or any state used for auth (if applicable)
      localStorage.removeItem('token'); // If you stored the token here
      toast.success("logout")
      // Redirect the user to the login page or homepage after logout
      navigate('/login');
      console.log("logout")
      dispatch({
        type: "USER_LOGOUT"
      })
     
    } catch (error) {
      console.error("Error during logout:", error.response?.data?.message || error.message);
    }
  };
  return (
    <nav className="navbar row">
    <div className="col-12 col-md-3 ps-5">
      <div className="navbar-brand">
        <a href="/">

        {/* The public folder is served by the development server and the build output as the root directory (/).thats why we put only / */}
          <img src="/images/shopit_logo.png" alt="ShopIT Logo" />
        </a>
      </div>
    </div>
    <div className="col-12 col-md-6 mt-2 mt-md-0">
    <Search/>
    </div>
    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      <a href="/cart" style={{textDecoration: "none"}}>
        <span id="cart" className="ms-3"> Cart </span>
        <span className="ms-1" id="cart_count">0</span>
      </a>


{state?.isLogin === true ?(
   <div className="ms-4 dropdown">
   <button
     className="btn dropdown-toggle text-white"
     type="button"
     id="dropDownMenuButton"
     data-bs-toggle="dropdown"
     aria-expanded="false"
   >
     <figure className="avatar avatar-nav">
       <img
         src={state?.user?.avatar ? state.user?.avatar?.url : "/images/default_avatar.jpg" }
         alt="User Avatar"
         className="rounded-circle"
       />
     </figure>
     <span>{state?.user?.name}</span>
   </button>
   <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
   <Link className="dropdown-item" to="/admin/dashboard"> Dashboard </Link>

   <Link className="dropdown-item" to="/me/orders"> Orders </Link>

   <Link className="dropdown-item" to="/me/profile"> Profile </Link>

   <Link className="dropdown-item text-danger" to="/" onClick={logout}> Logout </Link>
   </div>
 </div>

) : (
  <Link to="/login" class="btn ms-4" id="login_btn"> Login </Link>
)}
     

     
    </div>
  </nav>
  )
}

export default Header
