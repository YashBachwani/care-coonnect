import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Restore user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (storedUser && loggedIn === "true") {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ LOGIN (role comes from stored user)
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) return false;

    const { password: _, ...userWithoutPassword } = foundUser;

    setUser(userWithoutPassword);
    setIsLoggedIn(true);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(userWithoutPassword)
    );
    localStorage.setItem("isLoggedIn", "true");

    return true;
  };

  // ✅ SIGNUP (role is SAVED)
  const signup = (
    fullName,
    email,
    phone,
    password,
    role,
    specialty = null
  ) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: crypto.randomUUID(),
      fullName,
      email,
      phone,
      password,
      role,        // ✅ VERY IMPORTANT
      specialty,   // doctor only
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;

    setUser(userWithoutPassword);
    setIsLoggedIn(true);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(userWithoutPassword)
    );
    localStorage.setItem("isLoggedIn", "true");

    return true;
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
