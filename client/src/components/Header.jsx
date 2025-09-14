import React, { useContext } from "react";
import { RiMovie2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/userContext";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("currentuser");
    localStorage.removeItem("JwtToken");
    toast.success("Logout Successfull");
    setTimeout(()=> {
      navigate('/login');
    }, 2000)
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 p-3 flex justify-around items-center z-10">
      <div>
        <Link to="/">
          <h2 className="text-white font-bold text-2xl">
            <div className="flex items-center">
              <RiMovie2Line className="mr-2 text-white text-2xl" />
              <span>MovieHub</span>
            </div>
          </h2>
        </Link>
      </div>
      <div className="flex gap-7">
        <Link className="text-white font-bold">Movies</Link>
        <Link className="text-white font-bold">TV Shows</Link>
        {user ? (
          <button className="text-white font-bold cursor-pointer" onClick={handleSignout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-white font-bold">
            Login
          </Link>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
