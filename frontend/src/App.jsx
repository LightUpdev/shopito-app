import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile/Profile";
import ProductPage from "./pages/product/Productpage";
import DeadEnd from "./components/deadEnd/DeadEnd";
import CreateProduct from "./pages/admin/CreateProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Products from "./pages/admin/Products";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./Redux/Features/auth/authSlice";
import { getProducts } from "./Redux/Features/product/productSlice";

const App = () => {
  axios.defaults.withCredentials = false;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axiosInstance.get("/api/users/verify");
          if (response.status === 200 && response.data.isAuthenticated) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Token verification error:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Router>
        <ToastContainer />
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-details/:id" element={<ProductPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/update-product/:id" element={<UpdateProduct />} />
          <Route path="*" element={<DeadEnd />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
