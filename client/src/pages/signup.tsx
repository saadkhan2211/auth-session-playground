import { useState } from "react";
import api from "../api/api";

type SignupState = {
  email: string;
  password: string;
};

const Signup = () => {
  const [user, setUser] = useState<SignupState>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/signup");
      alert("Signup Successful!");
    } catch (error) {
      alert("Signup Failed!");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Signup</h2>

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

        <button style={styles.button}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;

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
