import React, { useEffect, useState } from 'react';

const OrderList = () => {
  const [Order, setOrder] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  const handleAssignDeliveryAgent = async () => {
    try {
      const response = await fetch('/api/assignDelivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: selectedOrderId }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Delivery agent ${data.deliveryAgentId} assigned successfully and order status updated.`);
        
        const updatedOrders = Order.map(order =>
          order.orderId === selectedOrderId ? { ...order, status: 'Out for Delivery' } : order
        );
        setOrder(updatedOrders);
        setSelectedOrderId(null);
      } else {
        const data = await response.json();
        console.error('Error:', data.message);
        alert('Failed to assign delivery agent.');
      }
    } catch (error) {
      console.error('Error assigning delivery agent:', error);
      alert('An error occurred while assigning the delivery agent.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Orders For Delivery</h2>

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
            {Order.filter(order => order.orderId)
              .map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{order.orderId}</td>
                  <td className="px-4 py-2 border">{order.name}</td>
                  <td className="px-4 py-2 border text-center">{order.farmerId}</td>
                  <td className="px-4 py-2 border text-right">{order.amount}</td>
                  <td className="px-4 py-2 border text-right">{order.status}</td>
                  <td className="px-4 py-2 border text-center">
                  {order.status !== 'Out for Delivery' && order.status !== 'Delivered' ? (
                    selectedOrderId === order.orderId ? (
                      <div>
                        <button
                          onClick={handleAssignDeliveryAgent}
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Confirm Assignment
                        </button>
                        <button
                          onClick={() => setSelectedOrderId(null)}
                          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedOrderId(order.orderId)}
                        className="bg-blue-500 w-[200px] text-white px-4 py-2 rounded"
                      >
                        Assign Delivery Agent
                      </button>
                    )
                  ) : (
                    '---'
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

export default OrderList;
