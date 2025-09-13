import fetch from "node-fetch";
import { getCache, createCache } from "../utils/cache.js";

const getmovies = async (req, res) => {
  try {
    const { page = 1, query } = req.query;
    const API_KEY = process.env.TMDB_API_KEY;
    console.log(API_KEY);
    
    let tmdbUrl;
    if (query) {
      tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${encodeURIComponent(
        query
      )}`;
    } else {
      tmdbUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    }

    const cachedData = await getCache(`movies:page:${page}:query:${query || "all"}`);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        page: cachedData.page,
        totalPages: cachedData.totalPages,
        data: cachedData.data,
        message: "Movies fetched successfully (from cache)",
      });
    }

    const response = await fetch(tmdbUrl);
    const data = await response.json();

    if (!data.results) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "TMDB response invalid"
      })
    }

    const movies = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    }));

    await createCache(`movies:page:${page}:query:${query || "all"}`, {
      page: data.page,
      totalPages: data.total_pages,
      data: movies,
    });

    return res.status(200).json({
      success: true,
      page: data.page,
      totalPages: data.total_pages,
      data: movies,
      message: "Movies fetched successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message || "Failed to fetch movies",
    });
  }
};

export { getmovies };