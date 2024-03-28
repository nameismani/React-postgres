import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../redux/userSlice";

const Layout = () => {
  const { currentUser } = useSelector(selectCurrentUser);
  const location = useLocation();
  // console.log(location);
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default Layout;
