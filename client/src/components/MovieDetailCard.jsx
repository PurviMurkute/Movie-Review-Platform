import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiMovieLine } from "react-icons/ri";
import { useParams } from "react-router";
import { Link } from "react-scroll";
import Model from "./Model";
import { Star } from "lucide-react";
import { UserContext } from "../context/userContext";
import { BiMoviePlay } from "react-icons/bi";

const MovieDetailCard = ({
  title,
  releaseDate,
  poster,
  backdrop,
  genre,
  overview,
  director,
  cast,
  trailer,
}) => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [addWatchlist, setAddWatchlist] = useState({});
  const { _id } = useParams();

  const { user } = useContext(UserContext);

  const JWT = localStorage.getItem("JwtToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please give a star rating before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/movies/${_id}/reviews`,
        { rating, reviewText },
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Review posted successfully!");
        setRating(0);
        setReviewText("");
        setIsOpen(false);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post review");
    }
  };

  const getReviews = async () => {
    try {
      console.log("Fetching reviews for movieId:", _id);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/movies/${_id}/reviews`
      );

      if (response.data.success) {
        setMovieReviews(response.data.data);
        console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  const addToWatchlist = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/${_id}/watchlist`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      if (response.data.success) {
        setAddWatchlist(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  useEffect(() => {
    getReviews();
  }, [_id]);
  return (
    <div className="text-white">
      <div className="relative w-full h-[600px]">
        <img
          src={backdrop}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-700/80"></div>
        <div className="absolute inset-0 flex items-center md:px-20 py-10">
          <img
            src={poster}
            alt={title}
            className="hidden md:w-[300px] h-full rounded-xl shadow-lg object-cover md:block"
          />
          <div className="md:ml-6 space-y-4 px-3">
            <h1 className="text-3xl md:text-5xl font-bold">
              {title} ({new Date(releaseDate)?.getFullYear()})
            </h1>
            <p className="text-gray-300 text-md">
              {releaseDate} • {genre?.join(", ")}
            </p>
            <p className="italic text-gray-300 text-md">
              Directed by: {director}
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-3 my-3">
              <button
                className="bg-white text-black px-3 py-2 flex items-center rounded-full cursor-pointer hover:scale-95 transition-transform duration-150"
                onClick={addToWatchlist}
              >
                <BiMoviePlay className="inline mr-2 text-lg" />
                <span className="text-sm">Add to Watchlist</span>{" "}
              </button>
              <Link to="trailer" smooth={true} duration={400}>
                <button className="bg-black text-white px-5 py-2 flex items-center rounded-full cursor-pointer hover:scale-95 transition-transform duration-150">
                  <RiMovieLine className="inline mr-2 text-lg" />
                  <span className="text-md">Watch Trailer</span>{" "}
                </button>
              </Link>
            </div>
            <p className="text-xl font-medium">Overview</p>
            <p className="max-w-2xl text-sm md:text-base text-gray-200">
              {overview}
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-12 my-10">
        <h2 className="text-xl font-bold mb-4 text-black p-2">
          Top Billed Cast
        </h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {cast?.map((actor, index) => {
            const { name, character, profile } = actor;
            return (
              <div
                key={index}
                className="w-[140px] bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0"
              >
                <img
                  src={
                    profile
                      ? `https://image.tmdb.org/t/p/w300${profile}`
                      : "/fallback-profile.png"
                  }
                  alt={name}
                  className="w-full h-[180px] object-cover"
                />
                <div className="p-2">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{character}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-4 md:px-15 my-10">
        <h2 className="text-xl font-bold mb-4 text-black p-2">Reviews</h2>

        <div className="flex justify-end my-5">
          <button
            onClick={() => setIsOpen(true)}
            className={`${
              user
                ? "bg-teal-600 cursor-pointer hover:bg-teal-700 transition"
                : " bg-gray-400 cursor-not-allowed"
            } px-5 py-2 text-white rounded-full shadow-md`}
          >
            Write a Review
          </button>
        </div>

        {movieReviews.length > 0 ? (
          <div className="space-y-4">
            {movieReviews
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((review) => (
                <div
                  key={review._id}
                  className="bg-white text-black p-4 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">
                        {review.userId?.username || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      ⭐{" "}
                      <span className="font-semibold">{review.rating}/5</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{review.reviewText}</p>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {trailer && (
        <div name="trailer" className="my-6 flex justify-center">
          <iframe
            width="80%"
            height="400"
            src={trailer}
            title="Movie Trailer"
            allowFullScreen
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>
      )}

      <Model isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-gray-900 text-center">
          Write a Review
        </h2>
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 cursor-pointer transition ${
                (hoverRating || rating) >= star
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 text-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
          rows={4}
        ></textarea>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg text-black hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </Model>
    </div>
  );
};

export default MovieDetailCard;
