import Watchlist from "../models/Watchlist.js";
import { getCache, createCache, flushCache } from "../utils/cache.js";
import fetch from "node-fetch";
const API_KEY = process.env.TMDB_API_KEY;

const postWatchlist = async (req, res) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  try {
    const existing = await Watchlist.findOne({ userId, movieId });

    if (existing) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Movie already added to the watchlist",
      });
    }

    const newWatchlist = await Watchlist.create({
      userId,
      movieId,
    });

    const savedWatchlist = await newWatchlist.save();

    await flushCache(`watchlist: ${userId}`);

    return res.status(201).json({
      success: true,
      data: savedWatchlist,
      message: "Movie added to the Watchlist",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const getWatchlistbyUser = async (req, res) => {
  const userId = req.user._id;
  const cacheKey = `watchlist:${userId}`;

  try {
    const cachedWatchlist = await getCache(cacheKey);
    if (cachedWatchlist) {
      return res.status(200).json({
        success: true,
        data: cachedWatchlist,
        message: "Watchlist fetched successfully (from cache)",
      });
    }

    const watchlist = await Watchlist.find({ userId }).sort({ createdAt: -1 });

    if (!watchlist || watchlist.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No movies in watchlist",
      });
    }

    // Fetch movie details for each movieId
    const movieDetails = await Promise.all(
      watchlist.map(async (item) => {
        const tmdbUrl = `https://api.themoviedb.org/3/movie/${item.movieId}?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(tmdbUrl);
        const data = await response.json();
        // Return only the fields you need
        return {
          movieId: item.movieId,
          title: data.title,
          posterPath: data.poster_path,
          releaseDate: data.release_date,
          overview: data.overview,
        };
      })
    );

    await createCache(cacheKey, movieDetails);

    return res.status(200).json({
      success: true,
      data: movieDetails,
      message: "Watchlist fetched successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const deleteMovieFromWatchlist = async (req, res) => {
  const { movieId } = req.params;
  const userId = req?.user?._id;

  try {
    const existing = await Watchlist.findOne({ userId, movieId });

    if (!existing) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Movie not found in watchlist",
      });
    }

    await Watchlist.findOneAndDelete({ userId, movieId });

    await flushCache(`watchlist: ${userId}`);

    return res.status(200).json({
      success: true,
      data: movieId,
      message: "Movie removed from watchlist successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

export { postWatchlist, getWatchlistbyUser, deleteMovieFromWatchlist };
