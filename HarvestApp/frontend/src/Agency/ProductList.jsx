import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/productsforapproval');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleApprove = async (productId) => {
    try {
      const response = await fetch('/api/approveProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      if (response.ok) {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.productId === productId
              ? { ...product, status: 'Approved' }
              : product
          )
        );
      } else {
        console.error('Error approving product');
      }
    } catch (error) {
      console.error('Error approving product:', error);
    }
  };

  const handleRejectProduct = async (productId) => {
    const rejectionComments = prompt('Please provide a reason for rejection:');

    if (rejectionComments === null || rejectionComments.trim() === '') {
      alert('Rejection comment is required!');
      return;
    }

    try {
      const response = await fetch(`/api/rejectProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, comments: rejectionComments }),
      });

      if (response.ok) {
        alert('Product rejected successfully');
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.productId === productId
              ? { ...product, status: 'Rejected' }
              : product
          )
        );
      } else {
        alert('Error rejecting product');
      }
    } catch (error) {
      console.error('Error rejecting product:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {products.length > 0 ? (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Product ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Owner</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              product.status === 'Pending Approval' && (
                <tr key={product.productId} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">
                    {product.productId.slice(0, 5)}...{product.productId.slice(5).slice(0, 5)}
                  </td>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border text-center">{product.quantity}</td>
                  <td className="px-4 py-2 border text-right">${product.price}</td>
                  <td className="px-4 py-2 border">{product.owner}</td>
                  {product.status === 'Rejected' ? (
                    <td className="px-4 py-2 border">{product.status}, ({product.comments})</td>
                  ) : (
                    <td className="px-4 py-2 border">{product.status}</td>
                  )}
                  <td className="px-4 py-2 border">
                    {product.status === 'Pending Approval' && (
                      <div className='flex justify-center gap-2'>
                        <div>
                          <button
                            onClick={() => handleApprove(product.productId)}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                          >
                            Approve
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => handleRejectProduct(product.productId)}
                            className="bg-red-500 text-white px-4 py-2 ml-2"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              )
            ))}
          </tbody>

        </table>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
