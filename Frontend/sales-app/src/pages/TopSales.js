import "./styles/TopSales.css";
import React, { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../config-file/config";
import Swal from "sweetalert2";
import axios from "axios";
import { NavLink } from "react-router-dom";

// Define a functional component for displaying the top 5 sales
export const TopSales = () => {
  const [salesData, setSalesData] = useState([]);

  const fetchSalesData = useCallback(() => {
    const CONFIG_OBJ = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get(`${API_BASE_URL}/showmyentry`, CONFIG_OBJ)
      .then((response) => {
        if (response.status === 200) {
          setSalesData(response.data.entries);
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "You have to login first.",
        });
      });
  }, []);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

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
    <div className="p-3">
      {/* Create a container for the component */}
      {localStorage.getItem("token") != null ? (
        <div className="container mt-5">
          {/* Display the component title */}
          <div className=" mb-4">
            <h3 className="text-center">TOP 5 SALES</h3>
          </div>
          <div>
            {/* Create a table to display sales data */}
            <table>
              <tbody>
                {/* Table header with column names */}
                <tr>
                  <th>#</th>
                  <th key="salesId">Sales Id:</th>
                  <th key="productName">Product Name</th>
                  <th key="quantity">Quantity</th>
                  <th key="amount">Sale Amount</th>
                </tr>
                {/* Map over salesData to display each entry */}
                {salesData.map((entry, index) => (
                  <tr key={entry._id}>
                    <td>{index + 1}</td>
                    <td>{entry.salesId}</td>
                    <td>{entry.productName}</td>
                    <td>{entry.quantity}</td>
                    <td>{entry.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TopSales; // Export the TopSales component
