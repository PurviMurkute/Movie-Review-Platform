import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import MovieDetailCard from "../components/MovieDetailCard";
import Footer from "../components/Footer";

const MovieInfo = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { _id } = useParams();

  const getDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/movies/${_id}`
      );

      if (response.data.success) {
        setMovieDetails(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    getDetail();
  }, [_id]);
  return (
    <div>
      <Header />
      <div className="mt-25">
        {movieDetails && (
          <MovieDetailCard
            title={movieDetails.title}
            releaseDate={movieDetails.releaseDate}
            poster={movieDetails.poster}
            backdrop={movieDetails.backdrop}
            genre={movieDetails.genre}
            overview={movieDetails.overview}
            director={movieDetails.director}
            cast={movieDetails.cast}
            trailer={movieDetails.trailer}
          />
        )}
      </div>
      <Toaster />
      <Footer />
    </div>
  );
};

export default MovieInfo;
