import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-950 p-3 flex justify-around items-center z-10">
      <div>
        <h2 className="text-white font-bold text-2xl">
          <div className="flex items-center">
            <RiMovie2Line className="mr-2 text-white text-2xl" />
            <span>MovieHub</span>
          </div>
        </h2>
      </div>
      <div className="flex gap-7">
        <Link className="text-white font-bold">Movies</Link>
        <Link className="text-white font-bold">TV Shows</Link>
        <Link className="text-white font-bold">Login</Link>
      </div>
    </div>
  );
};

export default Header;
