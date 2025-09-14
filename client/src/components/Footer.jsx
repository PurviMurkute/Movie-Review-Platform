import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import { Github, Twitter, Film } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full text-gray-300 mt-10 bottom-0">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
          <RiMovie2Line className="text-teal-400 text-2xl" />
          <h1 className="text-xl font-bold text-white">MovieReview</h1>
        </div>
        <p className="text-sm text-gray-400 text-center md:text-left">
          Discover, review & keep track of your favorite movies.
        </p>

        <div className="flex gap-6 text-md">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/movies" className="hover:text-white transition">Browse</a>
          <a href="/watchlist" className="hover:text-white transition">Watchlist</a>
          <a href="/profile" className="hover:text-white transition">Profile</a>
        </div>

        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Github className="hover:text-white" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="hover:text-white" />
          </a>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-3 text-sm text-gray-500">
        © 2025 MovieReview. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
