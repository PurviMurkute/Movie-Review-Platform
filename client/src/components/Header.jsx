import React, { useContext, useState } from "react";
import { RiMovie2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/userContext";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrpdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleImageClick = () => {
    if (window.innerWidth >= 768) {
      navigate(`/profile/${user?._id}`);
    } else {
      toggleDrpdown();
    }
  };

  const handleSignout = () => {
    localStorage.removeItem("currentuser");
    localStorage.removeItem("JwtToken");
    toast.success("Logout Successfull");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-md z-20">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-2 md:px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <RiMovie2Line className="text-teal-400 text-3xl" />
          <span className="text-white font-bold text-2xl tracking-wide">
            MovieHub
          </span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link
            to="/movies"
            className="text-gray-200 hover:text-white transition font-medium"
          >
            Movies
          </Link>
          <Link
            to="/tv-shows"
            className="text-gray-200 hover:text-white transition font-medium"
          >
            TV Shows
          </Link>
        </nav>
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <button
                onClick={handleSignout}
                className="hidden md:flex text-gray-200 hover:text-red-400 transition font-medium cursor-pointer"
              >
                Logout
              </button>
              {isDropdownOpen && (
                <div className="absolute right-2 top-12 mt-2 w-40 bg-white shadow-lg rounded-md z-50 p-2 md:hidden">
                  <Link
                    to={`/profile/${user?._id}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-600 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
              <img
                src={user.profile}
                alt="profile"
                className="w-10 h-10 object-cover rounded-full border-2 border-teal-400 hover:scale-105 transition"
                onClick={handleImageClick}
              />
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <Toaster />
    </header>
  );
};

export default Header;
