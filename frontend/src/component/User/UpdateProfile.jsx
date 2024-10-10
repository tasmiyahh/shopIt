import React, { useState } from 'react'
import axios from 'axios';

function UpdateProfile() {
  const [name, setName]= useState()
  const [email , setEmail] = useState()

  const updateProfile = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Sending a PUT request to update the user profile
      const response = await axios.put("http://localhost:5000/api/me/update", {
        name,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the token from localStorage
        },
      });

      // Log the response
      console.log("Profile updated:", response.data);

    } catch (err) {
      console.log("Failed to update user profile", err);
    }
  };






   
  

  return (
   <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
        
          onSubmit={updateProfile}

        >
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label"> Name </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value= {name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label"> Email </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn w-100">Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
