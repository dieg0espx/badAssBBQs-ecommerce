import React, { useEffect, useState } from "react";
import Logo from "../images/logo-negative.png";
import { createClient } from "@supabase/supabase-js";
import { formatDate, formatCurrency } from "../Utils/Helpers";

// Initialize Supabase client
const supabase = createClient(
    'https://uctubrwiseslmvruhqof.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdHVicndpc2VzbG12cnVocW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NTk2ODIsImV4cCI6MjA0NzAzNTY4Mn0.7MNAuiYNKF8d14LDN91dzr8HSBdsSK4eTHCEHsY8BZA'
);

function Admin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [access, setAccees] = useState(false)
  const [orders, setOrders] = useState([])
  const [totals, setTotals] = useState({
    totalOrders: 0,
    approved: 0,
    packed: 0,
    shipped: 0,
  });
  const [currentOrder, setCurrentOrder] = useState([])
  const [sidebar, setSidebar] = useState(false)
        
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
        setError('Please fill in all fields.');
        return;
    }

    const isValidUser = await checkUser(email, password);

    if (isValidUser) {
        setAccees(true)
        await getAllOrders()
    } else {
        setError('User not found.');
    }
  };

  const checkUser = async (email, password) => {
    try {
        const { data, error } = await supabase
            .from('admin')
            .select('*')
            .eq('user', email)
            .eq('password', password)
            .single();

        if (error && error.code === 'PGRST116') {
            return false; // User not found
        }

        if (error) {
            throw error; // Other errors
        }

        return true; // Login successful
    } catch (err) {
        console.error('Error checking user:', err.message);
        return false; // Return false on error
    }
  };

  const getAllOrders = async()=>{
    let { data: orders, error } = await supabase
    .from('orders')
    .select('*')

    setOrders(orders)
  }

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
  
    setTotals(totals)
  };

  const onOrderSelect = (id) => {
    const selected = orders.find((order) => order.id === id); // Find the selected order
    if (selected) {
      setCurrentOrder(selected); // Update the selected order state
      setSidebar(true); // Open the sidebar (or any UI element to show the details)
    }
  };
  
  const handleStatusChange = async (newStatus, orderId) => {
    try {
      const { data, error } = await supabase
        .from('orders') // Replace 'orders' with your actual table name
        .update({ status: newStatus })
        .eq('id', orderId);
  
      if (error) {
        console.error('Error updating status:', error.message);
        alert('Failed to update status.');
        return;
      }
  
      // Update the local state after successful update
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
  
      alert('Status updated successfully.');
    } catch (err) {
      console.error('Unexpected error:', err.message);
      alert('An unexpected error occurred.');
    }
  };


  useEffect(()=>{
    if(orders) {
        calculateTotals();
        console.log(orders);    
    }
  },[orders])

  return (
    <div className="flex justify-center w-full max-w-[95%] m-auto" style={{ height: "calc(100vh - 230px)" }}>
      <div className="max-w-md mx-auto p-4 bg-white rounded border border-gray-200 py-[30px] mt-[10%] w-[90%] lg:w-[50%]" style={{display: access ? 'none':'block', height: "fit-content"}}>
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
      <div style={{display: access ? 'grid':'none'}} className="w-full">

        <div className={`grid ${sidebar ? "grid-cols-[3fr_1fr]" : "grid-cols-1"} gap-[10px] h-full `}>
            <div>
                {/* TOTALS */}
                <div className="grid grid-cols-4 gap-4 w-full mt-8 mb-[10px]">
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
                <div class="border border-gray-200 rounded-lg w-full p-4 bg-white overflow-y-scroll" style={{ height: "calc(100vh - 385px)"  }}>
                    <div class="overflow-x-auto">
                    <table className="w-full table-auto text-left">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">ID</th>
                            <th class="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">Name</th>
                            <th class="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">Email</th>
                            <th class="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">Status</th>
                            <th class="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => 
                            order.user.name && ( // Check if name is not empty
                              <tr key={order.id} className="border-t hover:bg-gray-200" onClick={() => onOrderSelect(order.id)}>
                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.order_id}</td>
                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-bold">{order.user.name}</td>
                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user.email.toLowerCase()}</td>
                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <p className={`inline-block px-3 py-1 text-sm font-semibold rounded-full w-full ${getStatusClass(order.status)}`}>
                                    {order.status}
                                  </p>
                                </td>
                                <td className="text-center px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.created_at)}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                </div>
            </div>
            <div className="border border-gray-200 rounded-lg mt-8 p-[20px]" style={{display: sidebar ? 'block':'none'}}>
                {sidebar && currentOrder && (
                <>
                    {/* Order Information */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-[5px]">
                        <b>Order ID: </b>
                        <span className="text-blue-600">{currentOrder.order_id}</span>
                    </h3>
                    <p className="text-sm text-gray-600">
                        <b>Created:</b> {formatDate(currentOrder.created_at)}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                        <b>Payment Method:</b> {currentOrder.payment_method}
                    </p>
                    <hr className="border-t border-gray-200 my-4" />
                    {/* User Information */}
                    <div className="mb-6">
                      <h4 className="text-md font-semibold text-gray-700 mb-3">Customer Information</h4>
                      <p className="text-sm text-gray-800">
                        <b>Name:</b> {currentOrder.user.name}
                      </p>
                      <p className="text-sm text-gray-800">
                        <b>Phone:</b> {currentOrder.user.phone}
                      </p>
                      <p className="text-sm text-gray-800">
                        <b>Email:</b> {currentOrder.user.email}
                      </p>
                      <p className="text-sm text-gray-800">
                        <b>Address:</b> {currentOrder.user.address}
                      </p>
                      <p className="text-sm text-gray-800">
                        <b>City:</b> {currentOrder.user.city}
                      </p>
                      <p className="text-sm text-gray-800">
                        <b>State:</b> {currentOrder.user.state}
                      </p>
                      <p className="text-sm text-gray-800">
                        <b>Country:</b> {currentOrder.user.country}
                      </p>
                      <p className="text-sm text-gray-800">
                        <b>Postal Code:</b> {currentOrder.user.postalCode}
                      </p>
                    </div>
                    <div className="mb-6">
                        <h4 className="text-md font-semibold text-gray-700 mb-3">Order Status</h4>
                        <select
                            id="status"
                            value={currentOrder.status}
                            onChange={(e) => handleStatusChange(e.target.value, currentOrder.id)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm shadow-sm"
                        >
                            <option value="Approved">Approved</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <hr className="border-t border-gray-200 my-4" />
                    {/* Product Items */}
                    <h4 className="text-md font-semibold text-gray-700 mb-3">Products</h4>
                    <div className="overflow-y-auto max-h-[190px]">
                        {currentOrder.products.map((item, index) => (
                          <div key={index} className="border border-gray-200 flex items-center gap-4 px-4 py-2 rounded-lg mb-4">
                            <img src={item.imageUrl} className="w-16 h-16 object-cover rounded" alt="Product"/>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{item.title}</p>
                              <p className="text-sm text-gray-600 font-semibold">
                                {item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
