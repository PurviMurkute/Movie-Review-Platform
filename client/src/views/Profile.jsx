import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { Star } from "lucide-react";
import Model from "../components/Model";
import { MdEdit } from "react-icons/md";
import Input from "../components/Input";
import { UserContext } from "../context/userContext";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { _id } = useParams();
  const JWT = localStorage.getItem("JwtToken");

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/${_id}`,
        { headers: { Authorization: `Bearer ${JWT}` } }
      );

      if (response.data.success) {
        setProfile(response.data.data);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  const getWatchlist = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/${_id}/watchlist`,
        {
          headers: { Authorization: `Bearer ${JWT}` },
        }
      );
      if (res.data.success) {
        setWatchlist(res.data.data);
      }
    } catch (e) {
      toast.error("Failed to fetch watchlist.");
    }
  };

  const editUserProfile = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/user/${_id}`,
        { username, email },
        { headers: { Authorization: `Bearer ${JWT}` } }
      );

      if (response.data.success) {
        setUser(response.data.data.user);
        setProfile(response.data.data);
        toast.success(response.data.message);
        setIsModelOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  const removeMovieFromWatchlist = async (movieId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/users/${
          user?._id
        }/watchlist/${movieId}`,
        {
          headers: { Authorization: `Bearer ${JWT}` },
        }
      );

      if (response.data.success) {
        setWatchlist((prev) =>
          prev.filter((movie) => movie.movieId !== movieId)
        );
        toast.success("Movie removed from watchlist.");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };
  useEffect(() => {
    getProfile();
    getWatchlist();
  }, [_id]);

  useEffect(() => {
    if (isModelOpen && profile?.user) {
      setUsername(profile.user.username);
      setEmail(profile.user.email);
    }
  }, [isModelOpen, profile]);

  if (!profile) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
          Loading profile...
        </div>
        <Footer />
      </div>
    );
  }

  const { user: userData, reviews } = profile;

  const formattedJoinDate = new Date(userData?.joinDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto mt-18 px-4">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={userData?.profile}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-1">{userData?.username}</h1>
            <p className="text-white/90">{userData?.email}</p>
            <p className="text-sm mt-1 text-white/70">
              Joined on {formattedJoinDate}
            </p>
            <button
              className="flex items-center mt-4 bg-white text-blue-600 px-4 py-2 rounded-full cursor-pointer font-semibold hover:bg-gray-100 transition"
              onClick={() => setIsModelOpen(true)}
            >
              <MdEdit className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          Review History
        </h2>
        {reviews?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <Link
                to={`/movies/${review.movieId}`}
                key={review._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <p className="font-semibold mb-1">Movie ID: {review.movieId}</p>
                <p className="text-gray-700 mb-1">{review.reviewText}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 w-4 h-4" />
                  <span className="font-bold">{review.rating}/5</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-12 mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 flex items-center gap-2">
          <FaRegHeart className="text-pink-500" />
          Watchlist
        </h2>
        {watchlist?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {watchlist.map((movie) => (
              <Link
                key={movie.movieId}
                to={`/movies/${movie.movieId}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden relative"
              >
                <img
                  src={
                    movie.posterPath
                      ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt="movie"
                  className="w-full h-64 object-cover"
                />
                <MdDelete
                  className="absolute top-2 right-2 text-2xl bg-white rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeMovieFromWatchlist(movie.movieId);
                  }}
                />
                <div className="p-2">
                  <p className="font-semibold truncate">
                    {movie.title || "Movie Title"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No movies in watchlist.</p>
        )}
      </div>
      <Model isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-center py-3">Edit Profile</p>
          <img
            src={userData?.profile}
            alt="profile"
            className="w-16 h-16 object-cover rounded-full border-2 border-teal-400 block mx-auto mb-3"
          />
          <div className="flex flex-col w-full gap-3">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4 w-full">
            <button
              onClick={() => setIsModelOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={editUserProfile}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </Model>

      <Toaster />
      <Footer />
    </div>
  );
};

export default Profile;