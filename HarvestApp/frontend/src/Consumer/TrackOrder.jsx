import React, { useEffect, useState } from 'react';

const TrackOrder = () => {
  const [Order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrder(data); 
          console.log(data); 
        } else {
          console.error('Failed to fetch Order:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching Order:', error);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Track Order</h2>
      {Order.length > 0 ? (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Farmer Name</th>
              <th className="px-4 py-2 border">Amount Paid</th>
              <th className="px-4 py-2 border">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {Order.filter(order => order.orderId)
              .map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">
                    {order.orderId}
                  </td>
                  <td className="px-4 py-2 border">{order.name}</td>
                  <td className="px-4 py-2 border text-center">{order.farmerId}</td>
                  <td className="px-4 py-2 border text-right">{order.amount}</td>
                  <td className="px-4 py-2 border text-right">{order.status}</td>

                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No Order available.</p>
      )}
    </div>

  );
};

export default TrackOrder;
