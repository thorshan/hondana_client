import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const UserRoute = () => {
  const { user } = useContext(AuthContext);
  return user && user.role === "user" ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
