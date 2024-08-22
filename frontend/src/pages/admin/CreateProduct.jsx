import React from "react";
import ProductForm from "../../components/Form/ProductForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createdProduct } from "../../Redux/Features/product/productSlice";
// import { getUser } from "../../Redux/Features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dpmuaunbx/image/upload`;

  const handleCreateProduct = async (formData) => {
    const {
      name,
      description,
      color,
      price,
      regularPrice,
      brand,
      category,
      image,
    } = formData;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "shopitoApp");

    try {
      const res = await axios.post(cloudinaryUrl, data);
      const { secure_url } = await res.data;

      // save data to database
      const productData = await dispatch(
        createdProduct({
          name,
          description,
          color,
          price,
          regularPrice,
          brand,
          category,
          image: secure_url,
        })
      );
      console.log(productData);
      navigate("/admin/products");
      return await secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  return <ProductForm formType="create" onSubmit={handleCreateProduct} />;
};

export default CreateProduct;
