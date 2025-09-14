import React from "react";
import { Link } from "react-router";

const MovieCard = ({ _id, title, poster, releaseDate, rating }) => {
  return (
    <Link to={`/movies/${_id}`}>
    <div className="relative w-[180px] bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200">
      <img src={poster} alt={title} className="w-full h-[250px] object-cover" />
      <div className="absolute top-2 left-2 bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-green-400 text-sm font-bold">
        {Math.round(rating * 10)}<span className="text-xs">%</span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold line-clamp-1">{title}</h3>
        <p className="text-xs text-gray-500">{releaseDate}</p>
      </div>
    </div>
    </Link>
  );
};

export default MovieCard;
