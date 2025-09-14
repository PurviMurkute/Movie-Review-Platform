import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import moviebg from "../assets/moviebg.jpg";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/popular/movies`
      );

      if (response.data.success) {
        setPopularMovies(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const getTrendingMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/trending/movies`
      );

      if (response.data.success) {
        setTrendingMovies(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPopularMovies();
    getTrendingMovies();
  }, []);

  return (
    <div>
      <Header />
      <div className="relative mt-25 w-full h-[320px]">
        <img
          src={moviebg}
          alt="bg-movie"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#adc2eb]/10"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Millions of Movies, Explore Now
          </h1>
          <div className="flex items-center w-full max-w-xl bg-gray-100 rounded-full shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search movies..."
              className="flex-1 px-4 py-2 text-black focus:outline-none"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white font-semibold hover:opacity-90 transition">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="mx-5 md:mx-20 my-5">
        <h2 className="font-bold py-5 text-xl">Featured Movies</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {popularMovies.map((movie, i) => {
              const { _id, title, posterUrl, releaseDate, rating } = movie;

              return (
                <MovieCard
                  key={i}
                  _id={_id}
                  title={title}
                  poster={posterUrl}
                  releaseDate={releaseDate}
                  rating={rating}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="mx-5 md:mx-20 my-10">
        <h2 className="font-bold py-5 text-xl">Popular Movies</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {trendingMovies.map((movie, i) => {
              const { _id, title, posterUrl, releaseDate, rating } = movie;

              return (
                <MovieCard
                  key={i}
                  _id={_id}
                  title={title}
                  poster={posterUrl}
                  releaseDate={releaseDate}
                  rating={rating}
                />
              );
            })}
          </div>
        )}
      </div>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Home;
