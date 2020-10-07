import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState({});
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null
  );
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [authError]);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setUserInfo(data);
      setAuthLoading(false);
    } catch (err) {
      setAuthError(
        err.response && err.response.message
          ? err.response.data.message
          : err.message
      );
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUserInfo(null);
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setUserInfo(data);
      setAuthLoading(false);
    } catch (err) {
      setAuthError(
        err.response && err.response.message
          ? err.response.data.message
          : err.message
      );
      setAuthLoading(false);
    }
  };

  const getUserDetail = async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setUserDetail(data);
      setAuthLoading(false);
    } catch (err) {
      setAuthError(
        err.response && err.response.message
          ? err.response.data.message
          : err.message
      );
      setAuthLoading(false);
    }
  };

  const UpdateUserDetail = async (user) => {
    try {
      const { data } = await axios.put("/api/users/profile", user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setUserDetail(data);
      setAuthLoading(false);
      setSuccess(true);
    } catch (err) {
      setAuthError(
        err.response && err.response.message
          ? err.response.data.message
          : err.message
      );
      setAuthLoading(false);
      setSuccess(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        authError,
        authLoading,
        userInfo,
        logout,
        register,
        getUserDetail,
        userDetail,
        UpdateUserDetail,
        success,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
