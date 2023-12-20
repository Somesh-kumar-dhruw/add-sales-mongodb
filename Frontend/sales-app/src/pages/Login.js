import React, { useState } from "react";
import "./styles/Login.css"; // Importing the CSS styles
import { API_BASE_URL } from "../config-file/config"; // Importing the API base URL from a config file
import Swal from "sweetalert2"; // Importing SweetAlert2 for displaying alerts
import axios from "axios"; // Importing Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing a hook for programmatic navigation
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from Redux for dispatching actions

export const Login = () => {
  // State variables to manage form inputs and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Get the dispatch function to dispatch Redux actions
  const dispatch = useDispatch();
  
  // Get the navigate function to handle navigation in React Router
  const navigate = useNavigate();

  // Function to handle the login form submission
  const login = (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Check if email or password is empty
    if (!email || !password) {
      // Show an error alert if any field is empty
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please fill in all the fields.",
      });
      return; // Stop further execution
    }

    setLoading(true); // Set loading state to true while making the request
    const requestData = { email, password }; // Create a request data object

    // Send a POST request to the login API
    axios
      .post(`${API_BASE_URL}/login`, requestData)
      .then((result) => {
        // Handle the response from the API
        if (result.status === 200) {
          const token = result.data.result.token;
          const user = result.data.result.user;
          const profileImgUrl = result.data.result.profileImg;

          localStorage.setItem("token", token); // Store the token in local storage
          localStorage.setItem('user', JSON.stringify(user)); // Store the user data in local storage
          
          // Dispatch a Redux action to update the user data and profileImgUrl in the Redux store
          dispatch({ type: 'LOGIN_SUCCESS', payload: user, profileImgUrl });
          setLoading(false); // Set loading state to false
          navigate('/AddSales'); // Navigate to '/AddSales' route
          
          // Show a success alert
          Swal.fire({
            icon: "success",
            title: "Login successfully",
          });

          setEmail(""); // Clear the email input
          setPassword(""); // Clear the password input
        } else {
          setLoading(false); // Set loading state to false
          // Show a success alert with an error message
          Swal.fire({
            icon: "success",
            title: "Login failed",
            text: "Please check your email and password and try again.",
          });
        }
      })
      .catch((error) => {
        console.log(error); // Log any errors to the console
        setLoading(false); // Set loading state to false
        // Show an error alert
        Swal.fire({
          icon: "error",
          title: "Please check your email and password and try again.",
        });
      });
  };

  // JSX for the login form
  return (
    <div className="p-3">
      <div className="container mt-5 login-form">
        {loading ? ( // Display a loading spinner if loading is true
          <div className="col-12">
            <div className="clearfix">
              <div
                className="spinner-border float-end"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <strong role="status" className="fs-6">
                  wait
                </strong>
                <span className="visually-impaired"></span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center mb-3">
          <h3>LOGIN FORM</h3>
        </div>
        <form onSubmit={(e) => login(e)}> {/* Call the login function when the form is submitted */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)} // Update the email state when input changes
              value={email} // Bind the input value to the email state
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password} // Bind the input value to the password state
              onChange={(e) => setPassword(e.target.value)} // Update the password state when input changes
            />
          </div>
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
