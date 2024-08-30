import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { RESET_AUTH, logout } from "../../Redux/Features/auth/authSlice";
import ShowIsLogin, { ShowIsLogout } from "../hiddenLinks/HiddenLink";
import { shortenText } from "../../utils";

export const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Shop<span>ito.</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.isActive}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  // eslint-disable-next-line
  const [scrollPage, setScrollPage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const UserName = () => {
    const username = user ? shortenText(user?.name, 9) : "...";
    return <span style={{ color: "#ff7722" }}>Hi, {username}</span>;
  };

  // logout user
  const logoutUser = async () => {
    const res = await dispatch(logout());
    if (res) {
      dispatch(RESET_AUTH());
      navigate("/login");
      localStorage.clear("token");
    }
  };

  // const fixNavbar = () => {
  //   if (window.screenY < 100) {
  //     setScrollPage(false);
  //   } else {
  //     setScrollPage(true);
  //   }
  // };

  // window.addEventListener("scroll", fixNavbar);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]}  ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/shop" className={activeLink}>
                Shop
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <ShowIsLogout>
                <NavLink to={"login"} className={activeLink}>
                  Login
                </NavLink>
              </ShowIsLogout>
              <ShowIsLogout>
                <NavLink to={"register"} className={activeLink}>
                  Register
                </NavLink>
              </ShowIsLogout>
              <ShowIsLogin>
                <NavLink to={"profile"}>
                  <FaUserCircle size={16} color="#ff7722" />
                  <UserName />
                </NavLink>
              </ShowIsLogin>

              {role === "admin" && (
                <ShowIsLogin>
                  <NavLink to={"admin/create-product"}>Add Product</NavLink>
                </ShowIsLogin>
              )}

              {role === "admin" && (
                <ShowIsLogin>
                  <NavLink to={"admin/products"}>All Product</NavLink>
                </ShowIsLogin>
              )}

              <ShowIsLogin>
                <Link to={"/"} onClick={logoutUser}>
                  Logout
                </Link>
              </ShowIsLogin>
            </span>
            {role === "customer" && cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {role === "customer" && cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
