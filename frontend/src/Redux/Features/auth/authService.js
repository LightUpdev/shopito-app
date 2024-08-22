import { toast } from "react-toastify";
import axiosInstance from "../../../axiosInstance";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// Register User

const register = async (userData) => {
  try {
    const response = await axiosInstance.post(API_URL + "register", userData);
    const { token } = response.data;

    // Store the token in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data));
    return await response.data;
  } catch (error) {
    console.log("Register error :", error);
  }
};

// login user
const login = async (userData) => {
  try {
    await axiosInstance
      .post(API_URL + "login", userData)
      .then((res) => {
        const { token } = res.data;
        if (res.status === 200 || res.user !== null) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(res.data));
          toast("user login successfully");
          return res.data;
        }
      })
      .catch((err) => {
        console.log("Login error :", err);
        toast.error("error :", err.response.data.message);
      });
  } catch (error) {
    console.log("Login error :", error);
  }
};
// logout user
const logout = async () => {
  const response = await axiosInstance.get(API_URL + "logout");
  return await response.data.message;
};

// // get user login status
// const getLoginStatus = async () => {
//   const response = await axios.get(API_URL + "login-status");
//   return await response.data;
// };

// get user data
const getUser = async () => {
  const response = await axiosInstance.get(API_URL + "get-user");
  return await response.data;
};

// update user data
const updateUser = async (userData) => {
  const response = await axiosInstance.patch(API_URL + "update-user", userData);
  return await response.data;
};

// update user data
const updateUserPhoto = async (userData) => {
  const response = await axiosInstance.patch(
    API_URL + "update-photo",
    userData
  );
  return await response.data;
};

const authService = {
  register,
  login,
  logout,
  // getLoginStatus,
  getUser,
  updateUser,
  updateUserPhoto,
};

export default authService;
