import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from './productSlice';
import ProductForm from './ProductsForm';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setShowModal(true); // Show the modal when editing
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleAddNew = () => {
    setSelectedProduct(null); // Clear product for new addition
    setIsEditMode(false);
    setShowModal(true); // Show the modal when adding new product
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <h2 className='text-center'>Product List</h2>
      <Button variant="primary" onClick={handleAddNew} className='ms-5'>Add New Product</Button>

      <Table striped bordered hover className="mt-4 container">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Old Price</th>
            <th>Category</th>
            <th>Is Active</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>${product.price}</td>
                <td>${product.oldPrice}</td>
                <td>{product.category}</td>
                <td>{product.isActive ? "Active" : "Inactive"}</td>
                <td>{product.description}</td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(product)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No products available</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Product form modal */}
      {showModal && (
        <ProductForm
          product={selectedProduct}
          isEditMode={isEditMode}
          show={showModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductList;
