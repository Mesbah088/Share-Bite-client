import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">ShareBite</h2>
          <p className="text-sm text-gray-300">
            Reducing food waste, one share at a time. Join our mission to feed more and waste less.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/available-foods" className="hover:text-white">Available Foods</Link></li>
            <li><Link to="/add-food" className="hover:text-white">Add Food</Link></li>
            <li><Link to="/my-requests" className="hover:text-white">My Requests</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} ShareBite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
