import { Link, NavLink } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/authProvider";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; // Optional icon (install: lucide-react)

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logout successful"))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = (
    <>
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/available-foods" className="nav-link">Available Foods</NavLink>
      {user && (
        <>
          <NavLink to="/add-food" className="nav-link">Add Food</NavLink>
          <NavLink to="/manage-foods" className="nav-link">Manage My Foods</NavLink>
          <NavLink to="/my-requests" className="nav-link">My Food Request</NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-green-600">
            Share<span className="text-emerald-400">Bite</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            {navLinks}

            {!user ? (
              <>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/register" className="nav-link">Signup</NavLink>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-green-400"
                  title={user.displayName}
                />
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <div className="flex flex-col space-y-2">
            {navLinks}
            {!user ? (
              <>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/register" className="nav-link">Signup</NavLink>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-green-400"
                  title={user.displayName}
                />
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
