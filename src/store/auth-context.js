import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, //adding empty func just for IDE purposes, then IDE offers onLogout in Navigation.js, real working onLogout is added in App.js
  onLogin: (email, password) => {}, //dummy function, we are not doing anything with the data in braces, but technically we would need it in a real app
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "True") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "True");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
