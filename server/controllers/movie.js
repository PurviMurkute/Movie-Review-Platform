import fetch from "node-fetch";
import { getCache, createCache } from "../utils/cache.js";

const API_KEY = process.env.TMDB_API_KEY;
console.log(API_KEY);

const getpopularmovies = async (req, res) => {
  try {
    const { page = 1, query } = req.query;

    let popularMovieUrl;
    if (query) {
      popularMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${encodeURIComponent(
        query
      )}`;
    } else {
      popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    }

    const cachedData = await getCache(`popularmovies`);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        page: cachedData.page,
        totalPages: cachedData.totalPages,
        data: cachedData.data,
        message: "Movies fetched successfully (from cache)",
      });
    }

    const response = await fetch(popularMovieUrl);
    const data = await response.json();

    if (!data.results) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "TMDB response invalid",
      });
    }

    const movies = data.results.map((movie) => ({
      _id: movie.id,
      title: movie.title,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    }));

    await createCache(`popularmovies`, {
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
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message || "Failed to fetch movies",
    });
  }
};

const gettrendingmovies = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    let trendingMovieUrl= `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`;

    const cachedData = await getCache(`trendingmovies`);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        page: cachedData.page,
        totalPages: cachedData.totalPages,
        data: cachedData.data,
        message: "Movies fetched successfully (from cache)",
      });
    }

    const response = await fetch(trendingMovieUrl);
    const data = await response.json();

    if (!data.results) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "TMDB response invalid",
      });
    }

    const movies = data.results.map((movie) => ({
      _id: movie.id,
      title: movie.title,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    }));

    await createCache(`trendingmovies`, {
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
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message || "Failed to fetch movies",
    });
  }
};

const getMoviebyId = async (req, res) => {
  const { movieId } = req.params;

  const cacheKey = `movie:details:${movieId}`;

  try {
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: cachedData,
        message: "Movie data fetched successfully (from cache)",
      });
    }

    const tmdbURL1 = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const tmdbURL2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
    const tmdbURL3 = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;

    const fetchWithTimeout = (url, options = {}, timeout = 10000) =>
      Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeout)
        ),
      ]);

    const movieInfoRes = await fetchWithTimeout(tmdbURL1);
    const castAndCrewRes = await fetchWithTimeout(tmdbURL2);
    const trailerRes = await fetchWithTimeout(tmdbURL3);

    const movieInfo = await movieInfoRes.json();
    const castandcrew = await castAndCrewRes.json();
    const trailer = await trailerRes.json();

    const directorDoc = castandcrew?.crew?.find(
      (person) => person.job === "Director"
    );
    const cast = castandcrew?.cast?.map((member) => ({
      name: member.name,
      character: member.character,
      profile: member.profile_path,
    }));
    const trailerKey = trailer?.results[0]?.key;

    const data = {
      title: movieInfo?.title,
      releaseDate: movieInfo?.release_date,
      poster: `https://image.tmdb.org/t/p/w500/${movieInfo?.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w780/${movieInfo?.backdrop_path}`,
      genre: movieInfo?.genres.map((genre) => genre.name),
      overview: movieInfo?.overview,
      director: directorDoc?.name,
      cast: cast,
      trailer: trailerKey
        ? `https://www.youtube.com/embed/${trailerKey}`
        : null,
    };

    await createCache(cacheKey, data);

    return res.status(200).json({
      success: true,
      data: data,
      message: "Movie data fetched successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message || "Failed to fetch movie data",
    });
  }
};

export { getpopularmovies, gettrendingmovies, getMoviebyId };
