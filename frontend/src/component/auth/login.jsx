import React, { useState ,useParams,useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { GlobalContext } from '../../context/context'
import User from './User'






function Login() {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [loading , setLoading]= useState(false)
  
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    let {state ,dispatch}= useContext(GlobalContext)
    const navigate = useNavigate(); // Initialize navigate hook



 
   
  
   

    const submitHandler = (e)=>{
        e.preventDefault()
        setLoading(true);
        

    


        axios.post('http://localhost:5000/api/login', {
            email: email,
            password: password
        })
            .then(function (response) {
             
          localStorage.setItem('token', response.data.token);
               
          const storedToken = localStorage.getItem('token');
        
          console.log("Stored Token:", storedToken);
                toast.success('Login successful!');
                console.log(response.data ,"data");
                setLoading(false);
            navigate("/")
                dispatch(  // ye dispatch profile kliye use hoga ta k data show ho login ka
                        {
                          type : "USER_LOGIN",
                          payload : response.data.user
                        })
                   
            
                        
            })
          
          

            .catch(function (error) {
                toast.error('login failed');
                setLoading(false);
                console.log(error)
            });
        }




    





     

  

  return (
    <>
   <div className="row wrapper">
    <div className="col-10 col-lg-5">
      <form
        className="shadow rounded bg-body"
        onSubmit={submitHandler}
      >
        <h2 className="mb-4">Login</h2>
        <div className="mb-3">
          <label htmlFor="email_field" className="form-label">Email</label>
          <input
            type="email"
            id="email_field"
            className="form-control"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password_field" className="form-label">Password</label>
          <input
            type="password"
            id="password_field"
            className="form-control"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <a href="/password/forgot" className="float-end mb-4">Forgot Password?</a>

        <button id="login_button" type="submit" className="btn w-100 py-2" disabled={loading}>
          {loading ? "Authenticating" : "Login"}
        </button>

        <div className="my-3">
          <a href="/register" className="float-end">New User?</a>
        </div>
      </form>
    </div>
  </div>

  </>
  )
}

export default Login
