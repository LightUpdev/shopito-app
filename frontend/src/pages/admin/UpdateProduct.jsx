import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/Form/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProduct } from "../../Redux/Features/product/productSlice";

const UpdateProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const products = useSelector((state) => state.product);
  const productData = products?.product;
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dpmuaunbx/image/upload`;

  const product = productData.find((product) => product._id === id);

  const initialState = {
    name: product.name,
    image: product.image,
    price: product.price,
    color: product.color,
    regularPrice: product.regularPrice,
    description: product.description,
    category: product.category,
    brand: product.brand,
  };

  const [initialData, setInitialData] = useState(initialState);

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const response = await axios.get(`/api/products/${id}`);
        // setInitialData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (formData) => {
    if (formData?.image !== null) {
      const data = new FormData();
      data.append("file", formData?.image);
      data.append("upload_preset", "shopitoApp");

      try {
        const res = await axios.post(cloudinaryUrl, data);
        const { secure_url } = await res.data;

        setInitialData({
          name: product.name || formData.name,
          image: product.image || secure_url,
          price: product.price || formData.price,
          color: product.color || formData.color,
          regularPrice: product.regularPrice || formData.regularPrice,
          description: product.description || formData.description,
          category: product.category || formData.category,
          brand: product.brand || formData.brand,
        });
        return await secure_url;
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateProduct({ initialData, id }));

    navigate("/products");
    // save data to database
  };

  return (
    <ProductForm
      formType="update"
      image={product.image}
      onSubmit={handleUpdateProduct}
      initialData={initialData}
    />
  );
};

export default UpdateProduct;
