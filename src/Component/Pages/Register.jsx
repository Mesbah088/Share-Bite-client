
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/authProvider";
import { Link, useNavigate } from "react-router";

import Lottie from "lottie-react";
import registerLottie from '../../assets/Lotties/Resister.json';
import Swal from "sweetalert2";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMITTING FORM:", form);


   

    try {
      await registerUser(form.name, form.email, form.photoURL, form.password);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Registration successful!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong. Please try again.",
      });
      console.error("Registration error:", err);
    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full mb-3"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Photo URL"
          className="input input-bordered w-full mb-3"
          value={form.photoURL}
          onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
        <p className="mt-4 text-center text-blue-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
      <Lottie style={{ width: "500px" }} animationData={registerLottie} loop={true}></Lottie>
    </div>
  );
};

export default Register;