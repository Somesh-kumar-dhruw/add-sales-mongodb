// Import necessary libraries and modules
import "./styles/TodayRevenue.css"; 
import React, { useState, useEffect } from "react"; 
import { API_BASE_URL } from "../config-file/config";
import Swal from "sweetalert2"; 
import axios from "axios"; 
import { NavLink } from "react-router-dom";

// Define a functional component for displaying today's revenue
export const TodayRevenue = () => {
  // Define state variables for total revenue and entries
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [entries, setEntries] = useState([]);

  // Use useEffect to fetch total revenue and entries when the component mounts
  useEffect(() => {
    // Create a configuration object for API requests with headers
    const CONFIG_OBJ = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    // Fetch total revenue
    axios.get(`${API_BASE_URL}/totalavenue`, CONFIG_OBJ)
      .then((response) => {
        if (response.status === 200) {
          setTotalRevenue(response.data.totalRevenue);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unable to fetch total revenue",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching total revenue",
        });
      });

    // Fetch entries
    axios.get(`${API_BASE_URL}/showmyentry`, CONFIG_OBJ)
      .then((response) => {
        if (response.status === 200) {
          setEntries(response.data.entries);

        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unable to fetch entries",
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

  // Return JSX to display today's revenue and entries
  return (
    <div>
      {localStorage.getItem("token") != null ? (
        <div>
          <div className="p-3">
            <div className="revenue-box mt-5">
              {/* Display today's revenue */}
              <h1 className="text-center">Today's Revenue is {totalRevenue}</h1>
            </div>
          </div>
          <div className="p-3">
            <div className="container mt-5">
              <h3 className="text-center">Total's Entries</h3>
              {/* Create a table to display entries */}
              <table>
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Sales Id</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Sale Amount</th>
                  </tr>
                  {/* Map through entries and display them in table rows */}
                  {entries.map((entry, index) => (
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
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TodayRevenue; // Export the TodayRevenue component
