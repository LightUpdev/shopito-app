import axiosInstance from "../../../axiosInstance";

export const API_URL = `/api/product`;

// create product

const createdProduct = async (productData) => {
  try {
    const response = await axiosInstance.post(API_URL, productData);
    const data = await response.data;
    return await data;
  } catch (error) {
    console.log(error);
  }
};
// update product

const updateProduct = async (productData, id) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/${id}`, productData);
    const data = await response.data;
    console.log(data);
    return await data;
  } catch (error) {
    console.log(error);
  }
};

// get all products

const getProducts = async () => {
  const response = await axiosInstance.get(API_URL);
  return await response.data;
};

// get single product

const getProduct = async () => {
  const response = await axiosInstance.get(API_URL + "/:id");
  return await response.data;
};

// get single product

const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return await response.data;
};

const productService = {
  createdProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
