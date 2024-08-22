import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/register.png";
import Card from "../../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, register } from "../../Redux/Features/auth/authSlice";
import { validateEmail } from "../../utils";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("password must be at least 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("please enter a valid email");
    }
    if (password !== cPassword) {
      return toast.error("password do not match");
    }
    const userData = {
      name,
      email,
      password,
    };
    await dispatch(register(userData));
    setFormData({
      name: "",
      email: "",
      password: "",
      cPassword: "",
    });
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/");
    }
    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="cPassword"
                value={cPassword}
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an account? </p>
              <Link to="/login"> Login</Link>
            </span>
          </div>
        </Card>

        <div className={styles.img}>
          <img src={loginImg} alt="login" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
