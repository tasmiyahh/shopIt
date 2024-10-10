import "./App.css"
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Header from "./component/layout/header";
import Footer from "./component/layout/footer";
import Home from "./component/Home";
import toast, { Toaster } from 'react-hot-toast';
import ProductDetails from "./component/product/productDetails";
import Login from "./component/auth/login";
import Register from "./component/auth/register";
import Profile from "./component/User/Profile";
import axios from "axios";
import User from "./component/auth/User";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/context";
import UpdateProfile from "./component/User/UpdateProfile";




function App() {
const {state ,dispatch} = useContext(GlobalContext)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/me" ,{ //The word "Bearer" is like a label that tells the server, "I'm sending a token with this request."
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`  // Fetching token from localStorage
          }
          
        });
      

        dispatch({
          type: "USER_LOGIN",
          payload: response.data.user
        })         
      } catch (err) {
       console.log(err)          // Stop loading on error
      }
    };

    fetchUserProfile();  // Fetch user profile on component mount
  }, [dispatch]);
  
  return (
 <Router>
   <div className="App">
    {/* just instal package and wrap it in ap.jsx */}
    <Toaster position="top-center" reverseOrder={false}/>
     <Header/>
     <div className="container">
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/product/:id" element = {<ProductDetails/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
   
        <Route path="/me/profile" element = {<Profile/>}/>
        <Route path="/me/update_profile" element = {<UpdateProfile/>}/>
        
       
      </Routes>
    
     </div>

     <Footer/>
    </div>
 </Router>
  );
}

export default App;
