import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

//using react context instead of redux bcoz not changing too often
//just login,out

export const AuthContextProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  //updating user in localStorage
  //localStorage uses string
  //JSON.stringify makes string,
  //JSON.parse makes object
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  //children = <App />
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
