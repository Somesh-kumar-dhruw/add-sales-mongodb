// Import necessary libraries and modules
import "./styles/AddSales.css"; // Import CSS styles
import React, { useState } from "react"; // Import React and useState
import axios from "axios"; // Import Axios for making HTTP requests
import { API_BASE_URL } from "../config-file/config"; // Import API base URL
import Swal from "sweetalert2"; // Import SweetAlert2 for displaying alerts
import { NavLink } from "react-router-dom";

export const AddSales = () => {
  // Define state variables for form inputs and loading state
  const [salesId, setSalesId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const addSales = (event) => {
    event.preventDefault();

    setLoading(true);

    const storeEntries = { salesId, productName, quantity, amount };

    axios
      .post(`${API_BASE_URL}/entrysales`, storeEntries, CONFIG_OBJ)
      .then((result) => {
        if (result.status === 201) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Entries successfully added",
          });

          setSalesId("");
          setProductName("");
          setQuantity("");
          setAmount("");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unable to fetch sales data",
          });
        }
      })
      .catch((error) => {
        console.error(error);

        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again later.",
        });
      });
  };

  // / Check if there's no token and display an error message
  if (localStorage.getItem("token") === null) {
    return (
      <div className="m-2">
        <div className="container mt-5 py-1">
          <div className="alert alert-danger" role="alert">
            You must be logged in to access this page. Please{" "}
            <NavLink to="/login">login</NavLink>.
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-2">
      {/* Outer container */}
      {localStorage.getItem("token") != null ? (
        <div className="container mt-5">
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
          {/* Container for the form */}
          <div className="d-flex justify-content-center mb-2">
            <h3>ADD SALE ENTRY</h3> {/* Heading for the add sale entry form */}
          </div>
          <form onSubmit={(e) => addSales(e)}>
            {/* Sales Id input */}
            <div className="mb-3">
              <label className="form-label">Sales Id</label>
              <input
                type="text"
                className="form-control"
                name="salesId"
                value={salesId}
                onChange={(e) => setSalesId(e.target.value)}
              />
            </div>
            {/* Product Name input */}
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            {/* Quantity input */}
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="text"
                className="form-control"
                name="productQuantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            {/* Amount input */}
            <div className="mb-4">
              <label className="form-label">Amount</label>
              <input
                type="text"
                className="form-control"
                name="productAmount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {/* Submit button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
