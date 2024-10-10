import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/context";

const User = () => {
  const [user, setUser] = useState(null);   // State for storing user data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null);  // State for error handling

  const {state , dispatch} = useContext(GlobalContext)
 // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/me" ,{ //The word "Bearer" is like a label that tells the server, "I'm sending a token with this request."
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`  // Fetching token from localStorage
          }
          
        });
       //In short, you're adding your stored token to the request so the server knows you're logged in and can give you access to things you need.
        setUser(response.data.user);  // Setting the user data from response
        setLoading(false); 
                   // Stop loading

        dispatch({
          type: "USER_LOGIN",
          payload: response.data.user
        })         
      } catch (err) {
        setError("Failed to fetch user profile");
        setLoading(false);            // Stop loading on error
      }
    };

    fetchUserProfile();  // Fetch user profile on component mount
  }, [dispatch]);


  


  

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>{error}</div>;

  // Display user information
  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {state?.user?.name}</p>
          <p><strong>Email:</strong> {state.user?.email}</p>
          {/* Add other user fields as needed */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default User;

