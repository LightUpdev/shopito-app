import "./Products.css";
import { shortenText } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../Redux/Features/product/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.product);
  console.log(product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  return (
    <div className="products-container">
      <h1 className="products-title">Products</h1>
      <div className="products-list">
        {product.length < 1 || isLoading === true ? (
          <h3>Loading...</h3>
        ) : (
          product?.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                style={{ width: "100%", height: "200px", cursor: "pointer" }}
                onClick={() => navigate(`/product-details/${product._id}`)}
              />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">
                {shortenText(product.description, 18)}
              </p>
              <div className="actions-btn">
                <button
                  className="btn-warning"
                  onClick={() =>
                    navigate(`/admin/update-product/${product._id}`)
                  }
                >
                  Update
                </button>
                <p className="product-price">${product.price}</p>

                <button className="btn-danger">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
