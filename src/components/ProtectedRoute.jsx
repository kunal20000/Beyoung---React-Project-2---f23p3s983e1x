import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, userUpdateLoginModalStatus } from "./context/AuthContext";

const ProtectedRoute = ({ component }) => {
  const loginStatus = useAuth();
  const setShowLoginModal = userUpdateLoginModalStatus();

  if (!loginStatus) {
    setShowLoginModal(true);
    return <Navigate to={"/"} />;
  }
  return <div>{component}</div>;
};

export default ProtectedRoute;
