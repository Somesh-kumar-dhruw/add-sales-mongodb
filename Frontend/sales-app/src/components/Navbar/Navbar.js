import React, {  useEffect } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../config-file/config";
import axios from "axios";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const img = useSelector((state) => state.userReducer.user);
  const profileImgUrl = useSelector((state) => state.userReducer.profileImgUrl); // Get profileImgUrl from Redux


  useEffect(() => {
    const fetchProfileImage = async () => {
      if (img && img._id) {
        // Fetch the profile image only if a user is logged in
        const CONFIG_OBJ = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };

        try {
          const response = await axios.get(
            `${API_BASE_URL}/profileImg`,
            CONFIG_OBJ
          );

          // Assuming the response contains a "profileImg" field with the image URL
          const profileImgURL = response.data.profileImg;

          function convertBlobUrlToImageUrl(blobUrl) {
            if (blobUrl.startsWith("blob:")) {
              // Create a function to convert the blob URL to a normal image URL
              const imageUrl = blobUrl.replace(/^blob:/, "http:");
              return imageUrl;
            }
            return blobUrl; // If not a blob URL, return it as is
          }

          const imageUrl = convertBlobUrlToImageUrl(profileImgURL);

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { ...img, profileImg: imageUrl }, // Update user data with profileImg
            profileImgUrl: imageUrl, // Update profileImgUrl in Redux
          });

        } catch (error) {
          console.log("Error fetching profile image:", error);
        }
      }
    };

    fetchProfileImage();
  }, [img, dispatch]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_ERROR" });
    navigate("/login");
  };

  // Define a default profile picture URL
  const defaultProfileImgURL =
    "https://img.freepik.com/free-vector/gradient-colorful-sale-background_52683-57679.jpg?w=900&t=st=1696231443~exp=1696232043~hmac=742a57dd8ad00c1e5b6f931363e7da2e1b010d413da8d5d2dc66d73823c9ea86";

  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        data-bs-theme="dark"
        style={{ backgroundColor: "rgb(18 97 255)" }}
      >
        <div className="container-fluid">
          {/* Navbar Brand */}
          <NavLink className="navbar-brand" to="/">
            <h4 className="my-auto lg-mx-4">
              {localStorage.getItem("token") != null ? (
                <img
                  src={profileImgUrl || defaultProfileImgURL}
                  className="p-1 post-profile-pic"
                  alt=""
                />
              ) : (
                ""
              )}
              SALES APP
            </h4>
          </NavLink>
          {/* Navbar Toggler Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar Links */}
          <div
            className="collapse navbar-collapse active"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Nav Item: Add Sales */}
              <li className="nav-item">
                <NavLink
                  className="nav-link clickable-link"
                  aria-current="page"
                  to="/AddSales"
                >
                  ADD SALES
                </NavLink>
              </li>
              {/* Nav Item: Top 5 Sales */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/TopSales">
                  TOP 5 SALES
                </NavLink>
              </li>
              {/* Nav Item: Today's Total Revenue */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/TodayRevenue">
                  TODAY'S TOTAL REVENUE
                </NavLink>
              </li>
              {/* Nav Item: Today's Total Revenue */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/UserInfo">
                  UPDATE USER
                </NavLink>
              </li>
              {/* Nav Item: Login */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/Login">
                  LOGIN
                </NavLink>
              </li>
              {/* Nav Item: Register */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/Registration">
                  REGISTER
                </NavLink>
              </li>
              {/* Nav Item: Logout */}
              {localStorage.getItem("token") != null ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    onClick={() => logout()}
                  >
                    LOGOUT
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
