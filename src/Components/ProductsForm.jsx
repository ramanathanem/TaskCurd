import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, editProduct } from './productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const categoryOptions = ["Vegetables", "Fruits & Nuts", "Dairy & Creams", "Packages Food", "Staples"];

const ProductForm = ({ product, isEditMode, show, onClose }) => {
  const [productName, setProductName] = useState(product?.productName || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [oldPrice, setOldPrice] = useState(product?.oldPrice || 0);
  const [category, setCategory] = useState(product?.category || categoryOptions[0]);
  const [isActive, setIsActive] = useState(product?.isActive || false);
  const [description, setDescription] = useState(product?.description || "");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      id: product?.id || Date.now(),
      productName,
      price,
      oldPrice,
      category,
      isActive,
      description,
    };

    if (isEditMode) {
      dispatch(editProduct({ id: product.id, updatedProduct: productData }));
    } else {
      dispatch(addProduct(productData));
    }

    onClose(); // Close the form after saving
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "Edit Product" : "Add Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="oldPrice">Old Price:</label>
            <input
              type="number"
              className="form-control"
              id="oldPrice"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="category">Category:</label>
            <select
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryOptions.map((categoryOption, index) => (
                <option key={index} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isActive">
              Is Active
            </label>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <Button type="submit" variant="primary">
            {isEditMode ? "Edit" : "Add"} Product
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
