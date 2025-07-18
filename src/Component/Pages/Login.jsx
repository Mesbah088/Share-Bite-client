import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/authProvider";
import { Link, useNavigate } from "react-router";

import Lottie from "lottie-react";

import LoginLottie from '../../assets/Lotties/Login.json';
import Swal from "sweetalert2";

const Login = () => {
  const { logInUser, googleLogin } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
  await logInUser(form.email, form.password);
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Logged in successfully.",
    timer: 2000,
    showConfirmButton: false,
  });
  navigate("/");
} catch {
  Swal.fire({
    icon: "error",
    title: "Login Failed",
    text: "Invalid email or password.",
  });
}

  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary w-full mb-2">
          Login
        </button>
        <button
          type="button"
          onClick={googleLogin}
          className="btn btn-outline w-full"
        >
          Sign in with Google
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
       <Lottie style={{ width : "400px"}} animationData={LoginLottie} loop={true}></Lottie> 
    </div>
  );
};

export default Login;