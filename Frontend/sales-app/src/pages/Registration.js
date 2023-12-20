// Import necessary libraries and modules
import React, { useState } from "react"; // Import React and useState
import axios from "axios"; // Import Axios for making HTTP requests
import "./styles/Registration.css"; // Import CSS styles for the Registration component
import { API_BASE_URL } from "../config-file/config"; // Import API base URL
import Swal from "sweetalert2"; // Import SweetAlert2 for displaying alerts

export const Registration = () => {
  // Define state variables for first name, last name, email, password, and loading state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle the registration form submission
  const registration = (event) => {
    event.preventDefault();

    // Check if first name, last name, email, and password are not empty
    if (!firstName || !lastName || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please fill in all the fields.",
      });
      return;
    }

    // Set loading state to true while the request is being made
    setLoading(true);

    // Create an object to store the registration data
    const requestData = { firstName, lastName, email, password };

    // Send a POST request to the registration endpoint
    axios
      .post(`${API_BASE_URL}/registration`, requestData)
      .then((result) => {
        if (result.status === 201) {
          // Reset loading state and show a success alert
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "User successfully registered",
          });

          // Clear input fields after successful registration
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error(error);

        // Reset loading state and show an error alert
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Invalid Crediential",
        });
      });
  };

  return (
    <div className="p-3">
      <div className="container mt-5 registration-form">
        {loading ? (
          <div className="col-12">
            {/* Loading spinner */}
            <div className="clearfix">
              <div
                className="spinner-border float-end"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <strong role="status" className="fs-6">
                  wait
                </strong>
                <span className="visually-hidden"></span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center mb-3">
          <h3>REGISTRATION FORM</h3> {/* Display the registration form title */}
        </div>
        <form onSubmit={(e) => registration(e)}>
          {/* Input field for the user's first name */}
          <div className="mb-3">
            <label className="form-label">First Name</label>{" "}
            {/* Label for first name input */}
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />{" "}
            {/* Input field for first name */}
          </div>

          {/* Input field for the user's last name */}
          <div className="mb-3">
            <label className="form-label">Last Name</label>{" "}
            {/* Label for last name input */}
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />{" "}
            {/* Input field for last name */}
          </div>

          {/* Input field for the user's email */}
          <div className="mb-3">
            <label className="form-label">Email</label>{" "}
            {/* Label for email input */}
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            {/* Input field for email */}
          </div>

          {/* Input field for the user's password */}
          <div className="mb-3">
            <label className="form-label">Password</label>{" "}
            {/* Label for password input */}
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            {/* Input field for password */}
          </div>

          {/* Submit button */}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>{" "}
            {/* Display a submit button */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration; // Export the Registration component
