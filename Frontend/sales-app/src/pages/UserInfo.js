import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../config-file/config";

export const UserInfo = () => {
  // State variables to store user input and loading state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState({ preview: "", data: null });
  const [loading, setLoading] = useState(false);

  // Configuration object with headers for authorization
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  // Function to handle file selection for profile picture
  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setProfileImg(img);
  };

  // Function to upload profile picture to the server
  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append("file", profileImg.data);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/uploadFile`,
        formData
      );
      return response;
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Server Response:", error.response); // Log the response for more details
      throw error;
    }
  };

  // Function to handle user update
  const handleUserUpdate = async (e) => {
    setLoading(true);
    e.preventDefault(); // Prevent form submission

    // Check if all required fields are filled
    if (!firstName || !lastName || !password || !profileImg.data) {
      Swal.fire({
        icon: "error",
        title: "All fields are mandatory!",
      });
      setLoading(false);
      return;
    }

    try {
      // Upload profile picture and get the response
      const imgRes = await handleImgUpload();

      // Create user update request object
      const userUpdateRequest = {
        firstName,
        lastName,
        password,
        profileImg: `${API_BASE_URL}/${imgRes.data.fileName}`,
      };

      // Send user update request to the server
      const response = await axios.put(
        `${API_BASE_URL}/updateUser`,
        userUpdateRequest,
        CONFIG_OBJ
      );

      if (response.status === 200) {
        // If update is successful, reset form and show success message
        setLoading(false);
        Swal.fire("Success", "User data updated successfully!", "success");
        setFirstName("");
        setLastName("");
        setPassword("");
        setProfileImg({ preview: "", data: null });
      } else {
        // If update is not successful, show error message
        Swal.fire("Error", "Error updating user data", "error");
      }
    } catch (error) {
      // Handle errors and show error message
      setLoading(false);
      console.error(error);
      Swal.fire("Error", "Error updating user data", "error");
    }
  };

  // Render the user update form
  return (
    <div className="p-3">
      <div className="container mt-5 user-update-form">
        {loading ? (
          // Show loading spinner when loading is true
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
                <span className="visually-hidden"></span>
              </div>
            </div>
          </div>
        ) : (
          // Show form when loading is false
          ""
        )}
        <div className="d-flex justify-content-center mb-3">
          <h3>USER UPDATE</h3>
        </div>
        <form onSubmit={handleUserUpdate}>
          {/* Form inputs for first name, last name, password, and profile picture */}
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Pic</label>
            <input
              type="file"
              accept=".jpg, .png, .gif"
              className="form-control"
              name="file"
              onChange={handleFileSelect}
            />
            {/* Display a preview of the selected profile picture */}
            {profileImg.preview && (
              <div className="mt-3">
                <img
                  src={profileImg.preview}
                  width={100}
                  height={100}
                  alt="Preview"
                />
              </div>
            )}
          </div>
          {/* Submit button */}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
