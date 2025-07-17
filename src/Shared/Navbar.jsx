import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/authProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logout successful"))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/available-foods">Available Foods</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-food">Add Food</NavLink></li>
          <li><NavLink to="/manage-foods">Manage My Foods</NavLink></li>
          <li><NavLink to="/my-requests">My Food Request</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">ShareBite</Link>

        {/* Nav Links */}
        <ul className="flex gap-4 items-center font-medium">
          {navLinks}

          {!user ? (
            <>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/register">Signup</NavLink></li>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                alt="profile"
                className="w-10 h-10 rounded-full border"
                title={user.displayName}
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
