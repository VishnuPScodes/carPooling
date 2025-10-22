import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authSlice";
import styles from "../styles/authentication.module.css";
import axios from "axios";

// Axios instance for API calls
const axiosBridged = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

axiosBridged.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to logout on 401 Unauthorized
      window.location.href = "/logout";
    }
    // You might want to display a toast here as well based on your memory.
    // For now, re-throwing the error.
    return Promise.reject(error);
  }
);

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axiosBridged.post("/auth/login", {
        email,
        password,
      });
      dispatch(loginSuccess(response.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || err.message));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.head}>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <p className={styles.switchAuth}>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}

export default LoginPage;
