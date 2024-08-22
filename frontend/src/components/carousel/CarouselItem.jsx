import React from "react";
import "./carousel.scss";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils/index";
import { useSelector } from "react-redux";

const CarouselItem = ({ id, url, name, price, description }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="carouselItem">
      <Link
        to={
          user?.role === "admin"
            ? `/admin/update-product/${id}`
            : `/product-details/${id}`
        }
      >
        <img src={url} className="product--image" alt="product" />
        <p className="price">{`${price}`}</p>
        <h4>{shortenText(name, 18)}</h4>
        <p className="--mb">{shortenText(description, 26)}</p>
        <button className="--btn --btn-primary --btn-block">Add To Cart</button>
      </Link>
    </div>
  );
};

export default CarouselItem;
