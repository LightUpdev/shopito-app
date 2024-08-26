import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import { useSelector } from "react-redux";

const ProductForm = ({ formType, onSubmit, image, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    description: "",
    price: "",
    regularPrice: "",
    category: "",
    brand: "",
    image: null,
  });

  const { isLoading } = useSelector((state) => state.product);
  useEffect(() => {
    if (formType === "update" && initialData) {
      setFormData(initialData);
    }
  }, [formType, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="product-form-container">
      <h1 className="product-form-title">
        {formType === "create" ? "Create Product" : "Update Product"}
      </h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:( &#x20A6;)</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="regularPrice">Regular Price:($)</label>
          <input
            type="text"
            id="regularPrice"
            name="regularPrice"
            value={formData.regularPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          {formType === "update" && (
            <img src={image} alt="product" width={100} height={100} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Images:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="submit-button">
          {formType === "create"
            ? isLoading
              ? "Loading..."
              : "Create Product"
            : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
