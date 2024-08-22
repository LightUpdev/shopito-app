import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from "../../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { RESET_AUTH, login } from "../../Redux/Features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const loginUser = async (e) => {
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));

    setPassword("");
  };

  useEffect(() => {
    if (isSuccess || isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
    dispatch(RESET_AUTH());
  }, [isLoggedIn, isSuccess, navigate, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
            </form>
            <span className={styles.register}>
              <p>Don't have an account? </p>
              <Link to="/register"> Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
