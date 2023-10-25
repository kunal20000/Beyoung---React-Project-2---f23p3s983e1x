import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [loginStatus, setLoginStatus] = useState(() => {
    const storedLoginStatus = sessionStorage.getItem('loginStatus');
    console.log(storedLoginStatus);
    return storedLoginStatus === 'true';
  });

  const updateLoginStatus = (newStatus) => {
    setLoginStatus(newStatus);
    sessionStorage.setItem("loginStatus", newStatus);
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const updateModalLoginStatus = (newStatus) => {
    setShowLoginModal(newStatus);
  };

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        updateLoginStatus,
        showLoginModal,
        updateModalLoginStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useShowLoginModal() {
  const context = useContext(AuthContext);
  return context.showLoginModal;
}
export function userUpdateLoginModalStatus() {
  const context = useContext(AuthContext);
  return context.updateModalLoginStatus;
}
export function useAuth() {
  const context = useContext(AuthContext);
  console.log("context", context);
  return context.loginStatus;
}
export function useUpdateLoginStatus() {
  const context = useContext(AuthContext);
  return context.updateLoginStatus;
}
