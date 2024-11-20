import React, { useEffect, useState } from "react";
import Logo from "../images/logo-negative.png";
import { createClient } from "@supabase/supabase-js";
import { formatDate } from "../Utils/Helpers";

// Initialize Supabase client
const supabase = createClient(
  "https://uctubrwiseslmvruhqof.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdHVicndpc2VzbG12cnVocW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NTk2ODIsImV4cCI6MjA0NzAzNTY4Mn0.7MNAuiYNKF8d14LDN91dzr8HSBdsSK4eTHCEHsY8BZA"
);

function Admin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [access, setAccess] = useState(false);
  const [orders, setOrders] = useState([]);
  const [totals, setTotals] = useState({
    totalOrders: 0,
    approved: 0,
    packed: 0,
    shipped: 0,
  });
  const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order
  const [sidebarVisible, setSidebarVisible] = useState(false); // Toggle sidebar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const isValidUser = await checkUser(email, password);

    if (isValidUser) {
      setAccess(true);
      await getAllOrders();
    } else {
      setError("User not found.");
    }
  };

  const checkUser = async (email, password) => {
    try {
      const { data, error } = await supabase
        .from("admin")
        .select("*")
        .eq("user", email)
        .eq("password", password)
        .single();

      if (error && error.code === "PGRST116") {
        return false; // User not found
      }

      if (error) {
        throw error; // Other errors
      }

      return true; // Login successful
    } catch (err) {
      console.error("Error checking user:", err.message);
      return false; // Return false on error
    }
  };

  const getAllOrders = async () => {
    let { data: orders, error } = await supabase.from("orders").select("*");

    setOrders(orders);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "text-blue-700 bg-blue-100";
      case "Packed":
        return "text-yellow-700 bg-yellow-100";
      case "Shipped":
        return "text-green-700 bg-green-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const calculateTotals = () => {
    const totals = orders.reduce(
      (acc, order) => {
        acc.totalOrders += 1;
        if (order.status === "Approved") acc.approved += 1;
        if (order.status === "Packed") acc.packed += 1;
        if (order.status === "Shipped") acc.shipped += 1;
        return acc;
      },
      { totalOrders: 0, approved: 0, packed: 0, shipped: 0 }
    );

    setTotals(totals);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setSidebarVisible(true);
  };

  useEffect(() => {
    if (orders) {
      calculateTotals();
    }
  }, [orders]);

  return (
    <div className="min-h-[90vh] flex justify-between w-full">
        <div className="max-w-md mx-auto p-4 bg-white rounded border border-gray-200 py-[30px] mt-[10%] w-[50%]" style={{display: access ? 'none':'block', height: "fit-content"}}>
            <img src={Logo} className="m-auto invert mb-[20px]" alt="Logo" />
            {error && <p className="text-red text-sm mb-4 text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="text-center w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="text-center w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-red  border border-red text-white font-medium rounded hover:bg-white hover:text-red transition duration-300"
              >
                Login
              </button>
            </form>
        </div> 
      <div className="flex-1">
        {access && (
          <>
            {/* TOTALS */}
            <div className="grid grid-cols-4 gap-4 w-full mt-8 mb-8">
              <div className="p-6 bg-white border border-gray-200 rounded-lg  flex justify-between items-center">
                <div className="flex items-center">
                  <i className="bi bi-card-list text-3xl text-gray-700 mr-4"></i>
                  <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                </div>
                <p className="text-[40px] text-gray-500">{totals.totalOrders}</p>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg  flex justify-between items-center">
                <div className="flex items-center">
                  <i className="bi bi-check-circle text-3xl text-gray-700 mr-4"></i>
                  <h3 className="text-lg font-semibold text-gray-700">Approved</h3>
                </div>
                <p className="text-[40px] text-gray-500">{totals.approved}</p>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg  flex justify-between items-center">
                <div className="flex items-center">
                  <i className="bi bi-box-seam text-3xl text-gray-700 mr-4"></i>
                  <h3 className="text-lg font-semibold text-gray-700">Packed</h3>
                </div>
                <p className="text-[40px] text-gray-500">{totals.packed}</p>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg  flex justify-between items-center">
                <div className="flex items-center">
                  <i className="bi bi-truck text-3xl text-gray-700 mr-4"></i>
                  <h3 className="text-lg font-semibold text-gray-700">Shipped</h3>
                </div>
                <p className="text-[40px] text-gray-500">{totals.shipped}</p>
              </div>
          </div> 
            {/* Orders Table */}
            <div className="border border-gray-200 rounded-lg w-full p-4 bg-white">
              <div className="overflow-x-auto">
                <table className="w-[80vw] table-auto text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">
                        Name
                      </th>
                      <th className="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-t cursor-pointer hover:bg-gray-100"
                        onClick={() => handleOrderClick(order)}
                      >
                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {order.order_id}
                        </td>
                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-bold">
                          {order.user.name}
                        </td>
                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.user.email.toLowerCase()}
                        </td>
                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <p
                            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full w-full ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </p>
                        </td>
                        <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sidebar */}
      {sidebarVisible && (
        <div className="w-[25%] h-full bg-gray-100 border-l border-gray-300 fixed right-0 top-0 z-50 p-6">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          {selectedOrder && (
            <div>
              <p>
                <strong>Order ID:</strong> {selectedOrder.order_id}
              </p>
              <p>
                <strong>Name:</strong> {selectedOrder.user.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.user.email}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedOrder.created_at)}
              </p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setSidebarVisible(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
