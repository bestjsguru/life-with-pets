import { useState } from "react";
import axios from "axios";

const API_BASE = "https://frontend-take-home-service.fetch.com";

export default function useAuth() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE}/auth/login`, user, {
        withCredentials: true,
      });
      setLoggedIn(true);
      setError("");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_BASE}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setLoggedIn(false);
      setUser({ name: "", email: "" });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { user, setUser, loggedIn, handleLogin, handleLogout, loading, error };
}
