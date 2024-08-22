import { useSelector } from "react-redux";

const ShowIsLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const ShowIsLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowIsLogin;
