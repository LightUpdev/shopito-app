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
    name: product.name || "",
    image: product.image || "",
    price: product.price || "",
    color: product.color || "",
    regularPrice: product.regularPrice || "",
    description: product.description || "",
    category: product.category || "",
    brand: product.brand || "",
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

  const handleUpdateProduct = async (formData = { initialData }) => {
    const response =await dispatch(updateProduct({ formData, id }));
    if (response) {
      navigate("/admin/products");
    }
    console.log(response);
    console.log(formData);
    console.log(initialData);
  };

  return (
    <ProductForm
      formType="update"
      image={product.image}
      onSubmit={handleUpdateProduct}
      initialData={initialData}
      setInitialData={setInitialData}
    />
  );
};

export default UpdateProduct;
