import { useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider/authProvider";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const { logInUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Login with Firebase/AuthContext or your auth system
      await logInUser(form.email, form.password);

      // 2. Get JWT token from backend
      const response = await axios.post("https://share-bite-server-phi.vercel.app/jwt", {
        email: form.email,
      });

      localStorage.setItem("token", response.data.token);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Logged in successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="...">
      {/* Your form inputs */}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
