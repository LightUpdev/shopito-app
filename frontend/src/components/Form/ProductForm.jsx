import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import { useSelector } from "react-redux";

const ProductForm = ({
  formType,
  onSubmit,
  image,
  initialData = {},
  setInitialData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    description: "",
    price: "",
    regularPrice: "",
    category: "",
    brand: "",
    image: "",
  });

  const { isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (formType === "update" && initialData) {
      setFormData(initialData);
    }
  }, [formType, formData, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setInitialData((prevState) => ({
      ...prevState,
      [name]: value, // Update the state with new value
    }));
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
            value={formType === "create" ? formData.name : initialData.name}
            onChange={formType === "create" ? handleChange : handleUpdateChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formType === "create" ? formData.color : initialData.color}
            onChange={formType === "create" ? handleChange : handleUpdateChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:( &#x20A6;)</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formType === "create" ? formData.price : initialData.price}
            onChange={formType === "create" ? handleChange : handleUpdateChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="regularPrice">Regular Price:($)</label>
          <input
            type="text"
            id="regularPrice"
            name="regularPrice"
            value={
              formType === "create"
                ? formData.regularPrice
                : initialData.regularPrice
            }
            onChange={formType === "create" ? handleChange : handleUpdateChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={
              formType === "create"
                ? formData.description
                : initialData.description
            }
            onChange={formType === "create" ? handleChange : handleUpdateChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formType === "create" ? formData.brand : initialData.brand}
            onChange={formType === "create" ? handleChange : handleUpdateChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={
              formType === "create" ? formData.category : initialData.category
            }
            onChange={formType === "create" ? handleChange : handleUpdateChange}
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
            : isLoading
            ? "Loading..."
            : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
