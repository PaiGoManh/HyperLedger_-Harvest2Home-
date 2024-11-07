import React, { useEffect, useState } from 'react';
import image from '../assets/cartcard.jpeg';

const ConsumerHome = () => {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        const response = await fetch('/api/approvedProducts');
        const data = await response.json();
        setApprovedProducts(data);
      } catch (error) {
        console.error("Error fetching approved products:", error);
      }
    };

    fetchApprovedProducts();
  }, []);

  const openOrderModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1); 
    setIsModalOpen(true);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('/api/placeOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.productId, 
          quantity: quantity                   
      })      });
      const data = await response.json();
  
      if (response.ok) {
        alert(`Order placed successfully! Order ID: ${data.orderId}`);
        setIsModalOpen(false); 
      } else {
        alert(`Error placing order: ${data.error}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Products Available</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {approvedProducts.length > 0 ? (
          approvedProducts.map((product) => (
            product.status === 'Approved' && (
              <div
                key={product.productId}
                className="max-w-xs border border-gray-200 shadow-lg p-4 bg-white"
              >
                <img
                  src={product.imageUrl || image}
                  alt={product.name}
                  className="w-full h-36 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-gray-500 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => openOrderModal(product)}
                    className="px-4 py-2 bg-[#111D2D] text-white rounded hover:bg-black"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            )
          ))
        ) : (
          <p className="text-center text-gray-500">No approved products available.</p>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">{selectedProduct.name}</h3>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 bg-gray-300 text-lg font-bold rounded"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 bg-gray-300 text-lg font-bold rounded"
              >
                +
              </button>
            </div>
            <p className="text-gray-700 mb-4">
              Price: ${selectedProduct.price} <br />
              Available Quantity: {selectedProduct.quantity} <br />
              Total: ${selectedProduct.price * quantity}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerHome;
