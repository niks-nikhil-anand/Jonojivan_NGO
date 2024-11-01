"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '@/components/loader/loader';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('/api/orderHistory');
        const orders = response.data;

        const ordersWithDetails = await Promise.all(
          orders.map(async (order) => {
            // Fetch cart details for each order
            const cartResponse = await axios.get(`/api/users/cart/cartId${order.cart}`);
            const fetchedCart = cartResponse.data.items || [];

            // Fetch each product's details in the cart
            const productDetails = await Promise.all(
              fetchedCart.map(async (item) => {
                const productResponse = await axios.get(`/api/admin/dashboard/product/${item.productId}`);
                return { ...productResponse.data, quantity: item.quantity || 1 };
              })
            );

            return { ...order, cartItems: productDetails };
          })
        );

        setOrderHistory(ordersWithDetails);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <div>
    <Loader/>
  </div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orderHistory.map((order, index) => (
          <div key={index} className="bg-white p-4 shadow mb-4 rounded">
            <div className="flex items-center space-x-4">
              <img src={order.cartItems[0].featuredImage} alt="Product" className="w-24 h-24 object-cover" />
              <div>
                <h3 className="text-xl font-semibold">Order Date: {new Date(order.orderDate).toLocaleDateString()}</h3>
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Order Status: <span className={`font-semibold ${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</span></p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-medium">Items:</h4>
              <ul className="list-disc list-inside">
                {order.cartItems.map((item, idx) => (
                  <li key={idx}>{item.name} - {item.quantity}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'text-yellow-500';
    case 'Processing': return 'text-blue-500';
    case 'Shipped': return 'text-purple-500';
    case 'Delivered': return 'text-green-500';
    case 'Cancelled': return 'text-red-500';
    default: return 'text-gray-500';
  }
};

export default OrderHistory;
