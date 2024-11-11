import React, { useEffect, useState } from 'react';

const UpcomingOrders = () => {
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

  const handleDeliverOrder = async (orderId) => {
    try {
      const response = await fetch('/api/orderdelivered', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        setOrder((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: 'Delivered' } : order
          )
        );
        console.log(`Order ${orderId} has been marked as Delivered`);
      } else {
        console.error('Failed to deliver order:', response.statusText);
      }
    } catch (error) {
      console.error('Error in delivering order:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Orders for Delivery</h2>
      {Order.length > 0 ? (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Farmer Name</th>
              <th className="px-4 py-2 border">Amount Paid</th>
              <th className="px-4 py-2 border">Order Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Order.filter(order => order.status === 'Out for Delivery')
              .map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">
                    {order.orderId}
                  </td>
                  <td className="px-4 py-2 border">{order.name}</td>
                  <td className="px-4 py-2 border text-center">{order.farmerId}</td>
                  <td className="px-4 py-2 border text-right">{order.amount}</td>
                  <td className="px-4 py-2 border text-right">{order.status}</td>
                  <td className="px-4 py-2 border text-center">
                    {order.status === 'Out for Delivery' ? (
                      <button
                        onClick={() => handleDeliverOrder(order.orderId)}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                      >
                        Deliver
                      </button>
                    ) : (
                      <span>Delivered</span>
                    )}
                  </td>
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

export default UpcomingOrders;
