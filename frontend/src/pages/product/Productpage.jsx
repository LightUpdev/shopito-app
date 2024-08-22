import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./productPage.css";
import { useSelector } from "react-redux";
import { shortenText } from "../../utils";

const ProductPage = () => {
  const { id } = useParams();
  const { product } = useSelector((state) => state.product);

  const singleProduct = product.find((product) => product._id === id);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const role = user.role;

  // go back
  const goBack = () => {
    navigate(-1);
  };

  if (!singleProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container product-container">
      <button
        className="btn btn-outline"
        style={{ marginTop: 20 }}
        onClick={() => goBack()}
      >
        Go Back
      </button>
      <div className="product-detail">
        <img
          src={singleProduct.image}
          alt={singleProduct.name}
          className="product-image"
        />
        <div className="product-info">
          <h1 className="product-name">{singleProduct.name}</h1>
          <p className="product-description">{shortenText(singleProduct.description,500) }</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="product-price">{singleProduct.price}</p>
            {role === "customer" && (
              <button className="btn btn-warning">Add to Cart</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
