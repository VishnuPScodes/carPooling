import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/authSlice";
import styles from "../styles/authentication.module.css";
import axios from "axios";

const axiosBridged = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

axiosBridged.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
);

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(registerFailure("Passwords do not match!"));
      return;
    }
    dispatch(registerStart());
    try {
      const response = await axiosBridged.post("/auth/register", {
        username,
        email,
        password,
      });
      dispatch(registerSuccess(response.data));
      navigate("/");
    } catch (err) {
      dispatch(registerFailure(err.response?.data?.message || err.message));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.head}>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <p className={styles.switchAuth}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default RegistrationPage;
