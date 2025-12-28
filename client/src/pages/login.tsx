import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import api from "../api/api";

type UserState = {
  email: string;
  password: string;
};

const Login = () => {
  const { setAuth } = useAuth();
  const [user, setUser] = useState<UserState>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuth((prev: any) => ({ ...prev, loading: true }));
    try {
      const response = await api.post("/login");

      setAuth({
        accessToken: response.data.accessToken,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      alert("Login Failed!");
      setAuth((prev: any) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser((prev: any) => ({ ...prev, email: e.target.value }))
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) =>
            setUser((prev: any) => ({ ...prev, password: e.target.value }))
          }
          style={styles.input}
        />

        <button style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: 300,
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 6,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 8,
    cursor: "pointer",
  },
};
