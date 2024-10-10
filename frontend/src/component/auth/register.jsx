import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

function Register() {
const [email , setEmail]= useState(""
)
const [password , setPassword]= useState(""
)
const [name , setName]= useState(""
)


  const [loading , setLoading]= useState(false)

  


  const submitHandler =(e)=>{
    e.preventDefault()
    setLoading(true);




    axios.post('http://localhost:5000/api/register', {
      name : name,
        email: email,
        password: password
    })
        .then(function (response) {
            localStorage.setItem('token', response.data.token);
            toast.success('signup successful!');
            console.log(response.data);
            setLoading(false);
         
        })
        .catch(function (error) {
            toast.error('signup failed');
            setLoading(false);
            console.log(error)
        });
  }

return (
    <div className="row wrapper">
    <div className="col-10 col-lg-5">
      <form
        className="shadow rounded bg-body"
       onSubmit={submitHandler}
      >
        <h2 className="mb-4">Register</h2>

        <div className="mb-3">
          <label for="name_field" className="form-label">Name</label>
          <input
            type="text"
            id="name_field"
            className="form-control"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}

          />
        </div>

        <div className="mb-3">
          <label for="email_field" className="form-label">Email</label>
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
          <label for="password_field" className="form-label">Password</label>
          <input
            type="password"
            id="password_field"
            className="form-control"
            name="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>

        <button id="register_button" type="submit" className="btn w-100 py-2">
         {loading? "creating" : "Register"}
        </button>
      </form>
    </div>
  </div>
  )
}

export default Register
